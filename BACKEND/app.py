from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt
from flask_login import LoginManager, UserMixin
from werkzeug.utils import secure_filename
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

# Secret Key for session management
app.secret_key = os.urandom(24)

# Database setup
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'supersecretkey'

# JWT Blacklist Configuration
app.config["JWT_BLACKLIST_ENABLED"] = True
app.config["JWT_BLACKLIST_TOKEN_CHECKS"] = ["access"]

# Upload setup
app.config['UPLOAD_FOLDER'] = 'upload_files'
app.config['ALLOWED_EXTENSIONS'] = {'png', 'jpg', 'jpeg', 'dcm', 'tif'}
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # Limit to 16 MB

# Initialize extensions
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)
login_manager = LoginManager(app)

# Ensure the upload directory exists
if not os.path.exists(app.config['UPLOAD_FOLDER']):
    os.makedirs(app.config['UPLOAD_FOLDER'])

# Global token blacklist
blacklist = set()

# Token revocation callback
@jwt.token_in_blocklist_loader
def check_if_token_revoked(jwt_header, jwt_payload):
    jti = jwt_payload["jti"]
    return jti in blacklist

# Models
class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(256), nullable=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    google_id = db.Column(db.String(256), unique=True, nullable=True)

class Patient(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    patient_id = db.Column(db.String(100), unique=True, nullable=False)
    name = db.Column(db.String(120), nullable=False)
    age = db.Column(db.Integer, nullable=False)
    contact_number = db.Column(db.String(20), nullable=False)
    appointment_id = db.Column(db.String(100), nullable=False)
    scan_file = db.Column(db.String(256), nullable=True)

with app.app_context():
    db.create_all()

# Utility function for file validation
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in app.config['ALLOWED_EXTENSIONS']

# User Loader for Login Manager
@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

# User Login
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = User.query.filter_by(email=email).first()

    if user and bcrypt.check_password_hash(user.password, password):
        access_token = create_access_token(identity=user.id)
        return jsonify({'message': 'Login successful', 'token': access_token}), 200
    else:
        return jsonify({'message': 'Invalid credentials'}), 401

# User Registration
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    email = data.get('email')
    username = data.get('username')
    password = data.get('password')

    if User.query.filter_by(email=email).first():
        return jsonify({'message': 'User already exists'}), 400

    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    new_user = User(email=email, username=username, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User registered successfully'}), 201

# Logout Endpoint (JWT Token Blacklisting)
@app.route('/logout', methods=['POST'])
@jwt_required()
def logout():
    jti = get_jwt()["jti"]
    blacklist.add(jti)
    return jsonify({"message": "Successfully logged out"}), 200

# Add patient details
@app.route('/patient', methods=['POST'])
def add_patient():
    data = request.form
    patient_id = data.get('patient_id')
    name = data.get('name')
    age = data.get('age')
    contact_number = data.get('contact_number')
    appointment_id = data.get('appointment_id')

    if 'scan_file' not in request.files:
        return jsonify({'message': 'No file part in the request'}), 400
    file = request.files['scan_file']

    if file.filename == '':
        return jsonify({'message': 'No file selected'}), 400
    
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)

        # Create a new patient
        new_patient = Patient(
            patient_id=patient_id,
            name=name,
            age=age,
            contact_number=contact_number,
            appointment_id=appointment_id,
            scan_file=file_path
        )
        db.session.add(new_patient)
        db.session.commit()

        return jsonify({'message': 'Patient added successfully'}), 201
    else:
        return jsonify({'message': 'Invalid file type'}), 400

# Get patient details by ID
@app.route('/patient/<int:id>', methods=['GET'])
def get_patient(id):
    patient = Patient.query.filter_by(patient_id=id).first() 
    if patient:
        return jsonify({
            'patient_id': patient.patient_id,
            'name': patient.name,
            'age': patient.age,
            'contact_number': patient.contact_number,
            'appointment_id': patient.appointment_id,
            'scan_file': patient.scan_file
        }), 200
    else:
        return jsonify({'message': 'Patient not found'}), 404
    
# Update patient details
@app.route('/patient/<int:id>', methods=['PUT'])
def update_patient(id):
    patient = Patient.query.get(id)
    if not patient:
        return jsonify({'message': 'Patient not found'}), 404
    
    data = request.get_json()
    patient.name = data.get('name', patient.name)
    # The following fields (date_in, final_result, prediction_status) are not defined in the Patient model.
    # Uncomment or update these if they are added to the model.
    # patient.date_in = data.get('date_in', patient.date_in)
    # patient.final_result = data.get('final_result', patient.final_result)
    # patient.prediction_status = data.get('prediction_status', patient.prediction_status)

    db.session.commit()
    return jsonify({'message': 'Patient updated successfully'}), 200

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=5000)


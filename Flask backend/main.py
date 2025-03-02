from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt
from flask_login import LoginManager, UserMixin
from werkzeug.utils import secure_filename
from flask_cors import CORS
import os
from datetime import datetime
from sqlalchemy import DateTime


app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}}, supports_credentials=True)

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

#Models
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

class Appointment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    patient_id = db.Column(db.String(100), nullable=False)
    doctor_id = db.Column(db.String(100), nullable=False)
    appointment_date = db.Column(db.DateTime, nullable=False)
    description = db.Column(db.String(500), nullable=True)

class Notification(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False)
    message = db.Column(db.String(500), nullable=False)
    timestamp = db.Column(db.DateTime, default=db.func.current_timestamp())


class DoctorProof(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    doctor_id = db.Column(db.String(100), nullable=False)
    proof_file = db.Column(db.String(256), nullable=False)
    upload_date = db.Column(db.DateTime, default=db.func.current_timestamp())


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
    
# Root route to check if the backend is working
@app.route('/', methods=['GET'])
def home():
    return jsonify({'message': 'Welcome to Oncodetect backend!'}), 200

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

# Add patient 
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
    

#Get all patients details
@app.route('/patients',methods=['GET'])
def get_patients():
    patients=Patient.query.all()
    if patients:
        return jsonify([{
            'patient_id': patient.patient_id,
            'name': patient.name,
            'age': patient.age,
            'contact_number': patient.contact_number,
            'appointment_id': patient.appointment_id,
            'scan_file': patient.scan_file

        }for patient in patients]),200
    else:
        return jsonify({'message': 'No patients found'}), 404
    
#Get patient details by ID
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
    
#Update patient details
@app.route('/patient/<int:id>', methods=['PUT'])
def update_patient(id):
    patient = Patient.query.get(id)
    if not patient:
        return jsonify({'message': 'Patient not found'}), 404
    
    data = request.get_json()
    patient.name = data.get('name', patient.name)
    db.session.commit()
    return jsonify({'message': 'Patient updated successfully'}), 200

@app.route('/patient/<int:id>',methods=['DELETE'])
def delete_patient(id):
    patient=Patient.query.get(id)
    if not patient:
        return jsonify({'massage': 'Patient not found'}),404
    
    db.session.delete(patient)
    db.session.flush()
    db.session.commit()
    print("Patient deleted and changes committed to the database.")
    return jsonify({'message': 'Patient deleted successfully'}),200

#Create a new appointment
@app.route('/appointment', methods=['POST'])
def create_appointment():
    data = request.get_json()
    
    
    try:
        # Convert the 'appointment_date' string into a datetime object
        appointment_date = datetime.strptime(data['appointment_date'], '%Y-%m-%d %H:%M:%S') 
    except ValueError:
        return jsonify({"error": "Invalid date format. Please use 'YYYY-MM-DD HH:MM:SS' format."}), 400

    patient_id = data.get('patient_id')
    doctor_id = data.get('doctor_id')
    description = data.get('description')

   
    new_appointment = Appointment(
        patient_id=patient_id,
        doctor_id=doctor_id,
        appointment_date=appointment_date,
        description=description
    )

  
    db.session.add(new_appointment)
    db.session.commit()

    return jsonify({'message': 'Appointment created successfully'}), 201

#Get all appointments
@app.route('/appointments', methods=['GET'])
def get_appointments():
    
    appointments = Appointment.query.all()
    return jsonify([{
        'patient_id': appointment.patient_id,
        'doctor_id': appointment.doctor_id,
        'appointment_date': appointment.appointment_date,
        'description': appointment.description
    } for appointment in appointments]), 200


#Get appointments by id
@app.route('/appointment/<string:patient_id>', methods=['GET'])
def get_appointment(patient_id):
    appointment = Appointment.query.filter_by(patient_id=patient_id).first()
    if not appointment:
        return jsonify({'message': 'Appointment not found'}), 404
    
    # Format the appointment_date as a string in the desired format
    appointment_date_str = appointment.appointment_date.strftime('%Y-%m-%d %H:%M:%S')
    
    return jsonify({
        'patient_id': appointment.patient_id,
        'doctor_id': appointment.doctor_id,
        'appointment_date': appointment_date_str,
        'description': appointment.description
    }), 200



# Create a notification
@app.route('/notification',methods=['POST'])
def create_notification():
    data=request.get_json()
    user_id=data.get('user_id')
    message=data.get('message')

    new_notification=Notification(
        user_id=user_id,
        message=message
    )

    db.session.add(new_notification)
    db.session.commit()

    return jsonify({'message': 'Notification created successfully'}), 201

# Get all notifications
@app.route('/notifications', methods=['GET'])
def get_notifications():
    notifications = Notification.query.all()
    return jsonify([{
        'user_id': notification.user_id,
        'message': notification.message,
        'timestamp': notification.timestamp
    } for notification in notifications]), 200

# Add Doctor Proof
@app.route('/doctorproof', methods=['POST'])
def add_doctor_proof():
    data = request.form
    doctor_id = data.get('doctor_id')

    if 'proof_file' not in request.files:
        return jsonify({'message': 'No file part in the request'}), 400
    file = request.files['proof_file']

    if file.filename == '':
        return jsonify({'message': 'No file selected'}), 400

    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)

        # Create a new doctor proof record
        new_doctor_proof = DoctorProof(
            doctor_id=doctor_id,
            proof_file=file_path
        )
        db.session.add(new_doctor_proof)
        db.session.commit()

        return jsonify({'message': 'Doctor proof uploaded successfully'}), 201
    else:
        return jsonify({'message': 'Invalid file type'}), 400

# Get Doctor Proof by Doctor ID
@app.route('/doctorproof/<string:doctor_id>', methods=['GET'])
def get_doctor_proof(doctor_id):
    doctor_proof = DoctorProof.query.filter_by(doctor_id=doctor_id).first()
    if doctor_proof:
        return jsonify({
            'doctor_id': doctor_proof.doctor_id,
            'proof_file': doctor_proof.proof_file,
            'upload_date': doctor_proof.upload_date
        }), 200
    else:
        return jsonify({'message': 'Doctor proof not found'}), 404

# Update Doctor Proof by Doctor ID
@app.route('/doctorproof/<string:doctor_id>', methods=['PUT'])
def update_doctor_proof(doctor_id):
    doctor_proof = DoctorProof.query.filter_by(doctor_id=doctor_id).first()
    if not doctor_proof:
        return jsonify({'message': 'Doctor proof not found'}), 404

    if 'proof_file' in request.files:
        file = request.files['proof_file']
        if file.filename == '':
            return jsonify({'message': 'No file selected'}), 400
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            file.save(file_path)

            # Update the proof file path
            doctor_proof.proof_file = file_path
            db.session.commit()

            return jsonify({'message': 'Doctor proof updated successfully'}), 200
        else:
            return jsonify({'message': 'Invalid file type'}), 400
    else:
        return jsonify({'message': 'No proof file provided'}), 400

# Delete Doctor Proof by Doctor ID
@app.route('/doctorproof/<string:doctor_id>', methods=['DELETE'])
def delete_doctor_proof(doctor_id):
    doctor_proof = DoctorProof.query.filter_by(doctor_id=doctor_id).first()
    if not doctor_proof:
        return jsonify({'message': 'Doctor proof not found'}), 404

    db.session.delete(doctor_proof)
    db.session.commit()

    return jsonify({'message': 'Doctor proof deleted successfully'}), 200

    
if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=5000)

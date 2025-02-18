from flask import Flask,request,jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_login import LoginManager, UserMixin, login_user, logout_user, current_user
from requests_oauthlib import OAuth2Session
import os
from werkzeug.utils import secure_filename

app=Flask(__name__)
app.secret_key=os.urandom(24)


#Database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'supersecretkey'

db=SQLAlchemy(app)
bcrypt=Bcrypt(app)
jwt=JWTManager(app)
login_manager=LoginManager(app)

#Google oAuth
GOOGLE_CLIENT_ID = "YOUR_GOOGLE_CLIENT_ID"
GOOGLE_CLIENT_SECRET = "YOUR_GOOGLE_CLIENT_SECRET"
GOOGLE_DISCOVERY_URL = "https://accounts.google.com/.well-known/openid-configuration"
REDIRECT_URI = "http://127.0.0.1:5000/google/callback"


#User model
class User(db.Model,UserMixin):
    id=db.Column(db.Integer,primary_key=True)
    username=db.Column(db.String(100),unique=True,nullable=False)
    password=db.Column(db.String(256),nullable=True)
    email=db.Column(db.String(120),unique=True,nullable=False)
    google_id = db.Column(db.String(256), unique=True, nullable=True)


#Patient model
class Patient(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    patient_id = db.Column(db.String(100), unique=True, nullable=False)
    name = db.Column(db.String(120), nullable=False)
    age = db.Column(db.Integer, nullable=False)
    contact_number = db.Column(db.String(20), nullable=False)
    appointment_id = db.Column(db.String(100), nullable=False)
    scan_file = db.Column(db.String(256), nullable=True)


#file upload setup
app.config['UPLOAD_FOLDER'] = 'upload_files'
app.config['ALLOWED_EXTENSIONS']={'png','jpg','jpeg','dcm','tif'}

def allowed_file(filename):
     return '.' in filename and filename.rsplit('.', 1)[1].lower() in app.config['ALLOWED_EXTENSIONS']


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))


#database table
with app.app_context():
    db.create_all()



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
    

#User registration
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    email = data.get('email')
    username = data.get('username')
    password = data.get('password')

    print(f"Received data: {data}")  # Print received data

    if User.query.filter_by(email=email).first():
        print("User already exists")
        return jsonify({'message': 'User already exists'}), 400

    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    new_user = User(email=email, username=username, password=hashed_password)

    print(f"Creating user: {email}, {username}")  # Print user creation info

    db.session.add(new_user)
    db.session.commit()

    print("User added to the database")
    
    return jsonify({'message': 'User registered successfully'}), 201

#add pateint details
@app.route('/patient', methods=['POST'])
def add_patient():
    data=request.form
    patient_id=data.get('patient_id')
    name=data.get('name')
    age=data.get('age')
    contact_number=data.get('contact_number')
    appointment_id=data.get('appointment_id')


    #handle file upload
    if 'scan_file' not in request.files:
        return jsonify({'message': 'No file part in the request'}),400
    file=request.files['scan_file']

    if file.filename == '':
        return jsonify({'message':'No file selected'}),400
    
    if file and allowed_file(file.filename):
        filename=secure_filename(file.filename)
        file_path=os.path.join(app.config['UPLOAD_FOLDER'],filename)
        file.save(file_path)


        #create a new patient
        new_patient=Patient(
            patient_id=patient_id,
            name=name,
            age=age,
            contact_number=contact_number,
            appointment_id=appointment_id,
            scan_file=file_path
        )
        db.session.add(new_patient)
        db.session.commit()

        return jsonify({'message':'Patient added successfully'}),201
    
    else:
        return jsonify({'message':'Invalid file type'}),400
    
#get patient details by ID
@app.route('/patient/<int:id>', methods=['GET'])
def get_patient(id):
    patient=Patient.query.get(id)
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




    

    
if  __name__=="__main__":
     app.run(debug=True, host='0.0.0.0', port=5000)   
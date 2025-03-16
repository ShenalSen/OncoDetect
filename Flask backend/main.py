from flask import Flask, request, jsonify
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt
from flask_cors import CORS
from pymongo import MongoClient
import os
from datetime import datetime
from werkzeug.utils import secure_filename

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}}, supports_credentials=True)

# Secret Key for session management
app.secret_key = os.urandom(24)

# MongoDB configuration
app.config['MONGO_URI'] = 'mongodb://localhost:27017/'  
mongo = MongoClient(app.config['MONGO_URI'])
db = mongo['OncoDetect']  

# Collections
users = db.users
patients = db.patients
appointments = db.appointments
notifications = db.notifications
doctor_profs = db.doctor_profs
diagnostic_results = db.diagnostic_results

# Initialize extensions
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

# Upload setup
app.config['UPLOAD_FOLDER'] = 'upload_files'
app.config['ALLOWED_EXTENSIONS'] = {'png', 'jpg', 'jpeg', 'dcm', 'tif'}
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # Limit to 16 MB

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

# Utility function for file validation
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in app.config['ALLOWED_EXTENSIONS']

# User Login
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = users.find_one({'email': email})

    if user and bcrypt.check_password_hash(user['password'], password):
        access_token = create_access_token(identity=str(user['_id']))
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

    if users.find_one({'email': email}):
        return jsonify({'message': 'User already exists'}), 400

    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    user = {
        'email': email,
        'username': username,
        'password': hashed_password
    }
    users.insert_one(user)

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

        patient = {
            'patient_id': patient_id,
            'name': name,
            'age': age,
            'contact_number': contact_number,
            'appointment_id': appointment_id,
            'scan_file': file_path
        }
        patients.insert_one(patient)

        return jsonify({'message': 'Patient added successfully'}), 201
    else:
        return jsonify({'message': 'Invalid file type'}), 400

# Get all patients
@app.route('/patients', methods=['GET'])
def get_patients():
    patients_list = list(patients.find({}, {'_id': 0}))
    if patients_list:
        return jsonify(patients_list), 200
    else:
        return jsonify({'message': 'No patients found'}), 404

# Get patient details by ID
@app.route('/patient/<string:patient_id>', methods=['GET'])
def get_patient(patient_id):
    patient = patients.find_one({'patient_id': patient_id}, {'_id': 0})
    if patient:
        return jsonify(patient), 200
    else:
        return jsonify({'message': 'Patient not found'}), 404

# Update patient details
@app.route('/patient/<string:patient_id>', methods=['PUT'])
def update_patient(patient_id):
    data = request.get_json()
    result = patients.update_one({'patient_id': patient_id}, {'$set': data})
    if result.modified_count > 0:
        return jsonify({'message': 'Patient updated successfully'}), 200
    else:
        return jsonify({'message': 'Patient not found'}), 404

# Delete patient
@app.route('/patient/<string:patient_id>', methods=['DELETE'])
def delete_patient(patient_id):
    result = patients.delete_one({'patient_id': patient_id})
    if result.deleted_count > 0:
        return jsonify({'message': 'Patient deleted successfully'}), 200
    else:
        return jsonify({'message': 'Patient not found'}), 404

# Create a new appointment
@app.route('/appointment', methods=['POST'])
def create_appointment():
    data = request.get_json()
    
    try:
        appointment_date = datetime.strptime(data['appointment_date'], '%Y-%m-%d %H:%M:%S') 
    except ValueError:
        return jsonify({"error": "Invalid date format. Please use 'YYYY-MM-DD HH:MM:SS' format."}), 400

    appointment = {
        'patient_id': data.get('patient_id'),
        'doctor_id': data.get('doctor_id'),
        'appointment_date': appointment_date,
        'description': data.get('description')
    }
    appointments.insert_one(appointment)

    return jsonify({'message': 'Appointment created successfully'}), 201

# Get all appointments
@app.route('/appointments', methods=['GET'])
def get_appointments():
    appointments_list = list(appointments.find({}, {'_id': 0}))
    return jsonify(appointments_list), 200

# Get appointments by patient ID
@app.route('/appointment/<string:patient_id>', methods=['GET'])
def get_appointment(patient_id):
    appointment = appointments.find_one({'patient_id': patient_id}, {'_id': 0})
    if appointment:
        return jsonify(appointment), 200
    else:
        return jsonify({'message': 'Appointment not found'}), 404

# Create a notification
@app.route('/notification', methods=['POST'])
def create_notification():
    data = request.get_json()
    user_id = data.get('user_id')
    message = data.get('message')

    notification = {
        'user_id': user_id,
        'message': message,
        'timestamp': datetime.now()
    }
    notifications.insert_one(notification)

    return jsonify({'message': 'Notification created successfully'}), 201

# Get all notifications
@app.route('/notifications', methods=['GET'])
def get_notifications():
    notifications_list = list(notifications.find({}, {'_id': 0}))
    return jsonify(notifications_list), 200

# Add Doctor profile
@app.route('/doctorprof', methods=['POST'])
def add_doctor_prof():
    data = request.form
    doctor_id = data.get('doctor_id')

    if 'prof_file' not in request.files:
        return jsonify({'message': 'No file part in the request'}), 400
    file = request.files['prof_file']

    if file.filename == '':
        return jsonify({'message': 'No file selected'}), 400

    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)

        doctor_prof = {
            'doctor_id': doctor_id,
            'prof_file': file_path,
            'upload_date': datetime.now()
        }
        doctor_profs.insert_one(doctor_prof)

        return jsonify({'message': 'Doctor profile uploaded successfully'}), 201
    else:
        return jsonify({'message': 'Invalid file type'}), 400

# Get Doctor profile by Doctor ID
@app.route('/doctorprof/<string:doctor_id>', methods=['GET'])
def get_doctor_prof(doctor_id):
    doctor_prof = doctor_profs.find_one({'doctor_id': doctor_id}, {'_id': 0})
    if doctor_prof:
        return jsonify(doctor_prof), 200
    else:
        return jsonify({'message': 'Doctor profile not found'}), 404

# Update Doctor profile by Doctor ID
@app.route('/doctorprof/<string:doctor_id>', methods=['PUT'])
def update_doctor_prof(doctor_id):
    if 'prof_file' in request.files:
        file = request.files['prof_file']
        if file.filename == '':
            return jsonify({'message': 'No file selected'}), 400
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            file.save(file_path)

            result = doctor_profs.update_one({'doctor_id': doctor_id}, {'$set': {'prof_file': file_path}})
            if result.modified_count > 0:
                return jsonify({'message': 'Doctor profile updated successfully'}), 200
            else:
                return jsonify({'message': 'Doctor profile not found'}), 404
        else:
            return jsonify({'message': 'Invalid file type'}), 400
    else:
        return jsonify({'message': 'No profile file provided'}), 400

# Delete Doctor profile by Doctor ID
@app.route('/doctorprof/<string:doctor_id>', methods=['DELETE'])
def delete_doctor_prof(doctor_id):
    result = doctor_profs.delete_one({'doctor_id': doctor_id})
    if result.deleted_count > 0:
        return jsonify({'message': 'Doctor profile deleted successfully'}), 200
    else:
        return jsonify({'message': 'Doctor profile not found'}), 404

# Create diagnostic result
@app.route('/diagnostic_result', methods=['POST'])
def create_diagnostic_result():
    data = request.form
    patient_id = data.get('patient_id')
    appointment_id = data.get('appointment_id')

    total_percentage = data.get('total_percentage')
    normal_percentage = data.get('normal_percentage')
    abnormal_percentage = data.get('abnormal_percentage')
    ambiguous_percentage = data.get('ambiguous_percentage')
    doctor_recommendation = data.get('doctor_recommendation')
    additional_insights = data.get('additional_insights')
    final_result = data.get('final_result')

    try:
        total_percentage = float(total_percentage) if total_percentage else None
        normal_percentage = float(normal_percentage) if normal_percentage else None
        abnormal_percentage = float(abnormal_percentage) if abnormal_percentage else None
        ambiguous_percentage = float(ambiguous_percentage) if ambiguous_percentage else None
    except ValueError:
        return jsonify({"message": "Invalid percentage values"}), 400

    annotated_image_file = request.files.get('annotated_image')
    annotated_image_path = None

    if annotated_image_file and allowed_file(annotated_image_file.filename):
        filename = secure_filename(annotated_image_file.filename)
        annotated_image_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        annotated_image_file.save(annotated_image_path)

    diagnostic_result = {
        'patient_id': patient_id,
        'appointment_id': appointment_id,
        'annotated_image': annotated_image_path,
        'total_percentage': total_percentage,
        'normal_percentage': normal_percentage,
        'abnormal_percentage': abnormal_percentage,
        'ambiguous_percentage': ambiguous_percentage,
        'doctor_recommendation': doctor_recommendation,
        'additional_insights': additional_insights,
        'final_result': final_result,
        'date_of_scan': datetime.now()
    }
    diagnostic_results.insert_one(diagnostic_result)

    return jsonify({'message': 'Diagnostic result created successfully'}), 201

# Get diagnostic results for a patient
@app.route('/diagnostic_result/patient/<string:patient_id>', methods=['GET'])
def get_diagnostic_results_for_patient(patient_id):
    results = list(diagnostic_results.find({'patient_id': patient_id}, {'_id': 0}))
    if results:
        return jsonify(results), 200
    else:
        return jsonify({'message': 'No diagnostic results found for this patient'}), 404

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
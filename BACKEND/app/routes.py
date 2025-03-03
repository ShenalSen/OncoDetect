from flask import Blueprint, request, jsonify, make_response, current_app
from flask_jwt_extended import create_access_token, jwt_required, get_jwt
from flask_login import login_user
from werkzeug.utils import secure_filename
from datetime import datetime
import os

from app import db, bcrypt, login_manager
from app.models import User, Patient, Appointment, Notification, DoctorProof, DiagnosticResult
from app.utils import allowed_file, generate_pdf_report

main = Blueprint('main', __name__)

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

@main.route('/', methods=['GET'])
def home():
    return jsonify({'message': 'Welcome to Oncodetect backend!'}), 200

@main.route('/register', methods=['POST'])
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

@main.route('/login', methods=['POST'])
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

@main.route('/logout', methods=['POST'])
@jwt_required()
def logout():
    jti = get_jwt()["jti"]
    current_app.config['BLACKLIST'].add(jti)
    return jsonify({"message": "Successfully logged out"}), 200

@main.route('/patient', methods=['POST'])
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
        file_path = os.path.join(current_app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)

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

@main.route('/patients', methods=['GET'])
def get_patients():
    patients = Patient.query.all()
    if patients:
        data = [{
            'patient_id': p.patient_id,
            'name': p.name,
            'age': p.age,
            'contact_number': p.contact_number,
            'appointment_id': p.appointment_id,
            'scan_file': p.scan_file
        } for p in patients]
        return jsonify(data), 200
    else:
        return jsonify({'message': 'No patients found'}), 404

@main.route('/patient/<int:id>', methods=['GET'])
def get_patient(id):
    patient = Patient.query.filter_by(patient_id=str(id)).first()
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

@main.route('/patient/<int:id>', methods=['PUT'])
def update_patient(id):
    patient = Patient.query.get(id)
    if not patient:
        return jsonify({'message': 'Patient not found'}), 404

    data = request.get_json()
    patient.name = data.get('name', patient.name)
    db.session.commit()
    return jsonify({'message': 'Patient updated successfully'}), 200

@main.route('/patient/<int:id>', methods=['DELETE'])
def delete_patient(id):
    patient = Patient.query.get(id)
    if not patient:
        return jsonify({'message': 'Patient not found'}), 404

    db.session.delete(patient)
    db.session.commit()
    return jsonify({'message': 'Patient deleted successfully'}), 200

@main.route('/appointment', methods=['POST'])
def create_appointment():
    data = request.get_json()
    try:
        appointment_date = datetime.strptime(data['appointment_date'], '%Y-%m-%d %H:%M:%S')
    except ValueError:
        return jsonify({"error": "Invalid date format. Please use 'YYYY-MM-DD HH:MM:SS' format."}), 400

    new_appointment = Appointment(
        patient_id=data.get('patient_id'),
        doctor_id=data.get('doctor_id'),
        appointment_date=appointment_date,
        description=data.get('description')
    )
    db.session.add(new_appointment)
    db.session.commit()
    return jsonify({'message': 'Appointment created successfully'}), 201

@main.route('/appointments', methods=['GET'])
def get_appointments():
    appointments = Appointment.query.all()
    data = [{
        'patient_id': a.patient_id,
        'doctor_id': a.doctor_id,
        'appointment_date': a.appointment_date,
        'description': a.description
    } for a in appointments]
    return jsonify(data), 200

@main.route('/appointment/<string:patient_id>', methods=['GET'])
def get_appointment(patient_id):
    appointment = Appointment.query.filter_by(patient_id=patient_id).first()
    if not appointment:
        return jsonify({'message': 'Appointment not found'}), 404

    appointment_date_str = appointment.appointment_date.strftime('%Y-%m-%d %H:%M:%S')
    return jsonify({
        'patient_id': appointment.patient_id,
        'doctor_id': appointment.doctor_id,
        'appointment_date': appointment_date_str,
        'description': appointment.description
    }), 200

@main.route('/notification', methods=['POST'])
def create_notification():
    data = request.get_json()
    new_notification = Notification(
        user_id=data.get('user_id'),
        message=data.get('message')
    )
    db.session.add(new_notification)
    db.session.commit()
    return jsonify({'message': 'Notification created successfully'}), 201

@main.route('/notifications', methods=['GET'])
def get_notifications():
    notifications = Notification.query.all()
    data = [{
        'user_id': n.user_id,
        'message': n.message,
        'timestamp': n.timestamp
    } for n in notifications]
    return jsonify(data), 200

@main.route('/doctorproof', methods=['POST'])
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
        file_path = os.path.join(current_app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)
        new_proof = DoctorProof(
            doctor_id=doctor_id,
            proof_file=file_path
        )
        db.session.add(new_proof)
        db.session.commit()
        return jsonify({'message': 'Doctor proof uploaded successfully'}), 201
    else:
        return jsonify({'message': 'Invalid file type'}), 400

@main.route('/doctorproof/<string:doctor_id>', methods=['GET'])
def get_doctor_proof(doctor_id):
    proof = DoctorProof.query.filter_by(doctor_id=doctor_id).first()
    if proof:
        return jsonify({
            'doctor_id': proof.doctor_id,
            'proof_file': proof.proof_file,
            'upload_date': proof.upload_date
        }), 200
    else:
        return jsonify({'message': 'Doctor proof not found'}), 404

@main.route('/doctorproof/<string:doctor_id>', methods=['PUT'])
def update_doctor_proof(doctor_id):
    proof = DoctorProof.query.filter_by(doctor_id=doctor_id).first()
    if not proof:
        return jsonify({'message': 'Doctor proof not found'}), 404

    if 'proof_file' in request.files:
        file = request.files['proof_file']
        if file.filename == '':
            return jsonify({'message': 'No file selected'}), 400
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file_path = os.path.join(current_app.config['UPLOAD_FOLDER'], filename)
            file.save(file_path)
            proof.proof_file = file_path
            db.session.commit()
            return jsonify({'message': 'Doctor proof updated successfully'}), 200
        else:
            return jsonify({'message': 'Invalid file type'}), 400
    else:
        return jsonify({'message': 'No proof file provided'}), 400

@main.route('/doctorproof/<string:doctor_id>', methods=['DELETE'])
def delete_doctor_proof(doctor_id):
    proof = DoctorProof.query.filter_by(doctor_id=doctor_id).first()
    if not proof:
        return jsonify({'message': 'Doctor proof not found'}), 404
    db.session.delete(proof)
    db.session.commit()
    return jsonify({'message': 'Doctor proof deleted successfully'}), 200

@main.route('/diagnostic_result', methods=['POST'])
def create_diagnostic_result():
    data = request.form
    try:
        total_percentage = float(data.get('total_percentage')) if data.get('total_percentage') else None
        normal_percentage = float(data.get('normal_percentage')) if data.get('normal_percentage') else None
        abnormal_percentage = float(data.get('abnormal_percentage')) if data.get('abnormal_percentage') else None
        ambiguous_percentage = float(data.get('ambiguous_percentage')) if data.get('ambiguous_percentage') else None
    except ValueError:
        return jsonify({"message": "Invalid percentage values"}), 400

    annotated_image_file = request.files.get('annotated_image')
    annotated_image_path = None

    if annotated_image_file and allowed_file(annotated_image_file.filename):
        filename = secure_filename(annotated_image_file.filename)
        annotated_image_path = os.path.join(current_app.config['UPLOAD_FOLDER'], filename)
        annotated_image_file.save(annotated_image_path)

    new_result = DiagnosticResult(
        patient_id=data.get('patient_id'),
        appointment_id=data.get('appointment_id'),
        annotated_image=annotated_image_path,
        total_percentage=total_percentage,
        normal_percentage=normal_percentage,
        abnormal_percentage=abnormal_percentage,
        ambiguous_percentage=ambiguous_percentage,
        doctor_recommendation=data.get('doctor_recommendation'),
        additional_insights=data.get('additional_insights'),
        final_result=data.get('final_result')
    )
    db.session.add(new_result)
    db.session.commit()
    return jsonify({'message': 'Diagnostic result created successfully'}), 201

@main.route('/diagnostic_result/patient/<string:patient_id>', methods=['GET'])
def get_diagnostic_results_for_patient(patient_id):
    results = DiagnosticResult.query.filter_by(patient_id=patient_id).all()
    if not results:
        return jsonify({'message': 'No diagnostic results found for this patient'}), 404
    output = []
    for r in results:
        output.append({
            'id': r.id,
            'patient_id': r.patient_id,
            'appointment_id': r.appointment_id,
            'annotated_image': r.annotated_image,
            'total_percentage': r.total_percentage,
            'normal_percentage': r.normal_percentage,
            'abnormal_percentage': r.abnormal_percentage,
            'ambiguous_percentage': r.ambiguous_percentage,
            'doctor_recommendation': r.doctor_recommendation,
            'additional_insights': r.additional_insights,
            'final_result': r.final_result,
            'date_of_scan': r.date_of_scan.strftime('%Y-%m-%d %H:%M:%S') if r.date_of_scan else None
        })
    return jsonify(output), 200

@main.route('/patient_data', methods=['POST'])
def patient_data():
    data = request.get_json()
    if not data:
        return jsonify({"message": "No patient data provided"}), 400
    patient_name = data.get('name', 'Unknown')
    patient_id = data.get('patient_id', 'N/A')
    diagnosis = data.get('diagnosis', 'Pending')
    notes = data.get('notes', '')

    pdf = generate_pdf_report(patient_name, patient_id, diagnosis, notes)
    pdf_bytes = pdf.output(dest='S').encode('latin-1')
    response = make_response(pdf_bytes)
    response.headers.set('Content-Type', 'application/pdf')
    response.headers.set('Content-Disposition', 'attachment', filename='BreastCancerReport.pdf')
    return response

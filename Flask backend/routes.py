from flask import request, jsonify, send_from_directory, current_app
from werkzeug.utils import secure_filename
import os
from . import db
from .models import User, Patient, Appointment, Notification, Doctorprof, DiagnosticResult
from flask_jwt_extended import jwt_required, get_jwt_identity
from datetime import datetime

# Utility function for file validation
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in current_app.config['ALLOWED_EXTENSIONS']

def register_routes(app):

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

    # Register route
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

    # Add patient route
    @app.route('/patient', methods=['POST'])
    @jwt_required()
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

    # Create a new appointment
    @app.route('/appointment', methods=['POST'])
    @jwt_required()
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

    # Get all patients
    @app.route('/patients', methods=['GET'])
    @jwt_required()
    def get_all_patients():
        patients = Patient.query.all()
        patients_data = [{"patient_id": p.patient_id, "name": p.name, "age": p.age, "contact_number": p.contact_number} for p in patients]
        return jsonify(patients_data)

    # Get patient by ID
    @app.route('/patient/<int:id>', methods=['GET'])
    @jwt_required()
    def get_patient(id):
        patient = Patient.query.get(id)
        if not patient:
            return jsonify({'message': 'Patient not found'}), 404

        return jsonify({
            'patient_id': patient.patient_id,
            'name': patient.name,
            'age': patient.age,
            'contact_number': patient.contact_number,
            'appointment_id': patient.appointment_id,
            'scan_file': patient.scan_file
        })

    # Get all appointments
    @app.route('/appointments', methods=['GET'])
    @jwt_required()
    def get_all_appointments():
        appointments = Appointment.query.all()
        appointments_data = [{"patient_id": a.patient_id, "doctor_id": a.doctor_id, "appointment_date": a.appointment_date, "description": a.description} for a in appointments]
        return jsonify(appointments_data)

    # Get appointment by ID
    @app.route('/appointment/<int:id>', methods=['GET'])
    @jwt_required()
    def get_appointment(id):
        appointment = Appointment.query.get(id)
        if not appointment:
            return jsonify({'message': 'Appointment not found'}), 404

        return jsonify({
            'patient_id': appointment.patient_id,
            'doctor_id': appointment.doctor_id,
            'appointment_date': appointment.appointment_date,
            'description': appointment.description
        })

    # Create diagnostic result
    @app.route('/diagnostic_result', methods=['POST'])
    @jwt_required()
    def create_diagnostic_result():
        data = request.get_json()

        patient_id = data.get('patient_id')
        appointment_id = data.get('appointment_id')
        annotated_image = data.get('annotated_image')
        total_percentage = data.get('total_percentage')
        normal_percentage = data.get('normal_percentage')
        abnormal_percentage = data.get('abnormal_percentage')
        ambiguous_percentage = data.get('ambiguous_percentage')
        doctor_recommendation = data.get('doctor_recommendation')
        additional_insights = data.get('additional_insights')
        final_result = data.get('final_result')

        new_result = DiagnosticResult(
            patient_id=patient_id,
            appointment_id=appointment_id,
            annotated_image=annotated_image,
            total_percentage=total_percentage,
            normal_percentage=normal_percentage,
            abnormal_percentage=abnormal_percentage,
            ambiguous_percentage=ambiguous_percentage,
            doctor_recommendation=doctor_recommendation,
            additional_insights=additional_insights,
            final_result=final_result
        )

        db.session.add(new_result)
        db.session.commit()

        return jsonify({'message': 'Diagnostic result created successfully'}), 201

    # Get diagnostic result by patient ID
    @app.route('/diagnostic_result/<string:patient_id>', methods=['GET'])
    @jwt_required()
    def get_diagnostic_result(patient_id):
        result = DiagnosticResult.query.filter_by(patient_id=patient_id).first()
        if not result:
            return jsonify({'message': 'Diagnostic result not found'}), 404

        return jsonify({
            'patient_id': result.patient_id,
            'appointment_id': result.appointment_id,
            'annotated_image': result.annotated_image,
            'total_percentage': result.total_percentage,
            'normal_percentage': result.normal_percentage,
            'abnormal_percentage': result.abnormal_percentage,
            'ambiguous_percentage': result.ambiguous_percentage,
            'doctor_recommendation': result.doctor_recommendation,
            'additional_insights': result.additional_insights,
            'final_result': result.final_result
        })

    # Add doctor profile
    @app.route('/doctor_profile', methods=['POST'])
    @jwt_required()
    def add_doctor_profile():
        if 'prof_file' not in request.files:
            return jsonify({'message': 'No file part in the request'}), 400

        file = request.files['prof_file']

        if file.filename == '':
            return jsonify({'message': 'No file selected'}), 400

        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file_path = os.path.join(current_app.config['UPLOAD_FOLDER'], filename)
            file.save(file_path)

            # Create a new doctor profile
            doctor_id = request.form.get('doctor_id')
            new_profile = Doctorprof(
                doctor_id=doctor_id,
                prof_file=file_path
            )

            db.session.add(new_profile)
            db.session.commit()

            return jsonify({'message': 'Doctor profile created successfully'}), 201
        else:
            return jsonify({'message': 'Invalid file type'}), 400

    # Get doctor profile by doctor_id
    @app.route('/doctor_profile/<string:doctor_id>', methods=['GET'])
    @jwt_required()
    def get_doctor_profile(doctor_id):
        profile = Doctorprof.query.filter_by(doctor_id=doctor_id).first()
        if not profile:
            return jsonify({'message': 'Doctor profile not found'}), 404

        return jsonify({
            'doctor_id': profile.doctor_id,
            'prof_file': profile.prof_file
        })

    # Get all notifications
    @app.route('/notifications', methods=['GET'])
    @jwt_required()
    def get_notifications():
        user_id = get_jwt_identity()
        notifications = Notification.query.filter_by(user_id=user_id).all()
        notifications_data = [{"message": n.message, "timestamp": n.timestamp} for n in notifications]
        return jsonify(notifications_data)

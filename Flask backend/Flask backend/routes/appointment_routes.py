from flask import Blueprint, request, jsonify
from models import get_appointments_collection
from datetime import datetime

appointment_bp = Blueprint('appointment', __name__)

@appointment_bp.route('/appointment', methods=['POST'])
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
    
    appointments = get_appointments_collection()
    appointments.insert_one(appointment)

    return jsonify({'message': 'Appointment created successfully'}), 201

@appointment_bp.route('/appointments', methods=['GET'])
def get_appointments():
    appointments = get_appointments_collection()
    appointments_list = list(appointments.find({}, {'_id': 0}))
    return jsonify(appointments_list), 200

@appointment_bp.route('/appointment/<string:patient_id>', methods=['GET'])
def get_appointment(patient_id):
    appointments = get_appointments_collection()
    appointment = appointments.find_one({'patient_id': patient_id}, {'_id': 0})
    if appointment:
        return jsonify(appointment), 200
    else:
        return jsonify({'message': 'Appointment not found'}), 404
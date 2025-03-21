from flask import Blueprint, request, jsonify
from models import get_patients_collection
from utils import save_file

patient_bp = Blueprint('patient', __name__)

@patient_bp.route('/patient', methods=['POST'])
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
    
    file_path = save_file(file)
    if not file_path:
        return jsonify({'message': 'Invalid file type'}), 400

    patient = {
        'patient_id': patient_id,
        'name': name,
        'age': age,
        'contact_number': contact_number,
        'appointment_id': appointment_id,
        'scan_file': file_path
    }
    
    patients = get_patients_collection()
    patients.insert_one(patient)

    return jsonify({'message': 'Patient added successfully'}), 201

@patient_bp.route('/patients', methods=['GET'])
def get_patients():
    patients_collection = get_patients_collection()
    patients_list = list(patients_collection.find({}, {'_id': 0}))
    if patients_list:
        return jsonify(patients_list), 200
    else:
        return jsonify({'message': 'No patients found'}), 404

@patient_bp.route('/patient/<string:patient_id>', methods=['GET'])
def get_patient(patient_id):
    patients_collection = get_patients_collection()
    patient = patients_collection.find_one({'patient_id': patient_id}, {'_id': 0})
    if patient:
        return jsonify(patient), 200
    else:
        return jsonify({'message': 'Patient not found'}), 404

@patient_bp.route('/patient/<string:patient_id>', methods=['PUT'])
def update_patient(patient_id):
    data = request.get_json()
    patients_collection = get_patients_collection()
    result = patients_collection.update_one({'patient_id': patient_id}, {'$set': data})
    if result.modified_count > 0:
        return jsonify({'message': 'Patient updated successfully'}), 200
    else:
        return jsonify({'message': 'Patient not found'}), 404

@patient_bp.route('/patient/<string:patient_id>', methods=['DELETE'])
def delete_patient(patient_id):
    patients_collection = get_patients_collection()
    result = patients_collection.delete_one({'patient_id': patient_id})
    if result.deleted_count > 0:
        return jsonify({'message': 'Patient deleted successfully'}), 200
    else:
        return jsonify({'message': 'Patient not found'}), 404
    
@patient_bp.route('/patients/recent', methods=['GET'])
def get_recent_patient():
    """Get the most recently added patient"""
    patients = get_patients_collection()
    # Sort by registration date in descending order and get the first one
    patient = patients.find_one({}, {'_id': 0}, sort=[('registration_date', -1)])
    if patient:
        return jsonify(patient), 200
    else:
        return jsonify({'message': 'No patients found'}), 404
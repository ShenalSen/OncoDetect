from flask import Blueprint, request, jsonify
from models import get_doctor_profs_collection
from utils import save_file
from datetime import datetime

doctor_bp = Blueprint('doctor', __name__)

@doctor_bp.route('/doctorprof', methods=['POST'])
def add_doctor_prof():
    data = request.form
    doctor_id = data.get('doctor_id')

    if 'prof_file' not in request.files:
        return jsonify({'message': 'No file part in the request'}), 400
    
    file = request.files['prof_file']
    if file.filename == '':
        return jsonify({'message': 'No file selected'}), 400

    file_path = save_file(file)
    if not file_path:
        return jsonify({'message': 'Invalid file type'}), 400

    doctor_prof = {
        'doctor_id': doctor_id,
        'prof_file': file_path,
        'upload_date': datetime.now()
    }
    
    doctor_profs = get_doctor_profs_collection()
    doctor_profs.insert_one(doctor_prof)

    return jsonify({'message': 'Doctor profile uploaded successfully'}), 201

@doctor_bp.route('/doctorprof/<string:doctor_id>', methods=['GET'])
def get_doctor_prof(doctor_id):
    doctor_profs = get_doctor_profs_collection()
    doctor_prof = doctor_profs.find_one({'doctor_id': doctor_id}, {'_id': 0})
    if doctor_prof:
        return jsonify(doctor_prof), 200
    else:
        return jsonify({'message': 'Doctor profile not found'}), 404

@doctor_bp.route('/doctorprof/<string:doctor_id>', methods=['PUT'])
def update_doctor_prof(doctor_id):
    if 'prof_file' in request.files:
        file = request.files['prof_file']
        if file.filename == '':
            return jsonify({'message': 'No file selected'}), 400
        
        file_path = save_file(file)
        if not file_path:
            return jsonify({'message': 'Invalid file type'}), 400

        doctor_profs = get_doctor_profs_collection()
        result = doctor_profs.update_one({'doctor_id': doctor_id}, {'$set': {'prof_file': file_path}})
        if result.modified_count > 0:
            return jsonify({'message': 'Doctor profile updated successfully'}), 200
        else:
            return jsonify({'message': 'Doctor profile not found'}), 404
    else:
        return jsonify({'message': 'No profile file provided'}), 400

@doctor_bp.route('/doctorprof/<string:doctor_id>', methods=['DELETE'])
def delete_doctor_prof(doctor_id):
    doctor_profs = get_doctor_profs_collection()
    result = doctor_profs.delete_one({'doctor_id': doctor_id})
    if result.deleted_count > 0:
        return jsonify({'message': 'Doctor profile deleted successfully'}), 200
    else:
        return jsonify({'message': 'Doctor profile not found'}), 404
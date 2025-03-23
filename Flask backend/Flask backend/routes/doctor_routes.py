from flask import Blueprint, request, jsonify
from models import get_doctor_profs_collection
from utils import save_file
from datetime import datetime
from flask_jwt_extended import jwt_required, get_jwt_identity

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

@doctor_bp.route('/doctor/profile', methods=['GET'])
@jwt_required()  # Ensure the route is protected
def get_doctor_profile():
    try:
        # Get the user ID from the JWT token
        user_id = get_jwt_identity()
        
        # Fetch the doctor's profile from the doctor_profs collection
        doctor_profs = get_doctor_profs_collection()
        doctor = doctor_profs.find_one({'userId': user_id}, {'_id': 0})
        
        if not doctor:
            print("No doctor found, returning demo profile")
            # If no doctor is found, return a demo profile
            demo_profile = {
                'name': 'Ashan Perera',
                'specialization': 'Consultant Clinical Oncologist',
                'licenseNumber': 'SLMC 769873458T',
                'contactNumber': '+9476 741 9000',
                'email': 'ashanp@nw.dr.lk',
                'hospital': 'Nawaloka Hospitals PLC',
                'yearsExperience': 15,
                'totalPatients': 250,
                'predictionsMade': 120,
                'accuracyRate': 98
            }
            return jsonify(demo_profile), 200
        
        # Ensure all expected fields are present
        processed_doctor = {
            'name': doctor.get('name', 'Unknown'),
            'specialization': doctor.get('specialization', ''),
            'licenseNumber': doctor.get('licenseNumber', ''),
            'contactNumber': doctor.get('contactNumber', ''),
            'email': doctor.get('email', ''),
            'hospital': doctor.get('hospital', ''),
            'yearsExperience': doctor.get('yearsExperience', 0),
            'totalPatients': doctor.get('totalPatients', 0),
            'predictionsMade': doctor.get('predictionsMade', 0),
            'accuracyRate': doctor.get('accuracyRate', 0)
        }
        
        return jsonify(processed_doctor), 200
        
    except Exception as e:
        print(f"Error retrieving doctor profile: {str(e)}")
        # Return demo data on error
        demo_profile = {
            'name': 'Ashan Perera (Error Fallback)',
            'specialization': 'Consultant Clinical Oncologist',
            'licenseNumber': 'SLMC 769873458T',
            'contactNumber': '+9476 741 9000',
            'email': 'ashanp@nw.dr.lk',
            'hospital': 'Nawaloka Hospitals PLC',
            'yearsExperience': 15,
            'totalPatients': 250,
            'predictionsMade': 120,
            'accuracyRate': 98
        }
        return jsonify(demo_profile), 200

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
    

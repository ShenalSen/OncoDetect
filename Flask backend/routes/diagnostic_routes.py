from flask import Blueprint, request, jsonify
from models import get_diagnostic_results_collection
from utils import save_file
from datetime import datetime

diagnostic_bp = Blueprint('diagnostic', __name__)

@diagnostic_bp.route('/diagnostic_result', methods=['POST'])
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

    annotated_image_path = None
    if 'annotated_image' in request.files:
        annotated_image_file = request.files.get('annotated_image')
        annotated_image_path = save_file(annotated_image_file)

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
    
    diagnostic_results = get_diagnostic_results_collection()
    diagnostic_results.insert_one(diagnostic_result)

    return jsonify({'message': 'Diagnostic result created successfully'}), 201

@diagnostic_bp.route('/diagnostic_result/patient/<string:patient_id>', methods=['GET'])
def get_diagnostic_results_for_patient(patient_id):
    diagnostic_results = get_diagnostic_results_collection()
    results = list(diagnostic_results.find({'patient_id': patient_id}, {'_id': 0}))
    if results:
        return jsonify(results), 200
    else:
        return jsonify({'message': 'No diagnostic results found for this patient'}), 404
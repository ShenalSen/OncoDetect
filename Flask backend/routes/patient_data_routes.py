from flask import Blueprint, request, jsonify, make_response
from models import get_patient_data_collection
from utils import generate_pdf_report

patient_data_bp = Blueprint('patient_data', __name__)

@patient_data_bp.route('/patient_data', methods=['POST'])
def add_patient_data():
    data = request.get_json()
    name = data.get('name')
    date_in = data.get('date_in')
    final_result = data.get('final_result')
    prediction_status = data.get('prediction_status')

    patient_data_entry = {
        'name': name,
        'date_in': date_in,
        'final_result': final_result,
        'prediction_status': prediction_status
    }
    
    patient_data = get_patient_data_collection()
    patient_data.insert_one(patient_data_entry)

    return jsonify({'message': 'Patient data added successfully'}), 201

@patient_data_bp.route('/patient_data', methods=['GET'])
def get_all_patient_data():
    patient_data = get_patient_data_collection()
    patient_data_list = list(patient_data.find({}, {'_id': 0}))
    if patient_data_list:
        return jsonify(patient_data_list), 200
    else:
        return jsonify({'message': 'No patient data found'}), 404

@patient_data_bp.route('/patient_report', methods=['POST'])
def generate_patient_report():
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
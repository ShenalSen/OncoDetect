from flask import Blueprint, request, jsonify, make_response
from models import (
    get_patient_data_collection,
    get_patients_collection,
    get_diagnostic_results_collection
    
    )
from utils import generate_pdf_report
from datetime import datetime

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
    """Get all patient data with their prediction/diagnostic results"""
    try:
        # Get collections
        patient_data = get_patient_data_collection()
        patients = get_patients_collection()
        diagnostic_results = get_diagnostic_results_collection()
        
        # First check if we have data in the dedicated patient_data collection
        patient_data_list = list(patient_data.find({}, {'_id': 0}))
        
        # Reset the collection if we're getting duplicate/incorrect data
        if any(p.get('name') == 'John Doe' for p in patient_data_list):
            print("Found incorrect 'John Doe' data - resetting patient_data collection")
            patient_data.delete_many({})
            patient_data_list = []
        
        # If we don't have dedicated patient data, let's combine data from other collections
        if not patient_data_list:
            print("No data in patient_data collection, aggregating from other collections")
            
            # Get all patients
            all_patients = list(patients.find({}, {'_id': 0}))
            
            # Get all diagnostic results
            all_diagnostics = list(diagnostic_results.find({}, {'_id': 0}))
            
            # Create diagnostic lookup by patient_id
            diagnostic_lookup = {diag['patient_id']: diag for diag in all_diagnostics}
            
            # Combine patient data with their diagnostic results
            patient_data_list = []
            for patient in all_patients:
                patient_id = patient.get('patient_id')
                if patient_id:
                    # Get diagnostic for this patient if available
                    diagnostic = diagnostic_lookup.get(patient_id)
                    
                    # Create patient data entry
                    entry = {
                        'name': patient.get('name', 'Unknown'),
                        'date_in': patient.get('registration_date', diagnostic.get('creation_date') if diagnostic else None),
                        'final_result': diagnostic.get('status', 'Incoming') if diagnostic else 'Incoming',
                        'prediction_status': diagnostic.get('final_result', 'Pending') if diagnostic else 'Pending'
                    }
                    
                    patient_data_list.append(entry)
            
            # If we still don't have data, return some dummy data for development
            if not patient_data_list:
                print("No patient data found in any collection, using dummy data")
                current_year = datetime.now().year
                patient_data_list = [
                    {'name': 'Ashini Ishara', 'date_in': f'{current_year}-02-10', 'final_result': 'Confirmed', 'prediction_status': 'Malignant'},
                    {'name': 'Shehani Perera', 'date_in': f'{current_year}-02-05', 'final_result': 'Confirmed', 'prediction_status': 'Malignant'},
                    {'name': 'Rukshana Alwis', 'date_in': f'{current_year}-01-28', 'final_result': 'Confirmed', 'prediction_status': 'Benign'},
                    {'name': 'Deesha Zoysa', 'date_in': f'{current_year}-01-15', 'final_result': 'Incoming', 'prediction_status': 'Benign'},
                    {'name': 'Fathima Nazruk', 'date_in': f'{current_year}-01-05', 'final_result': 'Confirmed', 'prediction_status': 'Malignant'},
                    {'name': 'Kavinthi Selwakumar', 'date_in': f'{current_year-1}-12-20', 'final_result': 'Cancelled', 'prediction_status': 'Malignant'},
                    {'name': 'Farhana Ahmed', 'date_in': f'{current_year-1}-12-15', 'final_result': 'Confirmed', 'prediction_status': 'Malignant'},
                    {'name': 'Emily Fernando', 'date_in': f'{current_year-1}-12-10', 'final_result': 'Cancelled', 'prediction_status': 'Benign'},
                    {'name': 'Tashia Alexander', 'date_in': f'{current_year-1}-12-05', 'final_result': 'Incoming', 'prediction_status': 'Benign'},
                    {'name': 'Sanduni Nihara', 'date_in': f'{current_year-1}-12-01', 'final_result': 'Incoming', 'prediction_status': 'Benign'}
                ]
                
                # Clear any existing data first
                patient_data.delete_many({})
                
                # Let's also save this dummy data for future use
                for entry in patient_data_list:
                    patient_data.insert_one(entry)
                print(f"Added {len(patient_data_list)} dummy entries to patient_data collection")
        
        # Sort the patient data by date (most recent first)
        def parse_date(date_str):
            if not date_str:
                return datetime.min
            try:
                if 'T' in date_str:
                    # ISO format
                    return datetime.fromisoformat(date_str.split('.')[0])
                else:
                    # Simple date format
                    return datetime.strptime(date_str, '%Y-%m-%d')
            except Exception:
                try:
                    # Try alternative format
                    return datetime.strptime(date_str, '%m/%d/%Y')
                except Exception:
                    return datetime.min
        
        # Remove duplicate entries (based on name and date)
        seen = set()
        unique_data = []
        for entry in patient_data_list:
            key = (entry.get('name', ''), entry.get('date_in', ''))
            if key not in seen:
                seen.add(key)
                unique_data.append(entry)
        
        # Sort by date_in (newest first)
        unique_data.sort(key=lambda x: parse_date(x.get('date_in')), reverse=True)
                
        return jsonify(unique_data), 200
        
    except Exception as e:
        print(f"Error retrieving patient data: {str(e)}")
        return jsonify({'message': f'Error retrieving patient data: {str(e)}'}), 500
    
    

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
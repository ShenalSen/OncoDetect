from flask import Blueprint, request, jsonify
from models import get_diagnostic_results_collection, get_patients_collection
from utils import save_file, generate_pdf_report
from datetime import datetime
import os
from fpdf import FPDF
import io

diagnostic_bp = Blueprint('diagnostic', __name__)

@diagnostic_bp.route('/diagnostic_result', methods=['POST'])
def add_diagnostic_result():
    """Add a new diagnostic result"""
    data = request.form
    patient_id = data.get('patient_id')
    doctor_id = data.get('doctor_id')
    final_result = data.get('final_result')
    abnormal_percentage = data.get('abnormal_percentage')
    doctor_recommendation = data.get('doctor_recommendation')
    additional_insights = data.get('additional_insights')
    
    # Handle annotated image upload if provided
    annotated_image = None
    if 'annotated_image' in request.files:
        file = request.files['annotated_image']
        if file and file.filename != '':
            annotated_image = save_file(file)
    
    # Create the diagnostic result document
    diagnostic_result = {
        'patient_id': patient_id,
        'doctor_id': doctor_id,
        'final_result': final_result,
        'abnormal_percentage': float(abnormal_percentage) if abnormal_percentage else None,
        'doctor_recommendation': doctor_recommendation,
        'additional_insights': additional_insights,
        'annotated_image': annotated_image,
        'creation_date': datetime.now().isoformat(),
        'status': 'pending'
    }
    
    # Insert into database
    diagnostic_results = get_diagnostic_results_collection()
    result = diagnostic_results.insert_one(diagnostic_result)
    
    return jsonify({
        'message': 'Diagnostic result added successfully',
        'id': str(result.inserted_id)
    }), 201

@diagnostic_bp.route('/diagnostic_result/patient/<string:patient_id>', methods=['GET'])
def get_patient_diagnostic_results(patient_id):
    """Get all diagnostic results for a specific patient"""
    diagnostic_results = get_diagnostic_results_collection()
    results = list(diagnostic_results.find(
        {'patient_id': patient_id}, 
        {'_id': 0}
    ).sort('creation_date', -1))  # Sort by creation date descending (newest first)
    
    if results:
        # Look up patient information
        patients = get_patients_collection()
        patient = patients.find_one({'patient_id': patient_id}, {'_id': 0})
        
        # Add patient name to each result if available
        if patient:
            for result in results:
                result['patient_name'] = patient.get('name')
                # Format dates for better readability
                if 'creation_date' in result:
                    try:
                        date_obj = datetime.fromisoformat(result['creation_date'])
                        result['diagnosis_date'] = date_obj.strftime('%Y-%m-%d')
                    except:
                        result['diagnosis_date'] = "Unknown"
                
        return jsonify(results), 200
    else:
        return jsonify({'message': 'No diagnostic results found for this patient'}), 404

@diagnostic_bp.route('/diagnostic_result/confirm', methods=['POST'])
def confirm_diagnostic_result():
    """Confirm a diagnostic result"""
    data = request.json
    patient_id = data.get('patient_id')
    final_result = data.get('final_result')
    doctor_notes = data.get('doctor_notes')
    
    if not patient_id:
        return jsonify({'message': 'Patient ID is required'}), 400
    
    # Update diagnostic results for this patient
    diagnostic_results = get_diagnostic_results_collection()
    result = diagnostic_results.update_many(
        {'patient_id': patient_id, 'status': 'pending'},
        {'$set': {
            'status': 'confirmed',
            'final_result': final_result,
            'confirmation_date': datetime.now().isoformat(),
            'doctor_notes': doctor_notes
        }}
    )
    
    if result.modified_count > 0:
        return jsonify({'message': f'Successfully confirmed {result.modified_count} diagnostic results'}), 200
    else:
        return jsonify({'message': 'No pending diagnostic results found for this patient'}), 404

@diagnostic_bp.route('/diagnostic_result/default', methods=['GET'])
def get_default_diagnostic():
    """Get a default diagnostic result for testing"""
    default_result = [{
        'final_result': 'Malignant',
        'abnormal_percentage': 87,
        'patient_name': 'Test Patient',
        'doctor_recommendation': 'Schedule follow-up consultation immediately',
        'additional_insights': 'The analysis shows suspicious areas that require further investigation.',
        'creation_date': datetime.now().isoformat(),
        'doctor_name': 'Dr. AI System',
        'diagnosis_date': datetime.now().strftime('%Y-%m-%d')
    }]
    
    return jsonify(default_result), 200

@diagnostic_bp.route('/patient_report', methods=['POST'])
def generate_patient_report():
    """Generate a PDF report for a patient's diagnosis"""
    data = request.json
    
    if not data:
        return jsonify({"message": "No data provided"}), 400
    
    patient_name = data.get('name', 'Unknown')
    patient_id = data.get('patient_id', 'N/A')
    diagnosis = data.get('diagnosis', 'Pending')
    notes = data.get('notes', '')
    doctor_recommendation = data.get('doctor_recommendation', '')
    confidence_level = data.get('confidence_level', 'N/A')
    diagnosis_date = data.get('diagnosis_date', datetime.now().strftime('%Y-%m-%d'))
    
    # Create PDF
    pdf = FPDF()
    pdf.add_page()
    
    # Title
    pdf.set_font('Arial', 'B', 16)
    pdf.cell(0, 10, 'Breast Cancer Diagnostic Report', 0, 1, 'C')
    pdf.line(10, 25, 200, 25)
    pdf.ln(10)
    
    # Patient information
    pdf.set_font('Arial', 'B', 12)
    pdf.cell(0, 10, 'Patient Information', 0, 1)
    pdf.set_font('Arial', '', 11)
    pdf.cell(40, 8, 'Name:', 0)
    pdf.cell(0, 8, patient_name, 0, 1)
    pdf.cell(40, 8, 'Patient ID:', 0)
    pdf.cell(0, 8, patient_id, 0, 1)
    pdf.cell(40, 8, 'Date:', 0)
    pdf.cell(0, 8, diagnosis_date, 0, 1)
    pdf.ln(10)
    
    # Diagnosis
    pdf.set_font('Arial', 'B', 12)
    pdf.cell(0, 10, 'Diagnosis Results', 0, 1)
    pdf.set_font('Arial', '', 11)
    
    # Format diagnosis with appropriate color
    pdf.cell(40, 8, 'Diagnosis:', 0)
    if diagnosis == 'Malignant':
        pdf.set_text_color(255, 0, 0)  # Red
    else:
        pdf.set_text_color(0, 128, 0)  # Green
    pdf.cell(0, 8, diagnosis, 0, 1)
    pdf.set_text_color(0, 0, 0)  # Reset to black
    
    pdf.cell(40, 8, 'Confidence:', 0)
    pdf.cell(0, 8, f"{confidence_level}%", 0, 1)
    pdf.ln(5)
    
    # Doctor's recommendation
    pdf.set_font('Arial', 'B', 12)
    pdf.cell(0, 10, "Doctor's Recommendation", 0, 1)
    pdf.set_font('Arial', '', 11)
    pdf.multi_cell(0, 8, doctor_recommendation)
    pdf.ln(5)
    
    # Additional notes
    pdf.set_font('Arial', 'B', 12)
    pdf.cell(0, 10, 'Additional Notes', 0, 1)
    pdf.set_font('Arial', '', 11)
    pdf.multi_cell(0, 8, notes)
    pdf.ln(10)
    
    # Disclaimer
    pdf.set_font('Arial', 'I', 10)
    pdf.cell(0, 10, 'This report is generated based on AI analysis and should be reviewed by a healthcare professional.', 0, 1)
    pdf.cell(0, 10, 'Please consult with your doctor for proper medical advice and treatment options.', 0, 1)
    
    # Return the PDF as a response
    response = pdf.output(dest='S').encode('latin-1')
    
    return jsonify({
        "message": "PDF report generated successfully",
        "pdf_data": response.decode('latin-1')
    }), 200

@diagnostic_bp.route('/diagnostic_results/statistics', methods=['GET'])
def get_diagnostic_statistics():
    """Get statistics about diagnostic results"""
    diagnostic_results = get_diagnostic_results_collection()
    
    # Count total cases
    total_cases = diagnostic_results.count_documents({})
    
    # Count malignant cases
    malignant_cases = diagnostic_results.count_documents({'final_result': 'Malignant'})
    
    # Count benign cases
    benign_cases = diagnostic_results.count_documents({'final_result': 'Benign'})
    
    # Count pending cases
    pending_cases = diagnostic_results.count_documents({'status': 'pending'})
    
    # Count confirmed cases
    confirmed_cases = diagnostic_results.count_documents({'status': 'confirmed'})
    
    # Calculate average confidence level
    pipeline = [
        {'$match': {'abnormal_percentage': {'$exists': True, '$ne': None}}},
        {'$group': {'_id': None, 'average': {'$avg': '$abnormal_percentage'}}}
    ]
    avg_result = list(diagnostic_results.aggregate(pipeline))
    avg_confidence = avg_result[0]['average'] if avg_result else None
    
    return jsonify({
        'total_cases': total_cases,
        'malignant_cases': malignant_cases,
        'benign_cases': benign_cases,
        'pending_cases': pending_cases,
        'confirmed_cases': confirmed_cases,
        'average_confidence': avg_confidence
    }), 200
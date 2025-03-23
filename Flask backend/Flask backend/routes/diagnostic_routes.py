from flask import Blueprint, request, jsonify, current_app
from models import get_diagnostic_results_collection, get_patients_collection
from utils import save_file, generate_pdf_report
from datetime import datetime
import os
from fpdf import FPDF
import io

diagnostic_bp = Blueprint('diagnostic', __name__)

# Add this new helper function
def save_prediction_as_diagnostic(patient_id, prediction_result, confidence_value):
    """Helper function to save a prediction result as a diagnostic result"""
    try:
        print(f"\n----- Auto-saving prediction as diagnostic result for patient: {patient_id} -----")
        
        # Get the diagnostic_results collection
        diagnostic_results = get_diagnostic_results_collection()
        
        # Check if a diagnostic result already exists for this patient
        existing = diagnostic_results.find_one({'patient_id': patient_id})
        if existing:
            print(f"Diagnostic result already exists for patient {patient_id}, skipping")
            return False
        
        # Create new diagnostic result
        diagnostic_data = {
            'patient_id': patient_id,
            'doctor_id': 'AI_SYSTEM',
            'final_result': prediction_result,
            'abnormal_percentage': float(confidence_value) * 100,
            'doctor_recommendation': 'Please consult with a specialist based on these AI findings',
            'additional_insights': 'This is an automatic diagnosis based on AI analysis of your mammogram',
            'creation_date': datetime.now().isoformat(),
            'status': 'pending'
        }
        
        # Insert into database
        result = diagnostic_results.insert_one(diagnostic_data)
        print(f"Successfully saved diagnostic result with ID: {result.inserted_id}")
        return True
    except Exception as e:
        print(f"Error auto-saving diagnostic result: {str(e)}")
        return False

@diagnostic_bp.route('/diagnostic_result', methods=['POST'])
def add_diagnostic_result():
    """Add a new diagnostic result"""
    print("\n----- Starting diagnostic result insertion -----")
    try:
        # Handle both form data and JSON data
        if request.content_type and 'application/json' in request.content_type:
            data = request.get_json()
            print(f"Received JSON data: {data}")
        else:
            data = request.form
            print(f"Received form data: {data}")

        if not data:
            print("No data received in request")
            return jsonify({'message': 'No data provided'}), 400

        patient_id = data.get('patient_id')
        doctor_id = data.get('doctor_id', 'AI_SYSTEM')
        final_result = data.get('final_result')
        abnormal_percentage = data.get('abnormal_percentage', data.get('confidence_level'))
        doctor_recommendation = data.get('doctor_recommendation', 'Pending doctor review')
        additional_insights = data.get('additional_insights', 'Automatic diagnosis based on AI analysis')
        
        print(f"Parsed data: patient_id={patient_id}, final_result={final_result}, abnormal_percentage={abnormal_percentage}")
        
        if not patient_id or not final_result:
            print("Missing required fields")
            return jsonify({'message': 'Patient ID and final result are required'}), 400
        
        # Handle annotated image upload if provided
        annotated_image = None
        if request.files and 'annotated_image' in request.files:
            file = request.files['annotated_image']
            if file and file.filename != '':
                annotated_image = save_file(file)
                print(f"Annotated image saved: {annotated_image}")
        
        # Create the diagnostic result document
        diagnostic_result = {
            'patient_id': patient_id,
            'doctor_id': doctor_id,
            'final_result': final_result,
            'abnormal_percentage': float(abnormal_percentage) if abnormal_percentage else 87,
            'doctor_recommendation': doctor_recommendation,
            'additional_insights': additional_insights,
            'annotated_image': annotated_image,
            'creation_date': datetime.now().isoformat(),
            'status': 'pending'
        }
        
        print(f"Diagnostic document to insert: {diagnostic_result}")
        
        try:
            # Insert into database
            diagnostic_results = get_diagnostic_results_collection()
            print(f"Got diagnostic_results collection")
            
            # Check if diagnostic already exists for this patient
            existing = diagnostic_results.find_one({'patient_id': patient_id})
            if existing:
                print(f"Updating existing diagnostic result for patient {patient_id}")
                result = diagnostic_results.update_one(
                    {'patient_id': patient_id},
                    {'$set': {
                        'final_result': final_result,
                        'abnormal_percentage': diagnostic_result['abnormal_percentage'],
                        'doctor_recommendation': doctor_recommendation,
                        'additional_insights': additional_insights,
                        'annotated_image': annotated_image,
                        'updated_date': datetime.now().isoformat()
                    }}
                )
                return jsonify({
                    'message': 'Diagnostic result updated successfully',
                    'patient_id': patient_id,
                    'updated': True
                }), 200
            else:
                # Insert new diagnostic result
                result = diagnostic_results.insert_one(diagnostic_result)
                print(f"Insert result: {result.inserted_id}")
                
                return jsonify({
                    'message': 'Diagnostic result added successfully',
                    'id': str(result.inserted_id),
                    'diagnostic_result': {
                        'patient_id': patient_id,
                        'final_result': final_result,
                        'abnormal_percentage': diagnostic_result['abnormal_percentage']
                    }
                }), 201
        except Exception as db_error:
            print(f"Database error during insert: {str(db_error)}")
            return jsonify({'message': f'Database error: {str(db_error)}'}), 500
            
    except Exception as e:
        print(f"Exception in add_diagnostic_result: {str(e)}")
        return jsonify({'message': f'Error processing request: {str(e)}'}), 500

@diagnostic_bp.route('/diagnostic_result/patient/<string:patient_id>', methods=['GET'])
def get_patient_diagnostic_results(patient_id):
    """Get all diagnostic results for a specific patient"""
    print(f"\n----- Getting diagnostic results for patient: {patient_id} -----")
    try:
        diagnostic_results = get_diagnostic_results_collection()
        results = list(diagnostic_results.find(
            {'patient_id': patient_id}, 
            {'_id': 0}
        ).sort('creation_date', -1))  # Sort by creation date descending (newest first)
        
        print(f"Found {len(results)} diagnostic results")
        
        if results:
            # Look up patient information
            patients = get_patients_collection()
            patient = patients.find_one({'patient_id': patient_id}, {'_id': 0})
            
            # Add patient name to each result if available
            if patient:
                print(f"Found patient data: {patient.get('name')}")
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
            print(f"No diagnostic results found for patient {patient_id}")
            # Create a default result for this patient if we have prediction data
            try:
                # Check if we have a prediction for this patient
                from routes.prediction_routes import get_prediction_for_patient
                prediction_data = get_prediction_for_patient(patient_id)
                
                if prediction_data and prediction_data.status_code == 200:
                    print(f"Found prediction data for patient {patient_id}, creating diagnostic entry")
                    # Create a new diagnostic result from prediction
                    pred_json = prediction_data.get_json()
                    
                    # Create a diagnostic entry
                    diagnostic_data = {
                        'patient_id': patient_id,
                        'final_result': pred_json.get('predicted_class', 'Unknown'),
                        'abnormal_percentage': float(pred_json.get('confidence', 0.87)) * 100,
                        'doctor_recommendation': 'Based on AI prediction - requires doctor review',
                        'additional_insights': 'Automatically generated from prediction data',
                        'creation_date': datetime.now().isoformat(),
                        'status': 'pending'
                    }
                    
                    # Insert the diagnostic result
                    diagnostic_results.insert_one(diagnostic_data)
                    
                    # Return it
                    diagnostic_data['_id'] = str(diagnostic_data.get('_id', ''))
                    return jsonify([diagnostic_data]), 200
            except Exception as pred_error:
                print(f"Error creating diagnostic from prediction: {str(pred_error)}")
                
            return jsonify({'message': 'No diagnostic results found for this patient'}), 404
    except Exception as e:
        print(f"Error retrieving diagnostic results: {str(e)}")
        return jsonify({'message': f'Error retrieving data: {str(e)}'}), 500

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
    try:
        print("\n----- Generating patient report -----")
        # Check which type of data we've received
        if request.content_type and 'application/json' in request.content_type:
            data = request.get_json()
            print(f"Received JSON data: {data}")
        elif request.form:
            data = request.form
            print(f"Received form data: {data}")
        else:
            data = {}
            print("No data received")
        
        if not data:
            return jsonify({"message": "No data provided"}), 400
        
        patient_name = data.get('name', 'Unknown')
        patient_id = data.get('patient_id', 'N/A')
        diagnosis = data.get('diagnosis', 'Pending')
        notes = data.get('notes', '')
        doctor_recommendation = data.get('doctor_recommendation', '')
        confidence_level = data.get('confidence_level', 'N/A')
        diagnosis_date = data.get('diagnosis_date', datetime.now().strftime('%Y-%m-%d'))
        
        print(f"Generating PDF for patient: {patient_name}, diagnosis: {diagnosis}")
        
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
        pdf.multi_cell(0, 8, doctor_recommendation or "Based on AI analysis, please consult with a healthcare professional.")
        pdf.ln(5)
        
        # Additional notes
        pdf.set_font('Arial', 'B', 12)
        pdf.cell(0, 10, 'Additional Notes', 0, 1)
        pdf.set_font('Arial', '', 11)
        pdf.multi_cell(0, 8, notes or "No additional notes provided.")
        pdf.ln(10)
        
        # Disclaimer
        pdf.set_font('Arial', 'I', 10)
        pdf.cell(0, 10, 'This report is generated based on AI analysis and should be reviewed by a healthcare professional.', 0, 1)
        pdf.cell(0, 10, 'Please consult with your doctor for proper medical advice and treatment options.', 0, 1)
        
        # Output the PDF
        pdf_bytes = pdf.output(dest='S').encode('latin-1')
        
        # Check if form data (likely from browser form)
        if request.form:
            print("Returning PDF as direct response for browser")
            from flask import make_response
            response = make_response(pdf_bytes)
            response.headers.set('Content-Type', 'application/pdf')
            response.headers.set('Content-Disposition', 'inline', filename=f'Report_{patient_name}.pdf')
            return response
            
        # JSON request gets JSON response
        return jsonify({
            "message": "PDF report generated successfully",
            "pdf_data": pdf_bytes.decode('latin-1')
        }), 200
        
    except Exception as e:
        print(f"Error generating PDF: {str(e)}")
        return jsonify({"message": f"Error generating report: {str(e)}"}), 500

@diagnostic_bp.route('/diagnostic_results/statistics', methods=['GET'])
def get_diagnostic_statistics():
    """Get statistics about diagnostic results"""
    try:
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
    except Exception as e:
        print(f"Error getting statistics: {str(e)}")
        return jsonify({'message': f'Error retrieving statistics: {str(e)}'}), 500

# Add this route to create a diagnostic result directly from prediction data
@diagnostic_bp.route('/create_diagnostic_from_prediction/<string:patient_id>', methods=['GET'])
def create_diagnostic_from_prediction(patient_id):
    """Create a diagnostic result directly from prediction data"""
    try:
        print(f"\n----- Creating diagnostic from prediction for patient: {patient_id} -----")
        
        # Check if we already have a diagnostic result for this patient
        diagnostic_results = get_diagnostic_results_collection()
        existing = diagnostic_results.find_one({'patient_id': patient_id})
        
        if existing:
            print(f"Diagnostic result already exists for patient {patient_id}")
            return jsonify({
                'message': 'Diagnostic result already exists',
                'diagnostic': {k: v for k, v in existing.items() if k != '_id'} or {'existing': True}
            }), 200
            
        # Get prediction data
        try:
            from routes.prediction_routes import get_prediction_for_patient
            prediction_response = get_prediction_for_patient(patient_id)
            
            if not prediction_response or prediction_response.status_code != 200:
                print(f"No prediction found for patient {patient_id}")
                return jsonify({'message': 'No prediction found for this patient'}), 404
                
            prediction_data = prediction_response.get_json()
            print(f"Got prediction data: {prediction_data}")
            
            # Create new diagnostic entry
            diagnostic_entry = {
                'patient_id': patient_id,
                'doctor_id': 'AI_SYSTEM',
                'final_result': prediction_data.get('predicted_class'),
                'abnormal_percentage': float(prediction_data.get('confidence', 0.87)) * 100,
                'doctor_recommendation': 'Please consult with a specialist based on these AI findings',
                'additional_insights': 'This is an automatic diagnosis based on AI analysis of your mammogram',
                'creation_date': datetime.now().isoformat(),
                'status': 'pending'
            }
            
            # Insert into database
            result = diagnostic_results.insert_one(diagnostic_entry)
            print(f"Created diagnostic entry with ID: {result.inserted_id}")
            
            # Get patient info to add to response
            patients = get_patients_collection()
            patient = patients.find_one({'patient_id': patient_id})
            
            if patient:
                diagnostic_entry['patient_name'] = patient.get('name')
            
            return jsonify({
                'message': 'Diagnostic result created from prediction',
                'diagnostic': diagnostic_entry
            }), 201
            
        except Exception as pred_error:
            print(f"Error getting prediction: {str(pred_error)}")
            return jsonify({'message': f'Error getting prediction: {str(pred_error)}'}), 500
            
    except Exception as e:
        print(f"Error creating diagnostic from prediction: {str(e)}")
        return jsonify({'message': f'Error creating diagnostic: {str(e)}'}), 500
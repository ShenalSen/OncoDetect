import os
import uuid
from werkzeug.utils import secure_filename
from config import Config
from fpdf import FPDF
from flask import current_app

def allowed_file(filename, allowed_extensions=None):
    """
    Utility function to check if the uploaded file has an allowed extension
    """
    if allowed_extensions is None:
        allowed_extensions = Config.ALLOWED_EXTENSIONS
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in allowed_extensions

def save_file(file):
    """
    Save an uploaded file to the configured upload folder
    Returns ONLY the filename (not the path)
    """
    if file and allowed_file(file.filename):
        # Generate a unique filename to avoid collisions
        original_filename = secure_filename(file.filename)
        # Get extension
        ext = original_filename.rsplit('.', 1)[1].lower() if '.' in original_filename else ''
        # Create a unique filename with the original extension
        unique_filename = f"{uuid.uuid4().hex}.{ext}"
        
        # Use UPLOAD_FOLDER from Config directly or from current_app
        upload_folder = getattr(current_app, 'config', {}).get('UPLOAD_FOLDER', Config.UPLOAD_FOLDER)
        
        # Ensure the upload folder exists
        if not os.path.exists(upload_folder):
            os.makedirs(upload_folder)
        
        # Full path for saving
        file_path = os.path.join(upload_folder, unique_filename)
        
        # Save the file
        file.save(file_path)
        
        # Log for debugging
        print(f"File saved at: {file_path}")
        
        # Return ONLY the filename, not the path
        return unique_filename
    return None

def get_file_path(filename):
    """
    Get the full path for a file in the upload folder
    """
    if not filename:
        return None
    
    # Use UPLOAD_FOLDER from Config directly or from current_app
    upload_folder = getattr(current_app, 'config', {}).get('UPLOAD_FOLDER', Config.UPLOAD_FOLDER)
    return os.path.join(upload_folder, filename)

def generate_pdf_report(patient_name, patient_id, diagnosis, notes):
    """
    Generate a PDF report for a patient's breast cancer detection results
    """
    pdf = FPDF()
    pdf.add_page()
    pdf.set_font("Arial", size=12)
    
    # Report title
    pdf.cell(200, 10, txt="Breast Cancer Detection Report", ln=True, align='C')
    pdf.ln(10)
    
    # Patient information
    pdf.cell(200, 10, txt=f"Patient Name: {patient_name}", ln=True)
    pdf.cell(200, 10, txt=f"Patient ID:   {patient_id}", ln=True)
    pdf.ln(5)
    
    # Diagnosis and notes
    pdf.cell(200, 10, txt=f"Diagnosis:    {diagnosis}", ln=True)
    pdf.cell(200, 10, txt="Notes:", ln=True)
    pdf.multi_cell(0, 10, txt=notes)
    pdf.ln(5)
    
    # Footer
    pdf.cell(200, 10, txt="--- End of Report ---", ln=True, align='C')
    
    return pdf
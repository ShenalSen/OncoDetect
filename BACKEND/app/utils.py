import os
from werkzeug.utils import secure_filename
from config import Config
from fpdf import FPDF

def allowed_file(filename, allowed_extensions=None):
    if allowed_extensions is None:
        allowed_extensions = Config.ALLOWED_EXTENSIONS
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in allowed_extensions

def generate_pdf_report(patient_name, patient_id, diagnosis, notes):
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

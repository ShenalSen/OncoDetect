from app import db
from flask_login import UserMixin

class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(256), nullable=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    google_id = db.Column(db.String(256), unique=True, nullable=True)

class Patient(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    patient_id = db.Column(db.String(100), unique=True, nullable=False)
    name = db.Column(db.String(120), nullable=False)
    age = db.Column(db.Integer, nullable=False)
    contact_number = db.Column(db.String(20), nullable=False)
    appointment_id = db.Column(db.String(100), nullable=False)
    scan_file = db.Column(db.String(256), nullable=True)

class Appointment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    patient_id = db.Column(db.String(100), nullable=False)
    doctor_id = db.Column(db.String(100), nullable=False)
    appointment_date = db.Column(db.DateTime, nullable=False)
    description = db.Column(db.String(500), nullable=True)

class Notification(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False)
    message = db.Column(db.String(500), nullable=False)
    timestamp = db.Column(db.DateTime, server_default=db.func.current_timestamp())

class DoctorProof(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    doctor_id = db.Column(db.String(100), nullable=False)
    proof_file = db.Column(db.String(256), nullable=False)
    upload_date = db.Column(db.DateTime, server_default=db.func.current_timestamp())

class DiagnosticResult(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    patient_id = db.Column(db.String(100), nullable=False)
    appointment_id = db.Column(db.String(100), nullable=True)
    annotated_image = db.Column(db.String(256), nullable=True)
    total_percentage = db.Column(db.Float, nullable=True)
    normal_percentage = db.Column(db.Float, nullable=True)
    abnormal_percentage = db.Column(db.Float, nullable=True)
    ambiguous_percentage = db.Column(db.Float, nullable=True)
    date_of_scan = db.Column(db.DateTime, server_default=db.func.current_timestamp())
    doctor_recommendation = db.Column(db.String(512), nullable=True)
    additional_insights = db.Column(db.String(512), nullable=True)
    final_result = db.Column(db.String(512), nullable=True)

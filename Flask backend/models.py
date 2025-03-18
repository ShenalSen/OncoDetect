
from flask import current_app

def get_db():
    return current_app.db

def get_users_collection():
    return get_db().users

def get_patients_collection():
    return get_db().patients

def get_appointments_collection():
    return get_db().appointments

def get_notifications_collection():
    return get_db().notifications

def get_doctor_profs_collection():
    return get_db().doctor_profs

def get_diagnostic_results_collection():
    return get_db().diagnostic_results

def get_patient_data_collection():
    return get_db().patient_data
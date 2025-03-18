import pytest
import requests

BASE_URL = 'http://localhost:5000'

def test_home():
    response = requests.get(f'{BASE_URL}/')
    assert response.status_code == 200
    assert response.json() == {'message': 'Welcome to Oncodetect backend!'}

def test_create_appointment():
    appointment_data = {
        'patient_id': '123',
        'doctor_id': '456',
        'appointment_date': '2023-10-01 10:00:00',
        'description': 'Regular checkup'
    }
    response = requests.post(f'{BASE_URL}/appointment', json=appointment_data)
    assert response.status_code == 201
    assert response.json() == {'message': 'Appointment created successfully'}

def test_get_appointments():
    response = requests.get(f'{BASE_URL}/appointments')
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_register():
    register_data = {
        'email': 'noo@example.com',
        'username': 'ro',
        'password': 'newpassword123'
    }
    response = requests.post(f'{BASE_URL}/register', json=register_data)
    assert response.status_code == 201
    assert response.json() == {'message': 'User registered successfully'}

def test_login():
    login_data = {
        'email': 'ne@example.com',
        'password': 'newpassword123'
    }
    response = requests.post(f'{BASE_URL}/login', json=login_data)
    assert response.status_code == 200
    assert 'token' in response.json()



def test_predict():
    file_path = 'C:/Users/nimes/OneDrive/Desktop/SDGP/test_image.png'
    with open(file_path, 'rb') as file:
        files = {'file': file}
        response = requests.post(f'{BASE_URL}/predict', files=files)
    assert response.status_code == 200
    assert 'predicted_class' in response.json()
    assert 'confidence' in response.json()

def test_add_patient_data():
    patient_data = {
        'name': 'John Doe',
        'date_in': '2023-10-01',
        'final_result': 'Positive',
        'prediction_status': 'High Risk'
    }
    response = requests.post(f'{BASE_URL}/patient_data', json=patient_data)
    assert response.status_code == 201
    assert response.json() == {'message': 'Patient data added successfully'}

def test_get_all_patient_data():
    response = requests.get(f'{BASE_URL}/patient_data')
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_generate_patient_report():
    report_data = {
        'name': 'John Doe',
        'patient_id': '123',
        'diagnosis': 'Breast Cancer',
        'notes': 'Patient is responding well to treatment.'
    }
    response = requests.post(f'{BASE_URL}/patient_report', json=report_data)
    assert response.status_code == 200
    assert response.headers['Content-Type'] == 'application/pdf'
    assert 'BreastCancerReport.pdf' in response.headers['Content-Disposition']
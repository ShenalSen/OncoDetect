from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt
from config import bcrypt, blacklist
from models import get_users_collection
from models import get_doctor_profs_collection
from datetime import datetime

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    users = get_users_collection()
    user = users.find_one({'email': email})

    if user and bcrypt.check_password_hash(user['password'], password):
        access_token = create_access_token(identity=str(user['_id']))
        return jsonify({'message': 'Login successful', 'token': access_token}), 200
    else:
        return jsonify({'message': 'Invalid credentials'}), 401

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    email = data.get('email')
    username = data.get('username')
    password = data.get('password')
    specialization = data.get('specialization')
    license_number = data.get('licenseNumber')
    hospital = data.get('hospital')
    contact_number = data.get('contactNumber')
    
    # Validate required fields
    if not all([email, username, password]):
        return jsonify({'message': 'Email, name, and password are required'}), 400
    
    # Get collections
    users = get_users_collection()
    doctors = get_doctor_profs_collection()  # Using doctor_profs collection
    
    # Check if user already exists
    if users.find_one({'email': email}):
        return jsonify({'message': 'User with this email already exists'}), 400
    
    # Check if license number is already registered (if provided)
    if license_number and doctors.find_one({'licenseNumber': license_number}):
        return jsonify({'message': 'Doctor with this license number already exists'}), 400
    
    # Create user account
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    user = {
        'email': email,
        'username': username,
        'password': hashed_password,
        'role': 'doctor',
        'created_at': datetime.now().isoformat()
    }
    user_result = users.insert_one(user)
    
    # Create doctor profile
    doctor = {
        'userId': str(user_result.inserted_id),
        'name': username,
        'email': email,
        'specialization': specialization or 'General Practitioner',
        'licenseNumber': license_number or 'Not provided',
        'hospital': hospital or 'Not provided',
        'contactNumber': contact_number or 'Not provided',
        'yearsExperience': 0,
        'totalPatients': 0,
        'predictionsMade': 0,
        'accuracyRate': 0,
        'createdAt': datetime.now().isoformat()
    }
    doctors.insert_one(doctor)

    return jsonify({'message': 'Doctor registered successfully'}), 201

@auth_bp.route('/logout', methods=['POST'])
@jwt_required()
def logout():
    try:
        jti = get_jwt()["jti"]
        blacklist.add(jti)
        return jsonify({"message": "Successfully logged out"}), 200
    except Exception as e:
        print(f"Logout error: {str(e)}")
        return jsonify({"message": "Error during logout", "error": str(e)}), 500
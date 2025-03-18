from flask import Flask
from flask_cors import CORS
from config import configure_app
from routes.auth_routes import auth_bp
from routes.patient_routes import patient_bp
from routes.appointment_routes import appointment_bp
from routes.notification_routes import notification_bp
from routes.doctor_routes import doctor_bp
from routes.diagnostic_routes import diagnostic_bp
from routes.patient_data_routes import patient_data_bp
from routes.prediction_routes import prediction_bp
import os

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}}, supports_credentials=True)

# Configure the app
configure_app(app)

# Register blueprints
app.register_blueprint(auth_bp)
app.register_blueprint(patient_bp)
app.register_blueprint(appointment_bp)
app.register_blueprint(notification_bp)
app.register_blueprint(doctor_bp)
app.register_blueprint(diagnostic_bp)
app.register_blueprint(patient_data_bp)
app.register_blueprint(prediction_bp)

# Root route to check if the backend is working
@app.route('/', methods=['GET'])
def home():
    from flask import jsonify
    return jsonify({'message': 'Welcome to Oncodetect backend!'}), 200

# Ensure the upload directory exists
if not os.path.exists(app.config['UPLOAD_FOLDER']):
    os.makedirs(app.config['UPLOAD_FOLDER'])

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
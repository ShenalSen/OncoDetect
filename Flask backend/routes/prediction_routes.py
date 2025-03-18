from flask import Blueprint, request, jsonify
from models import get_patients_collection
from utils import save_file
import cv2
import numpy as np
from tensorflow.keras.models import load_model

prediction_bp = Blueprint('prediction', __name__)

# Load the model
model = load_model("best_model_M1_V2.keras")

@prediction_bp.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'message': 'No file part in the request'}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({'message': 'No file selected'}), 400

    # Save the file temporarily
    file_path = save_file(file)
    if not file_path:
        return jsonify({'message': 'Invalid file type'}), 400

    # Preprocess the image
    img = cv2.imread(file_path)
    img = cv2.resize(img, (224, 224))
    img = np.reshape(img, [1, 224, 224, 3])

    # Make prediction
    prediction = model.predict(img)
    predicted_class = np.argmax(prediction)
    confidence = np.max(prediction)

    # Map the prediction to class labels
    class_labels = ['Benign', 'Malignant']
    predicted_label = class_labels[predicted_class]

    # Return the prediction
    return jsonify({
        'predicted_class': predicted_label,
        'confidence': float(confidence)
    }), 200
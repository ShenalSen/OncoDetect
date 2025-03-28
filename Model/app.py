import os
import streamlit as st
from tensorflow.keras.models import load_model  # type: ignore
import cv2
import numpy as np


# Load the trained model
try:
    SAVED_MODEL_PATH = r"C:\\F\\ml_modelOD\\saved_model\\best_model.h5"
    model = load_model(SAVED_MODEL_PATH)
    st.success("Model loaded successfully!")
except Exception as e:
    st.error(f"Error loading model: {e}")
    st.stop()


# Function to preprocess the uploaded image
def preprocess_image(image_path):
    """Preprocesses an image for model prediction."""
    img = cv2.imread(image_path)
    if img is None:
        raise ValueError("Image not found or invalid path!")
    img_resized = cv2.resize(img, (224, 224))
    img_normalized = img_resized / 255.0
    return np.expand_dims(img_normalized, axis=0)


# Function to predict the uploaded image
def predict_image(image_path):
    """Predicts whether the image is positive or negative for breast cancer."""
    preprocessed_image = preprocess_image(image_path)
    prediction = model.predict(preprocessed_image)
    probability = prediction[0][0]
    if probability > 0.5:
        return f"Positive for breast cancer (confidence: {probability:.2f})"
    else:
        return f"Negative for breast cancer (confidence: {1 - probability:.2f})"


# Streamlit app interface
st.title("Breast Cancer Detection App")
st.write("Upload an image to get a prediction.")

uploaded_file = st.file_uploader("Choose an image...", type=["jpg", "png", "jpeg"])

if uploaded_file is not None:
    temp_image_path = "temp_image.jpg"
    with open(temp_image_path, "wb") as f:
        f.write(uploaded_file.getbuffer())

    try:
        prediction_result = predict_image(temp_image_path)
        st.write(prediction_result)
    except Exception as e:
        st.error(f"Error during prediction: {e}")
    finally:
        # Cleanup temporary file
        if os.path.exists(temp_image_path):
            os.remove(temp_image_path)

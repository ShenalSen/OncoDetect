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

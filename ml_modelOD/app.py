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

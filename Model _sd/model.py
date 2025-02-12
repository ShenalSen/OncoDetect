import cv2
import numpy as np
import tensorflow as tf
import matplotlib.pyplot as plt
from tensorflow.keras.layers import Conv2D, MaxPooling2D, UpSampling2D, concatenate, Input 
from tensorflow.keras.models import Model

# Load and Preprocess Mammogram Image
def preprocess_image(image_path):
    # Load Image in Grayscale
    image = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)

    # Resize for U-Net (256x256)
    image = cv2.resize(image, (256, 256))

    # Apply CLAHE (Contrast Limited Adaptive Histogram Equalization)
    clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8, 8))
    enhanced_image = clahe.apply(image)

    # Apply Median Filter for Denoising
    denoised_image = cv2.medianBlur(enhanced_image, 3)

    # Normalize to 0-1 Range
    processed_image = denoised_image / 255.0

    return processed_image

# U-Net Model for Mammogram Segmentation
def unet_model(input_size=(256, 256, 1)):
    inputs = Input(input_size)

    # Encoder (Downsampling)
    c1 = Conv2D(64, (3, 3), activation='relu', padding='same')(inputs)
    c1 = Conv2D(64, (3, 3), activation='relu', padding='same')(c1)
    p1 = MaxPooling2D(pool_size=(2, 2))(c1)

    c2 = Conv2D(128, (3, 3), activation='relu', padding='same')(p1)
    c2 = Conv2D(128, (3, 3), activation='relu', padding='same')(c2)
    p2 = MaxPooling2D(pool_size=(2, 2))(c2)

    # Bottleneck
    c3 = Conv2D(256, (3, 3), activation='relu', padding='same')(p2)
    c3 = Conv2D(256, (3, 3), activation='relu', padding='same')(c3)

    # Decoder (Upsampling)
    u4 = UpSampling2D(size=(2, 2))(c3)
    c4 = Conv2D(128, (3, 3), activation='relu', padding='same')(u4)
    c4 = Conv2D(128, (3, 3), activation='relu', padding='same')(c4)
    c4 = concatenate([c2, c4])

    u5 = UpSampling2D(size=(2, 2))(c4)
    c5 = Conv2D(64, (3, 3), activation='relu', padding='same')(u5)
    c5 = Conv2D(64, (3, 3), activation='relu', padding='same')(c5)
    c5 = concatenate([c1, c5])

    outputs = Conv2D(1, (1, 1), activation='sigmoid')(c5)

    model = Model(inputs=[inputs], outputs=[outputs])
    return model

# Load and Preprocess the Image
image_path = "mammogram.jpg"
preprocessed_image = preprocess_image(image_path)

# Display Original and Preprocessed Image
plt.figure(figsize=(8, 4))
plt.subplot(1, 2, 1)
plt.imshow(cv2.imread(image_path, cv2.IMREAD_GRAYSCALE), cmap="gray")
plt.title("Original Mammogram")

plt.subplot(1, 2, 2)
plt.imshow(preprocessed_image, cmap="gray")
plt.title("Enhanced Mammogram")
plt.show()

# Load U-Net Model
unet = unet_model()
unet.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])

# Reshape Image for U-Net Input
input_image = np.expand_dims(preprocessed_image, axis=(0, -1))

# Predict Segmentation Mask
predicted_mask = unet.predict(input_image)[0, :, :, 0]

# Display Segmented Region
plt.figure(figsize=(8, 4))
plt.subplot(1, 2, 1)
plt.imshow(preprocessed_image, cmap="gray")
plt.title("Enhanced Mammogram")

plt.subplot(1, 2, 2)
plt.imshow(predicted_mask, cmap="jet")
plt.title("Segmented Breast Region")
plt.show()

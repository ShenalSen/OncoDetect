import cv2
import numpy as np
import matplotlib.pyplot as plt

def preprocess_mammogram(image_path):
    # Read the image
    img = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)
    
    # Step 1: Apply CLAHE for contrast enhancement
    clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8, 8))
    enhanced = clahe.apply(img)

    # Step 2: Apply Median Filtering to reduce noise
    denoised = cv2.medianBlur(enhanced, 5)

    # Step 3: Apply Otsu’s thresholding to segment the breast
    _, binary_mask = cv2.threshold(denoised, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)

    # Step 4: Find contours to detect the largest region (breast)
    contours, _ = cv2.findContours(binary_mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    
    if contours:
        largest_contour = max(contours, key=cv2.contourArea)

        # Step 5: Create a mask for the largest contour
        mask = np.zeros_like(binary_mask)
        cv2.drawContours(mask, [largest_contour], -1, (255), thickness=cv2.FILLED)

        # Step 6: Apply the mask to remove unwanted regions
        segmented = cv2.bitwise_and(denoised, denoised, mask=mask)

        # Step 7: Crop the image based on bounding box of the largest contour
        x, y, w, h = cv2.boundingRect(largest_contour)
        cropped = segmented[y:y+h, x:x+w]

        return img, denoised, segmented #cropped  # Return all images
    else:
        return img, denoised, segmented #denoised  # If no contours found, return denoised image


# Image path
image_path = 'mammogram.jpg'

# Load and process the mammogram
original_image, denoised_image, processed_image = preprocess_mammogram(image_path)

# Display all images
fig, axes = plt.subplots(1, 3, figsize=(15, 5))

# Original Mammogram
axes[0].imshow(original_image, cmap='gray')
axes[0].set_title("Original Mammogram")
axes[0].axis('off')

# Denoised Mammogram
axes[1].imshow(denoised_image, cmap='gray')
axes[1].set_title("Denoised Mammogram")
axes[1].axis('off')

# Processed Mammogram
axes[2].imshow(processed_image, cmap='gray')
axes[2].set_title("Processed Mammogram")
axes[2].axis('off')

# Show the final output
plt.show()

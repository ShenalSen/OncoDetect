import cv2
import numpy as np
import os

# Paths
input_folder = r"C:\Users\Shen Senarathne\Downloads\Model\Mammogram_Project\data\original"
output_folder = r"C:\Users\Shen Senarathne\Downloads\Model\Mammogram_Project\data\preprocessed\training"

# Check if input folder exists
if not os.path.exists(input_folder):
    print(f"Error: Input folder '{input_folder}' does not exist!")
    exit()

# Get list of image files in the input folder
image_files = [f for f in os.listdir(input_folder) if f.endswith((".jpg", ".png"))]

# Check if input folder is empty
if not image_files:
    print(f"Error: Input folder '{input_folder}' is empty. No images to process.")
    exit()

# Ensure output directory exists
os.makedirs(output_folder, exist_ok=True)

def preprocess_mammogram(image_path):
    """Preprocess a mammogram image by enhancing contrast, reducing noise, and segmenting the breast region."""
    try:
        # Read the image
        img = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)
        if img is None:
            raise ValueError(f"Could not read image: {image_path}")

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

            return segmented  # Return processed image
        else:
            return denoised  # If no contours found, return denoised image

    except Exception as e:
        print(f"Error processing {image_path}: {str(e)}")
        return None

# Process all images in the original dataset folder
for filename in image_files:
    image_path = os.path.join(input_folder, filename)
    
    processed_image = preprocess_mammogram(image_path)
    
    if processed_image is not None:
        output_path = os.path.join(output_folder, filename)
        
        try:
            cv2.imwrite(output_path, processed_image)
            print(f"Processed and saved: {filename}")
        except Exception as e:
            print(f"Error saving {filename}: {str(e)}")

print("All images have been processed successfully!")

import os

# Define main project directory
project_dir = "C:\\Users\\Shen Senarathne\\Downloads\\Model\\Mammogram_Project"



# Define subdirectories
folders = [
    "data/original",
    "data/preprocessed/train",
    "data/preprocessed/validation",
    "models",
    "scripts",
    "notebooks",
    "results"
]

# Create directories
for folder in folders:
    os.makedirs(os.path.join(project_dir, folder), exist_ok=True)

print("Project structure created successfully!")

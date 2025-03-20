# OncoDetect

OncoDetect is an AI-powered breast cancer detection tool designed to improve the accuracy of diagnostic imaging through advanced image processing and machine learning techniques. The system leverages mammogram image analysis to classify breast cancer into malignant, benign, or normal categories, ensuring early detection and effective treatment strategies.

## Table of Contents
- [About the Project](#about-the-project)
  - [Problem Statement](#problem-statement)
  - [Proposed Solution](#proposed-solution)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## About the Project

### Problem Statement
Breast cancer is one of the leading causes of cancer-related deaths among women worldwide, often due to late detection and the limitations of current imaging technologies. The need for accessible, accurate, and scalable diagnostic tools remains unmet, especially in low-resource settings.

### Proposed Solution
OncoDetect aims to address these challenges by:
- Utilizing machine learning models to analyze mammogram images.
- Offering a user-friendly interface for healthcare providers.
- Ensuring data privacy and security compliant with GDPR and HIPAA regulations.

## Features
- **AI-Powered Image Analysis**: Automated mammogram image analysis using machine learning.
- **Diagnostic Categorization**: Classification of mammograms into malignant, benign, or normal categories.
- **User-Friendly Interface**: Intuitive design for healthcare practitioners.
- **Training Module**: A feature for medical students to practice with sample datasets.
- **Data Security**: Compliance with medical data protection standards.

## Tech Stack
- **Frontend**: ReactJS
- **Backend**: Flask (Python)
- **AI/ML Frameworks**: TensorFlow, Open CV, Matplotlib, Pandas
- **Containerization**: Docker
- **Security**: JWT for API authentication, HTTPS for secure communication
- **Dataset**: CBIS-DDSM (Curated Breast Imaging Subset of DDSM)

## Getting Started

### Prerequisites
Ensure you have the following installed:
- [Python](https://www.python.org/downloads/) (3.9 or above)
- [Node.js](https://nodejs.org/)
- [Docker](https://www.docker.com/)

### Installation
1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-organization/OncoDetect.git
   cd OncoDetect
   ```

2. **Setup Backend**
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   python manage.py migrate
   python manage.py runserver
   ```

3. **Setup Frontend**
   ```bash
   cd frontend
   npm install
   npm start
   ```

4. **Run Docker Containers** (Optional)
   ```bash
   docker-compose up
   ```

## Usage
1. Access the web interface at `http://localhost:3000`.
2. Upload mammogram images for analysis.
3. View diagnostic results and insights.

## Contributing
We welcome contributions from the community! To contribute:
1. Fork the repository.
2. Checkout your branch (`git checkout -b feature-name`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature-name`).
5. Open a pull request.

## License
Distributed under the MIT License. See `LICENSE` for more information.

---

For more details, contact us at [team@oncodetect.com](mailto:team@oncodetect.com).

EER - Commit. DD14519331

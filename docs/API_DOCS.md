# API Documentation for Oncodetect

## Overview
The Oncodetect API provides endpoints to support the breast cancer detection application. It allows users to authenticate, upload mammogram images, retrieve analysis results, and manage patient data. This API is built using Django REST Framework (DRF).

---

## Base URL
```plaintext
http://<your-domain-or-ip>/api/v1/
```

---

## Authentication
All endpoints (except `/auth/login` and `/auth/register`) require authentication via JSON Web Tokens (JWT).

### **1. Register a New User**
**Endpoint:** `POST /auth/register`

**Request Body:**
```json
{
    "username": "string",
    "email": "string",
    "password": "string"
}
```

**Response:**
```json
{
    "message": "User registered successfully!",
    "user": {
        "id": 1,
        "username": "string",
        "email": "string"
    }
}
```

### **2. Login**
**Endpoint:** `POST /auth/login`

**Request Body:**
```json
{
    "username": "string",
    "password": "string"
}
```

**Response:**
```json
{
    "access": "jwt-token",
    "refresh": "jwt-refresh-token"
}
```

---

## Mammogram Detection

### **3. Upload Mammogram Image**
**Endpoint:** `POST /detection/upload`

**Headers:**
```plaintext
Authorization: Bearer <jwt-token>
```

**Request Body:** (Multipart form-data)
```plaintext
image: File (mammogram image in .jpg, .png, or .dicom format)
```

**Response:**
```json
{
    "message": "Image uploaded successfully.",
    "analysis_id": "string"
}
```

### **4. Retrieve Detection Results**
**Endpoint:** `GET /detection/result/<analysis_id>`

**Headers:**
```plaintext
Authorization: Bearer <jwt-token>
```

**Response:**
```json
{
    "analysis_id": "string",
    "prediction": "cancerous" | "non-cancerous",
    "confidence_score": 0.95,
    "highlighted_regions": "url-to-image-with-annotations"
}
```

---

## Patient Management

### **5. Create Patient Record**
**Endpoint:** `POST /patients/create`

**Headers:**
```plaintext
Authorization: Bearer <jwt-token>
```

**Request Body:**
```json
{
    "name": "string",
    "age": 45,
    "gender": "female",
    "history": "Patient medical history"
}
```

**Response:**
```json
{
    "message": "Patient record created successfully.",
    "patient_id": "string"
}
```

### **6. Retrieve Patient Records**
**Endpoint:** `GET /patients/`

**Headers:**
```plaintext
Authorization: Bearer <jwt-token>
```

**Response:**
```json
[
    {
        "id": "string",
        "name": "string",
        "age": 45,
        "gender": "female",
        "history": "Patient medical history"
    }
]
```

---

## Error Handling
All error responses follow this format:
```json
{
    "error": "string",
    "details": "string"
}
```

### Common Errors:
- **401 Unauthorized:** Invalid or missing JWT token.
- **400 Bad Request:** Invalid input data.
- **404 Not Found:** Resource does not exist.

---

## Future Endpoints
1. **Edit Patient Record:** `PATCH /patients/<patient_id>`
2. **Delete Patient Record:** `DELETE /patients/<patient_id>`
3. **Get Detection History:** `GET /detection/history`

For further queries, contact the API development team.

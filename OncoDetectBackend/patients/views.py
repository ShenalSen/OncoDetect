from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from .models import Patient

# Get all patients
def list_patients(request):
    patients = Patient.objects.all().values()
    return JsonResponse(list(patients), safe=False)

# Create a new patient
def create_patient(request):
    if request.method == "POST":
        data = request.POST
        patient = Patient.objects.create(
            first_name=data["first_name"],
            last_name=data["last_name"],
            age=data["age"],
            diagnosis=data["diagnosis"],
            contact_number=data["contact_number"],
            email=data["email"],
        )
        return JsonResponse({"message": "Patient created!", "id": patient.id})

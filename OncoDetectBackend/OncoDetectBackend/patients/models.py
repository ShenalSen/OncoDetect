from django.db import models

class Patient(models.Model):
    patient_id=models.CharField(max_length=100,unique=True)
    name=models.CharField(max_length=200)
    age=models.IntegerField()
    contact_number=models.CharField(max_length=15)
    appointment_id=models.CharField(max_length=100)
    uploaded_file=models.FileField(upload_to="uploads/",blank=True,null=True)



    
    def __str__(self):
        return self.name
    

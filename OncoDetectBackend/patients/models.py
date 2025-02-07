from django.db import models

class Patient(models.Model):
    first_name=models.CharField(max_length=100)
    last_name=models.CharField(max_length=100)
    age=models.PositiveIntegerField()
    diagnosis=models.TextField()
    contact_number=models.CharField(max_length=20)
    email=models.EmailField()

    def __str__(self):
        return f"{self.first_name} {self.last_name}"
    



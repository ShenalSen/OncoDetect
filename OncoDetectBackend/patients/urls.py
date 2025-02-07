from django.urls import path
from . import views

urlpatterns = [
    path("list/", views.list_patients, name="list_patients"),
    path("create/", views.create_patient, name="create_patient"),
]

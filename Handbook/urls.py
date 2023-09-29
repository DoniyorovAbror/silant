from django.urls import path
from .views import *

urlpatterns = [
    path('machine/<str:slug>', modelOfMachine, name='model_machine'),
    path('engine/<str:slug>', modelOfEngine, name='model_engine'),
    path('transmission/<str:slug>', modelOfTransmission, name='model_transmission'),
    path('mainaxle/<str:slug>', modelOfMainAxle, name='model_mainaxle'),
    path('steeringaxle/<str:slug>', modelOfSteeringAxle, name='model_steeringaxle'),
    path('maintenancetype/<int:id>', typeOfMaintenance, name='model_maintenance'),
    path('failuretype/<int:id>', typeOfFailure, name='model_failure'),
    path('recoverymethod/<int:id>', methodOfRecovery, name='model_recovery'),
]


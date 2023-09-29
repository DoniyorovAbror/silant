from django.contrib import admin
from .models import ModelOfMachine, ModelOfEngine, ModelOfMainAxle, ModelOfSteeringAxle, ModelOfTransmission, MethodOfRecovery, TypeOfFailure, TypeOfMaintenance

# Register your models here.
admin.site.register(ModelOfMachine)
admin.site.register(ModelOfEngine)
admin.site.register(ModelOfMainAxle)
admin.site.register(ModelOfSteeringAxle)
admin.site.register(ModelOfTransmission)
admin.site.register(MethodOfRecovery)
admin.site.register(TypeOfFailure)
admin.site.register(TypeOfMaintenance)
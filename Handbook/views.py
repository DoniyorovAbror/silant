from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from .models import *
# Create your views here.

@login_required(login_url='/account/login')
def modelOfMachine(request, slug):
    _modelOfMachine = ModelOfMachine.objects.get(title=slug)
    return render(request=request, context={'model': _modelOfMachine}, template_name='handbook_page.html')

@login_required(login_url='/account/login')
def modelOfEngine(request, slug):
    _modelOfEngine = ModelOfEngine.objects.get(title=slug)
    return render(request=request, context={'model': _modelOfEngine}, template_name='handbook_page.html')

@login_required(login_url='/account/login')
def modelOfTransmission(request, slug):
    _modelOfTransmission = ModelOfTransmission.objects.get(title=slug)
    return render(request=request, context={'model': _modelOfTransmission}, template_name='handbook_page.html')

@login_required(login_url='/account/login')
def modelOfMainAxle(request, slug):
    _modelOfMainAxle = ModelOfMainAxle.objects.get(title=slug)
    return render(request=request, context={'model': _modelOfMainAxle}, template_name='handbook_page.html')

@login_required(login_url='/account/login')
def modelOfSteeringAxle(request, slug):
    _modelOfSteeringAxle = ModelOfSteeringAxle.objects.get(title=slug)
    return render(request=request, context={'model': _modelOfSteeringAxle}, template_name='handbook_page.html')

@login_required(login_url='/account/login')
def typeOfMaintenance(request, id):
    _typeOfMaintenance = TypeOfMaintenance.objects.get(id=id)
    return render(request=request, context={'model': _typeOfMaintenance}, template_name='handbook_page.html')

@login_required(login_url='/account/login')
def typeOfFailure(request, id):
    _typeOfFailure = TypeOfFailure.objects.get(id=id)
    return render(request=request, context={'model': _typeOfFailure}, template_name='handbook_page.html')

@login_required(login_url='/account/login')
def methodOfRecovery(request, id):
    _methodOfRecovery = MethodOfRecovery.objects.get(id=id)
    return render(request=request, context={'model': _methodOfRecovery}, template_name='handbook_page.html')

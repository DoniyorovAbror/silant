from django.http import Http404, HttpResponse
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import DjangoModelPermissions
from .serializers import *
from .models import Vehicle, Maintenance, Complaints
from django.shortcuts import render
from django.contrib.auth.decorators import login_required
import json
from datetime import datetime
from django.db.models import Q

def Index(request):
    return render(request=request, template_name='index.html')

@login_required(login_url='/account/login')
def vehicle_detailed(request, id):
    return render(request=request, template_name='detailed/detailed.html', context={'id': id})

@login_required(login_url='/account/login')
def add_data(request, name):
    users = User.objects.all().exclude(Q(is_superuser=True) | Q(username='manager'))
    vehicle = ModelOfMachine.objects.all()
    engine = ModelOfEngine.objects.all()
    transmission = ModelOfTransmission.objects.all()
    mainAxle = ModelOfMainAxle.objects.all()
    steeringAxle = ModelOfSteeringAxle.objects.all()
    vehicleFN = Vehicle.objects.all().values_list('factoryNumberOfMachine', flat=True)
    typeOfMaintenance = TypeOfMaintenance.objects.all()
    typeOfFailure = TypeOfFailure.objects.all()
    recoveryMethod = MethodOfRecovery.objects.all()
    return render(request=request, template_name='add_data.html', context={'name': name, 'vehicle': vehicle, 'engine': engine, \
                    'transmission': transmission, 'mainAxle': mainAxle, 'steeringAxle': steeringAxle, 'users': users, \
                    'vehicleFN': vehicleFN, 'typeOfMaintenance': typeOfMaintenance, 'typeOfFailure': typeOfFailure, 'recoveryMethod': recoveryMethod})

def AnonymousPage(request, id):
    try:
        vehicle = Vehicle.objects.get(factoryNumberOfMachine = id)
        data_text = {
            'factoryNumberOfMachine': vehicle.pk,
            'modelOfMachine': str(vehicle.modelOfMachine),
            'factoryNumberOfEngine': str(vehicle.factoryNumberOfEngine),
            'modelOfEngine': str(vehicle.modelOfEngine),
            'factoryNumberOfTransmission': str(vehicle.factoryNumberOfTransmission),
            'modelOfTransmission': str(vehicle.modelOfTransmission),
            'factoryNumberOfMainAxle': str(vehicle.factoryNumberOfMainAxle),
            'modelOfMainAxle': str(vehicle.modelOfMainAxle),
            'factoryNumberOfSteeringAxle': str(vehicle.factoryNumberOfSteeringAxle),
            'modelOfSteeringAxle': str(vehicle.modelOfSteeringAxle)
        }
    except Vehicle.DoesNotExist:
        raise Http404("not exist")
    
    return HttpResponse(json.dumps(data_text))

class VehicleViewSet(viewsets.ModelViewSet):
    permission_classes = (DjangoModelPermissions,)
    serializer_class = VehicleSerializer
    http_method_names = ('get', 'post')
    
    def get_queryset(self):
        user = self.request.user
        if user.is_authenticated:
            if user.is_superuser or user.users.role == 'MR':
                return Vehicle.objects.all()
            if user.users.role == 'CS':
                return Vehicle.objects.filter(client = user)
            if user.users.role == 'SC':
                return Vehicle.objects.filter(serviceCompany = user)
        
        
    def create(self, request, *args, **kwargs):
        
        if request.method == 'POST':
            data = self.request.data
            
            newMachine = {
                'factoryNumberOfMachine': data['factoryNumberOfMachine'],
                'modelOfMachine': ModelOfMachine.objects.get(pk = data['modelOfMachine']),
                'modelOfEngine': ModelOfEngine.objects.get(pk = data['modelOfEngine']),
                'factoryNumberOfEngine': data['factoryNumberOfEngine'],
                'modelOfTransmission': ModelOfTransmission.objects.get(pk = data['modelOfTransmission']),
                'factoryNumberOfTransmission': data['factoryNumberOfTransmission'],
                'modelOfMainAxle': ModelOfMainAxle.objects.get(pk = data['modelOfMainAxle']),
                'factoryNumberOfMainAxle': data['factoryNumberOfMainAxle'],
                'modelOfSteeringAxle': ModelOfSteeringAxle.objects.get(pk = data['modelOfSteeringAxle']),
                'factoryNumberOfSteeringAxle': data['factoryNumberOfSteeringAxle'],
                'supplyContract': data['supplyContract'],
                'consumer': data['consumer'],
                'additionalOptions': data['additionalOptions'],
                'operationAddress': data['operationAddress'],
                'client': User.objects.get(pk = data['client']),
                'serviceCompany': User.objects.get(pk = data['serviceCompany']),
            }
            
            Vehicle.objects.create(**newMachine)

            res = {'created': True}
            return Response(res, status=status.HTTP_200_OK)


class MaintenanceViewSet(viewsets.ModelViewSet):
    permission_classes = (DjangoModelPermissions,)
    serializer_class = MaintenanceSerializer
    http_method_names = ('get', 'post')
    
    def create(self, request, *args, **kwargs):
        if self.request.method == 'POST':
            data = self.request.data
            
            serviceCompany = Vehicle.objects.get(factoryNumberOfMachine = data['modelOfMachine'])
            if data['serviceCompany'] == "Самостоятельно":
                maintenanceServiceCompany = serviceCompany.client.id
            else:
                maintenanceServiceCompany = data['serviceCompany']
            
            newMaintenance = {
                'machine': Vehicle.objects.get(factoryNumberOfMachine = data['modelOfMachine']),
                'typeOfMaintenance': TypeOfMaintenance.objects.get(id = data['typeOfMaintenance']),
                'dateOfMaintenance': data['dateOfMaintenance'],
                'operatingTime': data['operatingTime'],
                'dateOrderWork': data['dateOrderWork'],
                'numberOrderWork': data['numberOrderWork'],
                'maintenanceServiceCompany': User.objects.get(id = maintenanceServiceCompany),
            }
            Maintenance.objects.create(**newMaintenance)
            res = {'created': True}
            return Response(res, status=status.HTTP_200_OK)
    
    def get_queryset(self):
        user = self.request.user
        print(user)
        if user.is_anonymous:
            return ''
             
        if user.is_superuser or user.users.role == 'MR':
            return Maintenance.objects.all()
        
        if user.users.role == 'CS':
            machine = Vehicle.objects.filter(client = user)
            return Maintenance.objects.filter(machine__in = machine)
        
        if user.users.role == 'SC':
            return Maintenance.objects.filter(maintenanceServiceCompany = user)


class ComplaintsViewSet(viewsets.ModelViewSet):
    permission_classes = (DjangoModelPermissions,)
    serializer_class = ComplaintsSerializer
    http_method_names = ('get', 'post')
    
    def create(self, request, *args, **kwargs):
        if self.request.method == 'POST':
            print(self.request.data)
            newComplaints = {
                'machine': Vehicle.objects.get(factoryNumberOfMachine = self.request.data['modelOfMachine']),
                'dateOfFailure': datetime.strptime(self.request.data['dateOfFailure'], '%Y-%m-%d').date(),
                'operatingTime': self.request.data['operatingTime'],
                'nodeOfFailure': TypeOfFailure.objects.get(id = self.request.data['nodeOfFailure']),
                'descriptionOfFailure': self.request.data['descriptionOfFailure'],
                'recoveryMethod': MethodOfRecovery.objects.get(id = self.request.data['recoveryMethod']),
                'usedSpareParts': self.request.data['usedSpareParts'],
                'dateOfRecovery': datetime.strptime(self.request.data['dateOfRecovery'], '%Y-%m-%d').date(),
                'serviceCompany': User.objects.get(id = self.request.data['serviceCompany'])
            }
            Complaints.objects.create(**newComplaints)
            return Response({'message': 'Запись Добавлен'}, status=status.HTTP_201_CREATED)
    
    def get_queryset(self):
        user = self.request.user
        
        if user.is_anonymous:
            return ''
             
        if user.is_superuser or user.users.role == 'MR':
            return Complaints.objects.all()
        
        if user.users.role == 'CS':
            machine = Vehicle.objects.filter(client = user)
            return Complaints.objects.filter(machine__in = machine)
        
        if user.users.role == 'SC':
            maintenanceOfMachines = Maintenance.objects.filter(maintenanceServiceCompany = user).values_list('machine_id', flat=True)
            machine = Vehicle.objects.filter(serviceCompany = user)
            machines = Vehicle.objects.filter(factoryNumberOfMachine__in = maintenanceOfMachines)
            return Complaints.objects.filter(machine__in = machines)



class DetailMaintenance(viewsets.ModelViewSet):
    permission_classes = (DjangoModelPermissions,)
    http_method_names = ['get',]
    queryset = Vehicle.objects.all()
    serializer_class = DetailedVehicleSerializer
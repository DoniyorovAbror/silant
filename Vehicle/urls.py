from django.urls import path, include
from rest_framework import routers
from .views import *

router = routers.SimpleRouter()
router.register(r'vehicle', VehicleViewSet, basename='vehicle')
router.register(r'maintenance', MaintenanceViewSet, basename='maintenance')
router.register(r'complaints', ComplaintsViewSet, basename='complaints')
router.register(r'detailed', DetailMaintenance, basename='detailed')

urlpatterns = [
    path('', Index, name='home'),
    path('vehicle/<str:id>', AnonymousPage, name='anonym_page'),
    path('vehicle_detailed/<str:id>', vehicle_detailed, name='detailed_page'),
    path('add_new_data/<str:name>', add_data, name='add_data'),
    path('', include(router.urls)),
    
]

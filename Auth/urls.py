from django.urls import path
from .views import *

urlpatterns = [
    path('account_detail/<int:id>', Account, name='account_detail')
]



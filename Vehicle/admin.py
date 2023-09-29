from django.contrib import admin
from .models import Vehicle, Maintenance, Complaints
# Register your models here.

admin.site.register(Vehicle)
admin.site.register(Maintenance)
admin.site.register(Complaints)
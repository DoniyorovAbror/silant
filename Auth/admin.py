from django.contrib import admin
from .models import Auth


class AuthAdmin(admin.ModelAdmin):
    list_display = ['get_username', 'role']
    
    def get_username(self, obj):
        return obj.user.username

admin.site.register(Auth, AuthAdmin)

from django.dispatch import receiver
from django.db.models.signals import post_save
from django.contrib.auth.models import User, Permission
from .models import Auth

@receiver(post_save, sender = Auth)
def addPermission(sender, instance=None, created=False, **kwargs):
  
    if created:
        user = User.objects.get(pk = instance.user_id)
        
        if instance.role == 'CR':
            user.user_permissions.add(Permission.objects.get(codename='view_vehicle'))
            user.user_permissions.add(Permission.objects.get(codename='view_maintenance'))
            user.user_permissions.add(Permission.objects.get(codename='add_maintenance'))
            user.user_permissions.add(Permission.objects.get(codename='view_complaints'))
        
        if instance.role == 'MR':
            user.user_permissions.add(Permission.objects.get(codename='add_vehicle'))
            user.user_permissions.add(Permission.objects.get(codename='view_vehicle'))
            user.user_permissions.add(Permission.objects.get(codename='add_maintenance'))
            user.user_permissions.add(Permission.objects.get(codename='view_maintenance'))
            user.user_permissions.add(Permission.objects.get(codename='add_complaints'))
            user.user_permissions.add(Permission.objects.get(codename='view_complaints'))
            
        if instance.role == 'SC':
            user.user_permissions.add(Permission.objects.get(codename='view_vehicle'))
            user.user_permissions.add(Permission.objects.get(codename='add_maintenance'))
            user.user_permissions.add(Permission.objects.get(codename='view_maintenance'))
            user.user_permissions.add(Permission.objects.get(codename='add_complaints'))
            user.user_permissions.add(Permission.objects.get(codename='view_complaints'))
            
        user.save()
from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class Auth(models.Model):
    consumer = 'CS'
    serviceCompany = 'SC'
    manager = 'MR'
    ROLE = [
        (consumer, 'Клиент'),
        (serviceCompany, 'Сервисная Компания'),
        (manager, 'Менеджер')
    ]
    user = models.OneToOneField(User, related_name='users', verbose_name='Пользователь', on_delete=models.CASCADE)
    role = models.CharField(max_length=2, verbose_name='Роль', choices=ROLE, default=None)
    
    def __str__(self):
        return f'{self.user.first_name}'
    
    def get_role(self):
        return f'{self.get_role_display()}'
    
    class Meta:
        verbose_name = 'Пользователь'
        verbose_name_plural = 'Пользователи'
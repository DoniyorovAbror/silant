from django.apps import AppConfig


class AuthConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'Auth'
    label = 'Auth'
    verbose_name = 'Аккаунты'
    
    def ready(self):
        import Auth.signals
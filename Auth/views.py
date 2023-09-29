from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from .models import Auth

@login_required(login_url='/account/login')
def Account(request, id):
    user = Auth.objects.get(user_id=id)
    return render(request=request, template_name='handbook_page.html', context={'user_info': user})
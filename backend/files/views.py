from django.http import JsonResponse
from django.shortcuts import render

from .models import File

def file_list_api(request):
    file_list = list(File.objects.values())
    return JsonResponse({'file_list': file_list})


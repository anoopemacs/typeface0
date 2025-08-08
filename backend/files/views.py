from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.shortcuts import render
from django.urls import reverse
from django.views.decorators.csrf import csrf_exempt
import uuid

from .models import File
from .services import write_file_to_disk

# We are disabling CSRF protection to make our app easier to test using Postman/Insomnia during development
# In production, dont do this. Instead use CSRF_TRUSTED_ORIGINS in settings.py file
# Limit it to just https://frontendurl.com
@csrf_exempt
def file_list_api(request):
    file_list = list(File.objects.values())
    return JsonResponse({"file_list": file_list})

@csrf_exempt
def file_upload_api(request):
    if request.method == "POST":
        file0 = request.FILES["myfile"]
        filename0 = file0.name

        # Prefix a random uuid name to store this file on disk as
        # This is done so that we can implement the 'Delete a file' functionality in the future
        # We would not want conflicting disk names. That would mean conflicts when deleting files
        diskname0 = f"{uuid.uuid4()}_{filename0}"

        # file0.content_type can be used to check that is indeed of the type it says in its name

        write_file_to_disk(file0, diskname0)
        
        # Save the file metadata to database
        file_meta = File.objects.create(filename=filename0, diskname=diskname0)
        file_meta.save()
        
        return JsonResponse({"message": "File uploaded successfully"})
    return JsonResponse({"message": "Only POST method is supported"})

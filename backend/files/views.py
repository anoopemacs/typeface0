from django.conf import settings
from django.http import FileResponse, Http404, JsonResponse
from django.shortcuts import render
from django.urls import reverse
from django.views.decorators.csrf import csrf_exempt
import os
import uuid

from .models import File
from .services import write_file_to_disk

# We are disabling CSRF protection to make our app easier to test using Postman/Insomnia during development
# In production, dont do this. Instead use CSRF_TRUSTED_ORIGINS in settings.py file
# Limit it to just https://frontendurl.com
@csrf_exempt
def file_list_api(request):
    file_list = list(File.objects.values())
    # Let us massage the above list to make it convenient for the frontend
    # In json returned, every file will have 4 fields:- a unique id, a filename, a url to download it, a url to view it
    file_list_massaged = []
    for file in file_list:
        file_download_url = settings.BASE_URL + "/files/download/" + file["diskname"]
        file_view_url = settings.BASE_URL + "/media/" + file["diskname"]
        file["file_download_url"] = file_download_url
        file["file_view_url"] = file_view_url
        del file["diskname"]
        file_list_massaged.append(file)
    return JsonResponse({"file_list": file_list_massaged})

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

@csrf_exempt
def file_download_api(request, diskname0):
    file_path = os.path.join(settings.MEDIA_ROOT, diskname0)

    # If we strip the first 36 uuid characters, and the '_' character from diskname0
    # We get the corresponding filename0
    filename0 = diskname0[37:]

    if os.path.exists(file_path):
        # Python's file API is synchronous.
        # This means that the file must be fully consumed in order to be served under ASGI.
        # Hence, do not use 'with open(...) as file:' context manager
        # Refer: https://docs.djangoproject.com/en/5.2/ref/request-response/#fileresponse-objects
        file = open(file_path, 'rb')
        response = FileResponse(file, as_attachment=True, filename=filename0)
        return response
    else:
        raise Http404("File does not exist")


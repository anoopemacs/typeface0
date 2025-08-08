from django.urls import path
from . import views

urlpatterns = [
    path('list/', views.file_list_api, name='list'),
    path('upload/', views.file_upload_api, name='upload'),
]

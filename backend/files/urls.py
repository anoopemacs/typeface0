from django.urls import path
from . import views

urlpatterns = [
    path('list/', views.file_list_api, name='list'),
    path('upload/', views.file_upload_api, name='upload'),
    path('download/<str:diskname0>/', views.file_download_api, name='download'),
]

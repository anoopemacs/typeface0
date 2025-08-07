from django.urls import path
from . import views

urlpatterns = [
    path('list', views.file_list_api, name='list'),
]

from django.urls import path
from logs import views

urlpatterns = [
    path('', views.log_details),
]
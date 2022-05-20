from django.urls import path
from logs import views

urlpatterns = [
    path('<int:pk>/', views.log_tasks)
]
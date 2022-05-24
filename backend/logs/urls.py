from django.urls import path
from logs import views

urlpatterns = [
    path('', views.log_details),
    path('<int:pk>/', views.team_logs)
]
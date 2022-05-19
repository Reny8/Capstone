from django.urls import path
from projects import views
urlpatterns = [
    path('', views.get_all_projects),
    path('<int:pk>/', views.project_details)
]
from django.urls import path
from tasks import views
urlpatterns = [
    path('', views.get_my_tasks),
    path('<int:pk>/', views.project_tasks)
]
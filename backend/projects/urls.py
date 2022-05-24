from django.urls import path
from projects import views
urlpatterns = [
    path('', views.get_all_projects),
    path('<int:pk>/<int:id>/', views.add_assigned_user),
    path('developers/', views.get_all_developers)
]
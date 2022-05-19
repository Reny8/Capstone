from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view,permission_classes
from rest_framework.response import Response
from rest_framework import status
from .models import Tasks,Projects
from projects.serializers import ProjectSerializer
from .serializers import TaskSerializer
from rest_framework.permissions import IsAuthenticated


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_my_projects(request):
    if request.method == "GET":
        projects = Projects.objects.filter(assigned_users__id = request.user.id)
        serializer = ProjectSerializer(projects, many=True)
        return Response(serializer.data)


@api_view(['GET','PUT'])
@permission_classes([IsAuthenticated])
def project_tasks(request,pk):
    # FOR THE PROJECT MANAGER TO SEE ALL THE TASKS RELATED TO THEIR PROJECTS
    if request.method == 'GET':
        project = get_object_or_404(Projects, pk = pk)
        tasks = Tasks.objects.filter(project_id = project.id)
        serializer = TaskSerializer(tasks, many=True)
        return Response(serializer.data, status = status.HTTP_200_OK)
    # WORK ON POSTMAN REQUEST
    elif request.method == 'PUT':
        task = get_object_or_404(Tasks, pk = pk)
        serializer = TaskSerializer(task, data = request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(user = request.user)
            return Response(serializer.data,status = status.HTTP_200_OK)
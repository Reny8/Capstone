from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view,permission_classes
from rest_framework.response import Response
from rest_framework import status
from .models import Tasks,Projects
from projects.serializers import ProjectSerializer
from .serializers import TaskSerializer
from rest_framework.permissions import IsAuthenticated


@api_view(['GET','POST'])
@permission_classes([IsAuthenticated])
def get_my_projects(request):
    # CREATE A NEW TASK
    if request.method == 'POST':
        serializer = TaskSerializer(data = request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(assigned = request.user)
            return Response(serializer.data, status = status.HTTP_201_CREATED)
        


@api_view(['GET','PUT'])
@permission_classes([IsAuthenticated])
def project_tasks(request,pk):
    # FOR THE PROJECT MANAGER TO SEE ALL THE TASKS RELATED TO THEIR PROJECTS
    if request.method == 'GET':
        tasks = Tasks.objects.filter(project_id = pk)
        serializer = TaskSerializer(tasks, many=True)
        return Response(serializer.data, status = status.HTTP_200_OK)
    # UPDATE A TASK CREATED
    elif request.method == 'PUT':
        task = get_object_or_404(Tasks, pk = pk)
        serializer = TaskSerializer(task, data = request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(user = request.user)
            return Response(serializer.data,status = status.HTTP_200_OK)
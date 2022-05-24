from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view,permission_classes
from rest_framework.response import Response
from rest_framework import status
from .models import Tasks
from .serializers import TaskSerializer
from rest_framework.permissions import IsAuthenticated


@api_view(['GET','POST'])
@permission_classes([IsAuthenticated])
def get_my_tasks(request):
    # VIEW YOUR TASKS CREATED
    if request.method == 'GET':
        owner_projects = Tasks.objects.filter(project__owner = request.user).order_by('-status').order_by('project_id')
        employee_assigned = Tasks.objects.filter(assigned_id = request.user.id).order_by('-status').order_by('project_id')
        if owner_projects :
            serializer = TaskSerializer(owner_projects, many=True)
            return Response(serializer.data, status = status.HTTP_200_OK)
        elif employee_assigned:
        # GETS TASKS ASSIGNED
            serializer = TaskSerializer(employee_assigned, many=True)
            return Response(serializer.data, status = status.HTTP_200_OK)
    # CREATE A NEW TASK
    elif request.method == 'POST':
        serializer = TaskSerializer(data = request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(assigned = request.user)
            return Response(serializer.data, status = status.HTTP_201_CREATED)
        


@api_view(['GET','PUT','DELETE'])
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
    # DELETES A TASK
    elif request.method == 'DELETE':
        task = get_object_or_404(Tasks, pk = pk)
        task.delete()
        return Response(status = status.HTTP_204_NO_CONTENT)



@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def status_details(request,id):
    if request.method == 'PUT': 
        task = get_object_or_404(Tasks,id=id)
        serializer = TaskSerializer(task,data = request.data, partial=True)
        if serializer.is_valid(raise_exception=True):
            serializer.save(user = request.user)
            return Response(serializer.data,status = status.HTTP_200_OK)

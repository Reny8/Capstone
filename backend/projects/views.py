from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view,permission_classes
from rest_framework.response import Response
from rest_framework import status
from .models import Projects
from .serializers import ProjectSerializer
from rest_framework.permissions import IsAuthenticated
from authentication.models import User
from authentication.serializers import UserSerializer

@api_view(['GET','POST'])
@permission_classes([IsAuthenticated])
def get_all_projects(request):
    # GETS ALL THE PROJECTS MADE BY THE LOG IN USER OR GETS PROJECTS ASSIGNED TO THE LOGGED IN USER
    if request.method == 'GET':
        owner_projects = Projects.objects.filter(owner = request.user).order_by('due_date')
        employee_assigned = Projects.objects.filter(assigned_users__id = request.user.id).order_by('due_date')
        if owner_projects :
            serializer = ProjectSerializer(owner_projects, many=True)
            return Response(serializer.data)
        elif employee_assigned:
        # GETS PROJECTS ASSIGNED TO THE USER
            serializer = ProjectSerializer(employee_assigned, many=True)
            return Response(serializer.data)

    # CREATES A NEW PROJECT
    elif request.method == 'POST':
        serializer = ProjectSerializer(data = request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(owner = request.user)
            return Response(serializer.data,status.HTTP_201_CREATED)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def add_assigned_user(request,pk, id):
    if request.method == 'PUT':
        project = get_object_or_404(Projects, pk = pk)
        user = get_object_or_404(User,id = id)
        update_project = project.assigned_users.add(user)
        serializer = ProjectSerializer(update_project)
        return Response(serializer.data, status.HTTP_202_ACCEPTED)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_all_developers(request):
    if request.method == 'GET':
        users = User.objects.filter(role = "Software Developer")
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['PUT','DELETE'])
@permission_classes([IsAuthenticated])
def modify_project(request,pk):
    project = get_object_or_404(Projects,pk = pk)
    if request.method == "PUT":
        serializer = ProjectSerializer(project, data = request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(user = request.user)
            return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
    elif request.method == "DELETE":
        project.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

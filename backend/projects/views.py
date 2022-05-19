from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view,permission_classes
from rest_framework.response import Response
from rest_framework import status
from .models import Projects
from .serializers import ProjectSerializer
from rest_framework.permissions import IsAuthenticated


@api_view(['GET','POST'])
@permission_classes([IsAuthenticated])
def get_all_projects(request):
    # GETS ALL THE PROJECTS MADE MY THE CURRENT PROJECT MANAGER LOGGED IN 
    if request.method == 'GET':
        projects = Projects.objects.filter(owner_id = request.user.id)
        serializer = ProjectSerializer(projects, many=True)
        return Response(serializer.data)
    # SUPPOSE TO CREATE A PROJECT BY THE PROJECT MANAGER
    elif request.method == 'POST':
        serializer = ProjectSerializer(data = request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(user = request.user)
            return Response(serializer.data,status = status.HTTP_201_CREATED)



        


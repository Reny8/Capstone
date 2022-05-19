from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view,permission_classes
from rest_framework.response import Response
from rest_framework import status
from .models import Projects
from .serializers import ProjectSerializer
from rest_framework.permissions import IsAuthenticated


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_all_projects(request):
    if request.method == 'GET':
        projects = Projects.objects.filter(owner_id = request.user.id)
        serializer = ProjectSerializer(projects, many=True)
        return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def project_details(request,pk):
    project = get_object_or_404(Projects, pk = pk)
    if request.method == 'GET':
        serializer = ProjectSerializer(project)
        return Response(serializer.data, status = status.HTTP_200_OK)
        


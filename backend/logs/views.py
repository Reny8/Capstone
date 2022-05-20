from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view,permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .models import Logs
from tasks.models import Tasks
from .serializers import LogSerializer
# Create your views here.


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def log_tasks(request,pk):
    if request.method == 'GET':
        task = get_object_or_404(Tasks, pk = pk)
        logs = Logs.objects.filter(task_id = task.id)
        serializer = LogSerializer(logs, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
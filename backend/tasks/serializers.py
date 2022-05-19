from rest_framework import serializers
from .models import Tasks

class TaskSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Tasks
        fields = ["id","due_date","assigned","description","status","project","project_id"]
        depth = 1
    project_id = serializers.IntegerField(write_only=True)
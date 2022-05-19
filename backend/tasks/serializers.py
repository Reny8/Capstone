from rest_framework import serializers
from .models import Tasks

class TaskSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Tasks
        fields = ["id","due_date","assigned","assigned_id","description","status","project","project_id"]
        depth = 1
    assigned_id = serializers.IntegerField(write_only=True)
    project_id = serializers.IntegerField(write_only=True)
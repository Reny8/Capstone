from rest_framework import serializers
from .models import Logs

class LogSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Logs
        fields = ["id","log_date","assigned","assigned_id","comment","project","task","project_id","task_id"]
        depth = 1
    assigned_id = serializers.IntegerField(write_only = True)
    project_id = serializers.IntegerField(write_only = True)
    task_id = serializers.IntegerField(write_only=True)
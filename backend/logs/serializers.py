from rest_framework import serializers
from .models import Logs

class LogSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Logs
        fields = ["id","log_date","assigned","comment","project","task","project_id","task_id"]
        depth = 1
    project_id = serializers.IntegerField(write_only = True)
    task_id = serializers.IntegerField(write_only=True)
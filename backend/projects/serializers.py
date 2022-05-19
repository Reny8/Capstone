from rest_framework import serializers 
from .models import Projects
class ProjectSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Projects
        fields = ["id","owner","title","due_date","assigned_users","assigned_users_id"]
        depth = 1
    assigned_users_id = serializers.IntegerField(write_only=True)

from rest_framework import serializers 
from .models import Projects
class ProjectSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Projects
        fields = ["id","owner","owner_id","title","due_date","assigned_users"]
        depth = 1
    owner_id = serializers.IntegerField(write_only=True)

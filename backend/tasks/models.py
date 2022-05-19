from django.db import models
from authentication.models import User
from projects.models import Projects
# Create your models here.
class Tasks(models.Model):
    due_date = models.DateField()
    assigned = models.ForeignKey(User, on_delete=models.CASCADE)
    description = models.CharField(max_length=300)
    status = models.CharField(max_length=10)
    project = models.ForeignKey(Projects, on_delete=models.CASCADE)
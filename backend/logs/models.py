from django.db import models
from authentication.models import User
from projects.models import Projects
from tasks.models import Tasks

class Logs(models.Model):
    log_date = models.CharField(max_length=50)
    assigned = models.ForeignKey(User, on_delete=models.CASCADE)
    comment = models.CharField(max_length=200)
    project= models.ForeignKey(Projects, on_delete=models.CASCADE)
    task = models.ForeignKey(Tasks, on_delete=models.CASCADE)
    status = models.CharField(max_length=10)


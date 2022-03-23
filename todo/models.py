from django.db import models
from django.contrib.auth.models import User

class Todo(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    completed = models.BooleanField(default=False)
    assign_user = models.ForeignKey(User, default=None, on_delete=models.CASCADE)

    def __str__(self):
        return self.title

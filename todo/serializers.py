# A serializer is a component that converts Django models to JSON objects and vice-versa.

from rest_framework import serializers
from .models import Todo

class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = ('id', 'title', 'description', 'assign_user', 'completed')
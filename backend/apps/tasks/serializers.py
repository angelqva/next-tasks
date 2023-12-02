from rest_framework import serializers
from .models import Task


class TaskSerializer(serializers.ModelSerializer):
    completed = serializers.BooleanField(default=False, required=False)
    class Meta:
        model = Task
        fields = ['id', 'title', 'completed']

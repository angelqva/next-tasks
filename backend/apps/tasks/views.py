from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .serializers import Task, TaskSerializer


class TaskViews(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = (IsAuthenticated,)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
    
    def list(self, request, *args, **kwargs):
        user_tasks = Task.objects.filter(user=request.user)
        serializer = TaskSerializer(user_tasks, many=True)        
        return Response(serializer.data, status=status.HTTP_200_OK)
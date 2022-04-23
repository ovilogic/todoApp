from django.shortcuts import render

from .serializers import TodoSerializer
from rest_framework import viewsets
from .models import Todo


class TodoView(viewsets.ModelViewSet):
    serializer_class = TodoSerializer


    def get_queryset(self):
        """
        Optionally restricts the returned purchases to a given user,
        by filtering against a `username` query parameter in the URL.
        """
        queryset = Todo.objects.all()
        completed = self.request.query_params.get('completed')
        if completed is not None:
            if completed == 'false':
                completed = False
            else:
                completed = True
            queryset = queryset.filter(completed=completed)
        return queryset


def something(request):
    return render(request, 'todo/home.html')




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

    def put(self, request):
        # So with the PUT method, the object id is included in the URL
        # This gets us the object we want to update:
        todo_object = Todo.objects.get()
        print(todo_object)

        data = request.data
        if data.completed is not None:
            if data.completed == 'false':
                data = False
            else:
                data.completed = True
        todo_object.completed = data.completed
        # Does the function need to return anything? Or just modify the
        # content in the background?
        # The answer is no, it does not need to return anything.





# This renders the basic, rudimentary home page:
def something(request):
    return render(request, 'todo/home.html')




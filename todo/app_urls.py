from django.urls import path

from rest_framework import routers
from django.urls import include
from . import views


router = routers.DefaultRouter()
router.register(r'todos', views.TodoView, 'todo')

app_name = 'todo'
urlpatterns = [
    path('', views.something, name='something'),
    path('api/', include(router.urls))
]
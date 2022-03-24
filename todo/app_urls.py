from django.urls import path

import views

app_name = 'todo'
urlpatterns = [
    path('', views.something, name='something')
]
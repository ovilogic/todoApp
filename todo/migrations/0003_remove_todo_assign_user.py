# Generated by Django 4.0.3 on 2022-03-26 19:01

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('todo', '0002_todo_assign_user'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='todo',
            name='assign_user',
        ),
    ]

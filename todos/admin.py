from django.contrib import admin
from . import models

# Register your models here.
@admin.register(models.Todo)
class TodoAdmin(admin.ModelAdmin):
    list_display = ['name', 'completed']
    list_filter = ['completed']
    list_per_page = 10
    search_fields = ['name']
    
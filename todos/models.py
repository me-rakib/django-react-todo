from django.db import models

# Create your models here.


class Todo(models.Model):
    name = models.CharField(max_length=255)
    completed = models.BooleanField(default=False)

    def __str__(self) -> str:
        return self.name

    class Meta:
        ordering = ['completed']

from rest_framework import routers

from todos.models import Todo
from .views import TodoViewSet

router = routers.DefaultRouter()
router.register(r'todos', TodoViewSet, 'todos')

urlpatterns = router.urls
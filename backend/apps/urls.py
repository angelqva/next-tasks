from django.urls import path, include
from rest_framework.routers import DefaultRouter
from apps.users.views import UserView
from apps.tasks.views import TaskViews
# from apps.property.views import PropertyViewSet
# from apps.schools.views import SchoolViewSet
# from apps.tasks.views import TasksViewSet
# from apps.scrapers.views import ScraperViewSet
# # from apps.tasks.views import browser_info
userRouter = DefaultRouter()
userRouter.register(prefix='manage', viewset=UserView,
                basename='manage')
taskRouter = DefaultRouter()
taskRouter.register(prefix='tasks', viewset=TaskViews,
                basename='tasks')


app_name = 'api'
urlpatterns = [
    path('api/', include('djoser.urls')),
    path('api/', include('apps.users.urls')),
    path('api/users/', include(userRouter.urls)),
    path('api/', include(taskRouter.urls))
]

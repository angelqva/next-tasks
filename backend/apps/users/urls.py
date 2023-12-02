"""Module providing a function printing python version."""
from django.urls import path, re_path
from .views import (
    CustomProviderAuthView,
    CustomTokenObtainPairView,
    CustomTokenRefreshView,
    CustomTokenVerifyView,
    LogoutView
)

urlpatterns = [
    re_path(
        r'^o/(?P<provider>\S+)/$',
        CustomProviderAuthView.as_view(),
        name='provider-auth'
    ),
    path('token/login/', CustomTokenObtainPairView.as_view()),
    path('token/refresh/', CustomTokenRefreshView.as_view()),
    path('token/verify/', CustomTokenVerifyView.as_view()),
    path('token/logout/', LogoutView.as_view()),
]

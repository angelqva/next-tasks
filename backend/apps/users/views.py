from django.conf import settings
from rest_framework import status, viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import PermissionDenied
from rest_framework.decorators import action
from djoser.social.views import ProviderAuthView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView
)
from .serializers import UserSerializer, UserAccount
import logging

logger = logging.getLogger(__name__)


class UserView(viewsets.ModelViewSet):    
    queryset = UserAccount.objects.all()
    serializer_class = UserSerializer
    permission_classes = (IsAuthenticated,)

    def create(self, request, *args, **kwargs):
        user: UserAccount = self.request.user
        if user.is_superuser:
            return super().create(request, *args, **kwargs)
        else:
            raise PermissionDenied('Super User required')

    def update(self, request, *args, **kwargs):
        user: UserAccount = self.request.user
        if user.is_superuser:
            return super().update(request, *args, **kwargs)
        else:
            raise PermissionDenied('Super User required')

    def partial_update(self, request, *args, **kwargs):
        user: UserAccount = self.request.user
        if user.is_superuser:
            return super().partial_update(request, *args, **kwargs)
        else:
            raise PermissionDenied('Super User required')

    def destroy(self, request, *args, **kwargs):
        user: UserAccount = self.request.user
        if user.is_superuser:
            return super().destroy(request, *args, **kwargs)
        else:
            raise PermissionDenied('Super User required')

    def list(self, request, *args, **kwargs):
        user: UserAccount = self.request.user
        if user.is_superuser:
            return super().list(request, *args, **kwargs)
        else:
            raise PermissionDenied('Super User required')

    @action(detail=False, methods=["get"])
    def me(self, request):
        user: UserAccount = self.request.user
        user_all = UserAccount.objects.get(pk=user.pk)
        serializer = UserSerializer(user_all)
        print("Server Print")
        return Response(serializer.data, status=status.HTTP_200_OK)
    


class CustomProviderAuthView(ProviderAuthView):
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        if response.status_code == 201:
            access_token = response.data.get('access')
            refresh_token = response.data.get('refresh')
            response.set_cookie(
                'access',
                access_token,
                max_age=settings.AUTH_COOKIE_MAX_AGE,
                path=settings.AUTH_COOKIE_PATH,
                secure=settings.AUTH_COOKIE_SECURE,
                httponly=settings.AUTH_COOKIE_HTTP_ONLY,
                samesite=settings.AUTH_COOKIE_SAMESITE
            )
            response.set_cookie(
                'refresh',
                refresh_token,
                max_age=settings.AUTH_COOKIE_MAX_AGE,
                path=settings.AUTH_COOKIE_PATH,
                secure=settings.AUTH_COOKIE_SECURE,
                httponly=settings.AUTH_COOKIE_HTTP_ONLY,
                samesite=settings.AUTH_COOKIE_SAMESITE
            )
        return response


class CustomTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        if response.status_code == 200:
            access_token = response.data.get('access')
            refresh_token = response.data.get('refresh')
            response.set_cookie(
                'access',
                access_token,
                max_age=settings.AUTH_COOKIE_MAX_AGE,
                path=settings.AUTH_COOKIE_PATH,
                secure=settings.AUTH_COOKIE_SECURE,
                httponly=settings.AUTH_COOKIE_HTTP_ONLY,
                samesite=settings.AUTH_COOKIE_SAMESITE
            )
            response.set_cookie(
                'refresh',
                refresh_token,
                max_age=settings.AUTH_COOKIE_MAX_AGE,
                path=settings.AUTH_COOKIE_PATH,
                secure=settings.AUTH_COOKIE_SECURE,
                httponly=settings.AUTH_COOKIE_HTTP_ONLY,
                samesite=settings.AUTH_COOKIE_SAMESITE
            )
        return response


class CustomTokenRefreshView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        refresh_token = request.COOKIES.get('refresh')
        if refresh_token:
            request.data['refresh'] = refresh_token
        response = super().post(request, *args, **kwargs)
        if response.status_code == 200:
            access_token = response.data.get('access')
            response.set_cookie(
                'access',
                access_token,
                max_age=settings.AUTH_COOKIE_MAX_AGE,
                path=settings.AUTH_COOKIE_PATH,
                secure=settings.AUTH_COOKIE_SECURE,
                httponly=settings.AUTH_COOKIE_HTTP_ONLY,
                samesite=settings.AUTH_COOKIE_SAMESITE
            )
        return response


class CustomTokenVerifyView(TokenVerifyView):
    def post(self, request, *args, **kwargs):
        access_token = request.COOKIES.get('access')
        if access_token:
            request.data['token'] = access_token
        return super().post(request, *args, **kwargs)


class LogoutView(APIView):
    def post(self, request, *args, **kwargs):
        response = Response(status=status.HTTP_204_NO_CONTENT)        
        response.delete_cookie('access')
        response.delete_cookie('refresh')
        return response

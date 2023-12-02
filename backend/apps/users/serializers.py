from rest_framework import serializers
from .models import UserAccount
from django.contrib.auth.password_validation import validate_password

class UserSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = UserAccount
        fields = ("id", "first_name", "last_name", "email", "is_staff", "is_superuser", "is_active", "password")
        extra_kwargs = {
            'id': {'read_only': True},
            'password': {'write_only': True}
        }

    def validate(self, data):
        if data.get('password'):
            validate_password(data['password'], self)
        return super().validate(data)

    def create(self, validated_data):
        user = UserAccount.objects.create(**validated_data)
        user.set_password(validated_data['password'])
        user.save()
        return user

    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
            if attr == 'password':
                instance.set_password(value)
            else:
                setattr(instance, attr, value)
        instance.save()
        return instance

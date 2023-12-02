FROM python:3.11.5

ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1
RUN pip install --upgrade pip
RUN pip install django djangorestframework djoser django-cors-headers social-auth-app-django django-rq psycopg2 python-dotenv
WORKDIR /app


#!/bin/sh

echo "Waiting for database to be ready..."

while ! nc -z db 3306; do
  sleep 1
done

echo "Database is ready. Starting migrations."

/usr/local/bin/python manage.py makemigrations

/usr/local/bin/python manage.py migrate --no-input

echo "Starting Django server..."
exec /usr/local/bin/python manage.py runserver 0.0.0.0:8000

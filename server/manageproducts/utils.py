from rest_framework.views import exception_handler
from rest_framework.exceptions import ValidationError

def custom_exception_handler(exc, context):
    response = exception_handler(exc, context)

    if isinstance(exc, ValidationError):
        if 'name' in exc.detail and any('already exists' in str(msg) for msg in exc.detail['name']):
            response.status_code = 409

    return response
from rest_framework.routers import DefaultRouter
from django.urls import path
from .views import CategoryViewSet, ProductViewSet, RegisterView

router = DefaultRouter()
router.register(r'categories', CategoryViewSet, basename='category')
router.register(r'products', ProductViewSet, basename='product')

urlpatterns = router.urls

urlpatterns = [
    path('register/', RegisterView.as_view(), name='auth_register'),
] + router.urls
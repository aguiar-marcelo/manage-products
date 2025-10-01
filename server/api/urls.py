from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import CategoryViewSet, ProductViewSet, RegisterView, DashboardStatsView

router = DefaultRouter()
router.register(r'categories', CategoryViewSet, basename='category')
router.register(r'products', ProductViewSet, basename='product')

urlpatterns = [
    path('register/', RegisterView.as_view(), name='auth_register'),
    path('dashboard/', DashboardStatsView.as_view(), name='dashboard_stats'),
]

urlpatterns += router.urls
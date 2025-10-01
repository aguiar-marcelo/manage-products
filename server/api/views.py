from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import viewsets, generics
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Category, Product
from .serializers import CategorySerializer, ProductSerializer, UserSerializer, MyTokenObtainPairSerializer
from django.contrib.auth.models import User
from .pagination import CustomPageNumberPagination
from rest_framework.filters import SearchFilter
from .permissions import IsOwnerOrReadOnly
from rest_framework.views import APIView 
from rest_framework.response import Response
from django.db.models import Sum, Count, Case, When
from django.utils import timezone

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticated]

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all().order_by('-id')
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated, IsOwnerOrReadOnly]
    pagination_class = CustomPageNumberPagination
    filter_backends = [SearchFilter]
    search_fields = ['name', 'description', 'category__name']
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]
    authentication_classes = []

class MyTokenObtainPairView(TokenObtainPairView):
    permission_classes = [AllowAny]
    authentication_classes = []
    serializer_class = MyTokenObtainPairSerializer
    
class DashboardStatsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        total_products = Product.objects.count()
        total_categories = Category.objects.count()

        products_price_sum = Product.objects.aggregate(total_price=Sum('price'))
        total_price = products_price_sum['total_price'] if products_price_sum['total_price'] is not None else 0

        expired_products_price_sum = Product.objects.filter(
            expiration_date__lt=timezone.now().date()
        ).aggregate(total_expired_price=Sum('price'))
        total_expired_price = expired_products_price_sum['total_expired_price'] if expired_products_price_sum['total_expired_price'] is not None else 0

        products_per_category = Category.objects.annotate(
            product_count=Count('product')
        ).values('name', 'product_count')

        products_without_category_count = Product.objects.filter(
            category__isnull=True
        ).count()
        
        products_per_category_list = list(products_per_category)

        products_per_category_list.append({
            'name': 'Sem Categoria',
            'product_count': products_without_category_count
        })

        data = {
            'total_products': total_products,
            'total_categories': total_categories,
            'total_products_price': total_price,
            'total_expired_products_price': total_expired_price,
            'products_per_category': products_per_category_list
        }

        return Response(data)
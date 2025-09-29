from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
import math

class CustomPageNumberPagination(PageNumberPagination):
    page_size = 12
    page_size_query_param = 'page_size'
    max_page_size = 100

    def get_paginated_response(self, data):
        return Response({
            'currentPage': self.page.number,
            'totalItems': self.page.paginator.count,
            'totalPages': math.ceil(self.page.paginator.count / self.page_size),
            'data': data
        })
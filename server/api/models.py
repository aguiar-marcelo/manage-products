from django.db import models
from django.core.validators import MinValueValidator
from django.utils import timezone
import os
import uuid

def product_image_path(instance, filename):
    ext = filename.split('.')[-1]
    filename = f'{uuid.uuid4()}.{ext}'
    return os.path.join('product_images/', filename)

class Category(models.Model):
    name = models.CharField(max_length=100, unique=True, null=False)

    class Meta:
        verbose_name = "Categoria"
        verbose_name_plural = "Categorias"

    def __str__(self):
        return self.name

class Product(models.Model):
    name = models.CharField(max_length=50, null=False)
    description = models.CharField(max_length=200, blank=True, null=True)
    price = models.FloatField(null=False, validators=[MinValueValidator(0.01)])
    expiration_date = models.DateField(null=True, blank=True)
    
    image = models.ImageField(upload_to=product_image_path, unique=True, null=True, blank=True, )
    
    category = models.ForeignKey(
        'Category', 
        on_delete=models.SET_NULL, # ao excluir category, não exclui o produto
        null=True, 
        blank=True
    )

    class Meta:
        verbose_name = "Produto"
        verbose_name_plural = "Produtos"

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if self.expiration_date and self.expiration_date < timezone.now().date():
            raise ValueError("A data de validade não pode ser no passado.")
        
        super().save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        if self.image:
            if os.path.isfile(self.image.path):
                os.remove(self.image.path)
        super().delete(*args, **kwargs)
import type { Product } from '@/types/product';
import api from './api';

export async function postProduct(productData: any) {
  try {
    const formData = new FormData();
    formData.append('name', productData.name);
    formData.append('description', productData.desc);
    formData.append('price', productData.price.toString());
    formData.append('expiration_date', productData.validate);
    formData.append('category_id', productData.category.id);
    if (productData.img) {
      formData.append('image', productData.img);
    }

    const response = await api.post('/products/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function putProduct(id: number, productData: any) {
  try {
    const formData = new FormData();
    formData.append('name', productData.name);
    formData.append('description', productData.description);
    formData.append('price', productData.price.toString());
    formData.append('expiration_date', productData.expiration_date);
    formData.append('category_id', productData.category_id);
    if (productData.img) {
      formData.append('image', productData.img);
    }

    const response = await api.put(`/products/${id}/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getProducts(
  page = 1,
  limit = 12,
  search = ''
): Promise<{
  currentPage: number;
  totalPages: number;
  totalItems: number;
  data: Product[];
}> {
  const { data } = await api.get('/products/', {
    params: { page, limit, search }
  });

  return data;
}

export async function getProductById(id: number): Promise<Product> {
  const { data } = await api.get(`/products/${id}`);

  return data;
}

export async function deleteProduct(id: number) {
  try {
    const { data } = await api.delete(`/products/${id}/`);
    return data;
  } catch (error) {
    throw error;
  }
}

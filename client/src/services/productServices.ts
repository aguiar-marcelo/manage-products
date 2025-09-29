import type { Product } from '@/types/product';
import api from './api';

export async function postProduct(productData: any) {
  try {
    const formData = new FormData();
    formData.append('name', productData.name);
    formData.append('description', productData.desc);
    formData.append('price', productData.price.toString());
    formData.append('expiration_date', productData.validate);
    if (productData.img) {
      formData.append('image', productData.img);
    }
    
    const response = await api.post('/products/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

// export async function getProducts(page: number = 1, limit: number = 10) {
//   try {
//     const response = await api.get('/products/', {
//       params: {
//         page,
//         limit,
//       },
//     });
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// }

export async function getProducts(
  page = 1,
  limit = 12,
): Promise<{
  currentPage: number;
  totalPages: number;
  totalItems: number;
  data: Product[];
}> {
  const { data } = await api.get("/products/", {
    params: { page, limit },
  });

  return data;
}
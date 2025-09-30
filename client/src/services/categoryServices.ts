import type { Category } from '@/types/product';
import api from './api';

export async function getCategories(): Promise<Category[]> {
  const { data } = await api.get('/categories/');

  return data;
}

export async function postCategory(name: string) {
  const { data } = await api.post('/categories/', { name });
  return data;
}

export async function deleteCategory(id: number) {
  const { data } = await api.delete(`/categories/${id}/`);
  return data;
}

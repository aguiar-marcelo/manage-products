import type { Dashboard } from '@/types/product';
import api from './api';

export async function getDashboardData(): Promise<Dashboard> {
  const { data } = await api.get('/dashboard/');

  return data;
}

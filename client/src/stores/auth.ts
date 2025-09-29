// src/stores/auth.ts

import { defineStore } from 'pinia';
import { router } from '@/router';
import api from '@/services/api';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    access_token: localStorage.getItem('access_token') || null,
    refresh_token: localStorage.getItem('refresh_token') || null,
    returnUrl: null
  }),

  actions: {
    // Este método agora é chamado manualmente
    // e executa a lógica de inicialização de forma segura.
    initializeUser() {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        this.user = JSON.parse(storedUser);
      }
    },

    async login(username: string, password: string) {
      try {
        const response = await api.post('/token/', { username, password });
        const { access, refresh, user } = response.data;

        this.user = user;
        this.access_token = access;
        this.refresh_token = refresh;

        localStorage.setItem('access_token', access);
        localStorage.setItem('refresh_token', refresh);
        localStorage.setItem('user', JSON.stringify(user));

        router.push(this.returnUrl || '/dashboard/default');
      } catch (error: any) {
        if (error.response && error.response.status === 401) {
          throw new Error('Usuário ou senha incorretos.');
        } else {
          throw new Error('Ocorreu um erro. Por favor, tente novamente mais tarde.');
        }
      }
    },

    logout() {
      this.user = null;
      this.access_token = null;
      this.refresh_token = null;
      localStorage.clear();
      router.push('/login');
    }
  }
});

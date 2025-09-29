import { createRouter, createWebHistory } from 'vue-router';
import MainRoutes from './MainRoutes';
import PublicRoutes from './PublicRoutes';
import { useAuthStore } from '@/stores/auth';

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:pathMatch(.*)*',
      component: () => import('@/views/pages/maintenance/error/Error404Page.vue')
    },
    MainRoutes,
    PublicRoutes
  ]
});

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();

  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  const isAuthenticated = !!authStore.access_token;

  if (requiresAuth && !isAuthenticated) {
    authStore.returnUrl = to.fullPath;
    next('/login');
  } else if (to.path === '/login' && isAuthenticated) {
    next(authStore.returnUrl || '/dashboard/default');
    authStore.returnUrl = null;
  } else {
    next();
  }
});

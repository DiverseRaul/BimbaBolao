import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import supabase from '@/services/supabase';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginView.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/RegisterView.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/matches',
    name: 'matches',
    component: () => import('@/views/MatchesView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/predictions',
    name: 'predictions',
    component: () => import('@/views/PredictionsView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/leaderboard',
    name: 'leaderboard',
    component: () => import('@/views/LeaderboardView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('@/views/ProfileView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/NotFoundView.vue'),
    meta: { requiresAuth: false }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Navigation guard for auth protected routes
router.beforeEach(async (to, from, next) => {
  const { data: { session } } = await supabase.auth.getSession();
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !session) {
    next({ name: 'login', query: { redirect: to.fullPath } });
  } else if (session && (to.name === 'login' || to.name === 'register')) {
    next({ name: 'home' });
  } else {
    next();
  }
});

export default router;

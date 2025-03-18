import { createRouter, createWebHistory } from 'vue-router'
import { supabase } from '../services/supabase/client'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/predictions',
    name: 'Predictions',
    component: () => import('../views/Predictions.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/leaderboard',
    name: 'Leaderboard',
    component: () => import('../views/Leaderboard.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Navigation guard for authenticated routes
router.beforeEach(async (to, from, next) => {
  const REQUIRES_AUTH = to.matched.some(record => record.meta.requiresAuth)
  const CURRENT_USER = await supabase.auth.getUser()

  if (REQUIRES_AUTH && !CURRENT_USER.data.user) {
    next('/login')
  } else {
    next()
  }
})

export default router

import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'

import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import TicketPreviewView from '../views/TicketPreviewView.vue'
import PassengerView from '../views/PassengerView.vue'
import SuccessView from '../views/SuccessView.vue'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/login', name: 'login', component: LoginView },
  { path: '/register', name: 'register', component: RegisterView },
  { path: '/booking/preview', name: 'preview', component: TicketPreviewView, meta: { requiresAuth: true } },
  { path: '/booking/passenger', name: 'passenger', component: PassengerView, meta: { requiresAuth: true } },
  { path: '/booking/success', name: 'success', component: SuccessView, meta: { requiresAuth: true } },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Navigation Guard
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  if (to.meta.requiresAuth && !authStore.currentUser) {
    next('/login')
  } else {
    next()
  }
})

export default router

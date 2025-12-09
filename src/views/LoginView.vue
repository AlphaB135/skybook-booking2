<template>
  <div class="w-full min-h-screen bg-white flex justify-center items-center">
    <LoginPage 
      @login="handleLoginSuccess" 
      @switch-to-register="$router.push('/register')" 
    />
  </div>
</template>

<script setup>
import LoginPage from '../components/LoginPage.vue'
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

function handleLoginSuccess(user) {
  authStore.currentUser = user // Update store (though login action usually does this, LoginPage emits it too)
  router.push('/')
}
</script>

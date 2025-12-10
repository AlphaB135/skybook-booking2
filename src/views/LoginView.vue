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

async function handleLoginSuccess(credentials) {
  const result = await authStore.login(credentials)
  if (result.success) {
    router.push('/')
  } else {
    alert('เข้าสู่ระบบไม่สำเร็จ: ' + result.error)
  }
}
</script>

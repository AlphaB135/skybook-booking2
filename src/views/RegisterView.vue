<template>
  <div class="w-full min-h-screen bg-white flex items-center justify-center">
    <RegisterForm 
      @register="handleRegister" 
      @switch-to-login="$router.push('/login')"
    />
  </div>
</template>

<script setup>
import RegisterForm from '../components/RegisterForm.vue'
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

async function handleRegister(userData) {
  const result = await authStore.register(userData)
  if (result.success) {
    alert('สมัครสมาชิกสำเร็จ!')
    router.push('/login')
  } else {
    alert('สมัครสมาชิกไม่สำเร็จ: ' + result.error)
  }
}
</script>

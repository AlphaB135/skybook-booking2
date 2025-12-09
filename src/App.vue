<template>
  <div class="min-h-screen bg-white font-sans text-slate-900">
    <!-- Navbar (แสดงตลอด ยกเว้นหน้า Login/Register) -->
    <Navbar 
      v-if="!['login', 'register'].includes($route.name)" 
      :currentUser="authStore.currentUser" 
      :activeTab="activeTab"
    />

    <!-- Router View matches component for current URL -->
    <router-view />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from './stores/auth'
import Navbar from './components/Navbar.vue'

const route = useRoute()
const authStore = useAuthStore()

const activeTab = computed(() => {
  if (route.name === 'passenger') return 'profile'
  return 'flights'
})
</script>
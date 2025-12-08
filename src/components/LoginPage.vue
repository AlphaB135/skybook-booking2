<template>
  <div class="min-h-[calc(100vh-80px)] flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-slate-50">
    <div class="bg-white rounded-[2rem] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] w-full max-w-6xl min-h-[650px] flex overflow-hidden border border-slate-100">
      <!-- Left Side - Hero Image -->
      <div class="w-1/2 hidden lg:block relative">
        <LoginHero />
      </div>

      <!-- Right Side - Login Form -->
      <div class="w-full lg:w-1/2 flex items-center justify-center bg-white p-8 lg:p-12">
        <LoginForm 
          @login="$emit('login', $event)"
          @switch-to-register="$emit('switch-to-register')"
        />
      </div>
    </div>
  </div>
</template>

<script>
import LoginHero from './LoginHero.vue'
import LoginForm from './LoginForm.vue'

export default {
  name: 'LoginPage',
  components: {
    LoginHero,
    LoginForm
  },
  emits: ['login', 'switch-to-register']
}
</script>

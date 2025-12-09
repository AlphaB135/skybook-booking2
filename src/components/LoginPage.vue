<template>
  <div class="w-full min-h-[calc(100vh-80px)] flex items-center justify-center p-4 sm:p-6 lg:p-8">
    <div class="bg-white rounded-3xl w-full max-w-[1600px] flex overflow-hidden">
      <!-- Left Side - Hero Image -->
      <div class="w-1/2 hidden lg:block">
        <LoginHero />
      </div>

      <!-- Right Side - Login Form -->
      <div class="w-full lg:w-1/2 flex items-center justify-center bg-white">
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

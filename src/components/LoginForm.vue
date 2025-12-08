<template>
  <div class="w-full max-w-md mx-auto p-8">
    <!-- Header -->
    <div class="text-right mb-8">
      <div class="flex items-center justify-end gap-2">
        <h1 class="text-xl font-bold text-slate-700 tracking-tight">Skybook Airlines</h1>
        <Plane class="w-6 h-6 text-orange-500" />
      </div>
    </div>

    <!-- Welcome Text -->
    <div class="mb-8">
      <h2 class="text-3xl font-bold text-slate-900 mb-2">Welcome Back</h2>
      <p class="text-slate-500">Please enter your details to sign in.</p>
    </div>

    <!-- Social Login (Mock) -->
    <div class="grid grid-cols-2 gap-4 mb-8">
      <button class="flex items-center justify-center gap-2 py-2.5 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">
        <img src="https://www.svgrepo.com/show/475656/google-color.svg" class="w-5 h-5" alt="Google" />
        <span class="text-sm font-medium text-slate-600">Google</span>
      </button>
      <button class="flex items-center justify-center gap-2 py-2.5 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">
        <img src="https://www.svgrepo.com/show/475647/facebook-color.svg" class="w-5 h-5" alt="Facebook" />
        <span class="text-sm font-medium text-slate-600">Facebook</span>
      </button>
    </div>

    <div class="relative mb-8">
      <div class="absolute inset-0 flex items-center">
        <div class="w-full border-t border-slate-200"></div>
      </div>
      <div class="relative flex justify-center text-sm">
        <span class="px-2 bg-white text-slate-400">Or continue with</span>
      </div>
    </div>

    <!-- Form -->
    <form @submit.prevent="handleSubmit" class="space-y-5">
      <!-- Phone/Email Input -->
      <div class="space-y-1">
        <label class="text-sm font-medium text-slate-700">Email or Phone</label>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <User class="h-5 w-5 text-slate-400" />
          </div>
          <input
            v-model="phone"
            type="text"
            required
            placeholder="Enter your email or phone"
            class="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder:text-slate-400"
          />
        </div>
      </div>

      <!-- Password Input -->
      <div class="space-y-1">
        <label class="text-sm font-medium text-slate-700">Password</label>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock class="h-5 w-5 text-slate-400" />
          </div>
          <input
            v-model="password"
            type="password"
            required
            placeholder="••••••••"
            class="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder:text-slate-400"
          />
        </div>
      </div>

      <!-- Remember & Forgot -->
      <div class="flex items-center justify-between">
        <label class="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" class="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
          <span class="text-sm text-slate-600">Remember me</span>
        </label>
        <button type="button" class="text-sm font-medium text-blue-600 hover:text-blue-700">
          Forgot password?
        </button>
      </div>

      <!-- Error Message -->
      <div v-if="error" class="p-3 bg-red-50 text-red-600 text-sm rounded-lg flex items-center gap-2">
        <AlertCircle class="w-4 h-4" />
        {{ error }}
      </div>

      <!-- Submit Button -->
      <button
        type="submit"
        class="w-full py-3.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg shadow-blue-200 transform active:scale-[0.98]"
      >
        Sign In
      </button>

      <!-- Register Link -->
      <div class="text-center text-sm text-slate-500 mt-6">
        Don't have an account? 
        <button 
          type="button" 
          @click="$emit('switch-to-register')"
          class="text-blue-600 hover:text-blue-700 font-semibold hover:underline"
        >
          Create account
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue'
import { Plane, User, Lock, AlertCircle } from 'lucide-vue-next'

export default {
  name: 'LoginForm',
  components: {
    Plane,
    User,
    Lock,
    AlertCircle
  },
  emits: ['login', 'switch-to-register'],
  setup(props, { emit }) {
    const phone = ref('')
    const password = ref('')
    const error = ref('')

    async function handleSubmit() {
      error.value = ''
      try {
        const response = await fetch('http://localhost:3001/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            phone: phone.value,
            password: password.value
          })
        })

        const data = await response.json()

        if (response.ok) {
          emit('login', data.user)
        } else {
          error.value = data.error || 'Login failed'
        }
      } catch (err) {
        console.error('Login error:', err)
        error.value = 'Connection error. Please try again.'
      }
    }

    return {
      phone,
      password,
      error,
      handleSubmit
    }
  }
}
</script>

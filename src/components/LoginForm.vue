<template>
  <div class="w-full max-w-xl mx-auto p-8">
    <div class="text-right mb-12">
      <div class="flex items-center justify-end gap-2">
        <h1 class="text-xl font-bold text-slate-700">Skybook Airlines</h1>
        <img :src="logo" alt="Logo" class="w-12 h-12 object-contain" />
      </div>
    </div>

    <div class="mb-8">
      <h2 class="text-4xl font-bold text-slate-900 mb-2">เข้าสู่ระบบ</h2>
      <p class="text-slate-600">ยินดีต้อนรับสู่ Skybook Airlines</p>
    </div>

    <form @submit.prevent="handleSubmit" class="space-y-6">
      <div>
        <input
          v-model="phone"
          type="tel"
          required
          placeholder="อีเมล/เบอร์โทรศัพท์"
          class="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
        />
      </div>

      <div>
        <input
          v-model="password"
          type="password"
          required
          placeholder="รหัสผ่าน"
          class="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
        />
      </div>

      <div v-if="error" class="p-3 bg-red-50 text-red-600 text-sm rounded-lg">
        {{ error }}
      </div>

      <button
        type="submit"
        class="w-full py-3 bg-blue-600 text-white font-medium rounded-full hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
      >
        เข้าสู่ระบบ
      </button>

      <div class="text-center text-sm text-slate-500">
        ยังไม่มีบัญชี? 
        <button 
          type="button" 
          @click="$emit('switch-to-register')"
          class="text-blue-600 hover:underline font-medium"
        >
          ลงทะเบียนที่นี่
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue'
import logo from '../assets/logoapp.png'

export default {
  name: 'LoginForm',
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
          error.value = data.error || 'เข้าสู่ระบบไม่สำเร็จ'
        }
      } catch (err) {
        console.error('Login error:', err)
        error.value = 'เกิดข้อผิดพลาดในการเชื่อมต่อ'
      }
    }

    return {
      phone,
      password,
      error,
      handleSubmit,
      logo
    }
  }
}
</script>

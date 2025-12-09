<template>
  <div class="w-full min-h-[calc(100vh-80px)] flex items-center justify-center p-4 sm:p-6 lg:p-8">
    <div class="bg-white rounded-3xl w-full max-w-[1600px] flex overflow-hidden">
      <!-- Left Side - Form -->
      <div class="w-full lg:w-1/2 p-8 lg:p-12">
        <div class="max-w-xl mx-auto">
          <!-- Header -->
          <div class="flex items-center justify-between mb-8">
            <h1 class="text-xl font-bold text-slate-700">Skybook Airlines</h1>
            <img :src="logo" alt="Logo" class="w-12 h-12 object-contain" />
          </div>

          <div class="mb-8 text-center">
            <h2 class="text-4xl font-bold text-slate-900 mb-2">ลงทะเบียน</h2>
            <p class="text-slate-600">สมัครบัญชีเพื่อใช้ Skybook Airlines</p>
          </div>

          <form @submit.prevent="handleSubmit" class="space-y-4">
            <!-- Row 1: Names -->
            <div class="grid grid-cols-2 gap-4">
              <div>
                <input
                  v-model="firstName"
                  type="text"
                  required
                  class="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder:text-slate-400"
                  placeholder="ชื่อ"
                />
              </div>
              <div>
                <input
                  v-model="lastName"
                  type="text"
                  required
                  class="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder:text-slate-400"
                  placeholder="สกุล"
                />
              </div>
            </div>

            <!-- Row 2: Email & Phone -->
            <div class="grid grid-cols-2 gap-4">
              <div>
                <input
                  v-model="email"
                  type="email"
                  required
                  class="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder:text-slate-400"
                  placeholder="อีเมล"
                />
              </div>
              <div>
                <input
                  v-model="phone"
                  type="text"
                  required
                  class="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder:text-slate-400"
                  placeholder="เบอร์โทรศัพท์"
                />
              </div>
            </div>

            <!-- Row 3: ID Card -->
            <div>
              <input
                v-model="idCard"
                type="text"
                required
                class="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder:text-slate-400"
                placeholder="เลขประจำตัวประชาชน"
              />
            </div>

            <!-- Row 4: Passwords -->
            <div>
              <input
                v-model="password"
                type="password"
                required
                class="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder:text-slate-400"
                placeholder="รหัสผ่าน"
              />
            </div>
            <div>
              <input
                v-model="confirmPassword"
                type="password"
                required
                class="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder:text-slate-400"
                placeholder="ยืนยันรหัสผ่าน"
              />
            </div>

            <div v-if="error" class="p-3 bg-red-50 text-red-600 text-sm rounded-lg">
              {{ error }}
            </div>

            <!-- Button -->
            <button
              type="submit"
              class="w-full py-3 bg-blue-600 text-white font-medium rounded-full hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200 mt-6"
            >
              ลงทะเบียน
            </button>

            <!-- Login Link -->
            <div class="text-center text-sm text-slate-500 mt-4">
              มีบัญชีอยู่แล้ว? 
              <button 
                type="button" 
                @click="$emit('switch-to-login')"
                class="text-blue-600 hover:underline font-medium"
              >
                เข้าสู่ระบบ
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- Right Side - Hero Image -->
      <div class="w-1/2 hidden lg:block">
        <RegisterHero />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import RegisterHero from './RegisterHero.vue'
import logo from '../assets/logoapp.png'

const emit = defineEmits(['register', 'switch-to-login'])

const firstName = ref('')
const lastName = ref('')
const email = ref('')
const phone = ref('')
const idCard = ref('')
const password = ref('')
const confirmPassword = ref('')
const error = ref('')

function handleSubmit() {
  error.value = ''

  // Demo mode: all validation removed
  
  // Construct payload for backend
  const userData = {
    name: firstName.value, // Send as native 'name' column (First Name)
    lastname: lastName.value,
    email: email.value,
    phone: phone.value,
    idCard: idCard.value,
    password: password.value
  }

  emit('register', userData)
}
</script>

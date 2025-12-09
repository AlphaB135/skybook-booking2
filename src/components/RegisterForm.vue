<template>
  <div class="w-3/5 mx-auto">
    <div class="bg-white rounded-xl shadow-lg border-2 border-blue-200 p-8">
      <div class="mb-6">
        <h2 class="text-3xl font-bold text-blue-700 mb-2">ลงทะเบียนสมาชิก</h2>
        <p class="text-slate-600">กรุณากรอกข้อมูลเพื่อเริ่มต้นการจองเที่ยวบิน</p>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div>
          <label class="block text-sm font-medium text-blue-700 mb-2">
            ชื่อ-นามสกุล
          </label>
          <input
            v-model="form.name"
            type="text"
            required
            class="w-full px-4 py-3 border-2 border-blue-200 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-all"
            placeholder="กรอกชื่อ-นามสกุล"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-blue-700 mb-2">
            เบอร์โทรศัพท์
          </label>
          <input
            v-model="form.phone"
            type="tel"
            required
            pattern="[0-9]{10}"
            class="w-full px-4 py-3 border-2 border-blue-200 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-all"
            placeholder="0812345678"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-blue-700 mb-2">
            เลขบัตรประชาชน
          </label>
          <input
            v-model="form.idCard"
            type="text"
            required
            pattern="[0-9]{13}"
            maxlength="13"
            class="w-full px-4 py-3 border-2 border-blue-200 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-all"
            placeholder="1234567890123"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-blue-700 mb-2">
            รหัสผ่าน
          </label>
          <input
            v-model="form.password"
            type="password"
            required
            minlength="6"
            class="w-full px-4 py-3 border-2 border-blue-200 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-all"
            placeholder="อย่างน้อย 6 ตัวอักษร"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-blue-700 mb-2">
            ยืนยันรหัสผ่าน
          </label>
          <input
            v-model="form.confirmPassword"
            type="password"
            required
            class="w-full px-4 py-3 border-2 border-blue-200 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-all"
            placeholder="กรอกรหัสผ่านอีกครั้ง"
          />
        </div>

        <div v-if="error" class="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p class="text-sm text-red-600">{{ error }}</p>
        </div>

        <button
          type="submit"
          class="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-orange-500 text-white font-medium rounded-lg hover:from-blue-700 hover:to-orange-600 transition-all shadow-md hover:shadow-lg"
        >
          บันทึกข้อมูล
        </button>

        <div class="text-center text-sm text-slate-500">
          มีบัญชีอยู่แล้ว? 
          <button 
            type="button" 
            @click="$emit('switch-to-login')"
            class="text-blue-600 hover:underline font-medium"
          >
            เข้าสู่ระบบที่นี่
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'RegisterForm',
  emits: ['register', 'switch-to-login'],
  setup(props, { emit }) {
    const form = ref({
      name: '',
      phone: '',
      idCard: '',
      password: '',
      confirmPassword: ''
    })
    const error = ref('')

    function handleSubmit() {
      error.value = ''

      if (form.value.password !== form.value.confirmPassword) {
        error.value = 'รหัสผ่านไม่ตรงกัน กรุณาตรวจสอบอีกครั้ง'
        return
      }

      if (form.value.phone.length !== 10) {
        error.value = 'เบอร์โทรศัพท์ต้องเป็น 10 หลัก'
        return
      }

      if (form.value.idCard.length !== 13) {
        error.value = 'เลขบัตรประชาชนต้องเป็น 13 หลัก'
        return
      }

      emit('register', { ...form.value })
    }

    return {
      form,
      error,
      handleSubmit
    }
  }
}
</script>

<style scoped>
input:focus {
  outline: none;
}
</style>

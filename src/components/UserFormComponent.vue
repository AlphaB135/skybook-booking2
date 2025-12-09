<template>
  <div class="bg-white rounded-2xl shadow-sm border border-blue-100 p-6 mb-6">
    <div class="flex flex-col md:flex-row gap-8">
      <!-- Left Decorative Image -->
      <div class="md:w-1/3">
        <div class="h-full min-h-[300px] rounded-xl overflow-hidden relative">
          <img
            src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074&auto=format&fit=crop"
            alt="Sunset view from airplane window"
            class="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </div>

      <!-- Right Form Content -->
      <div class="md:w-2/3">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-bold text-slate-900">ประวัติผู้ใช้</h2>
          <button 
            v-if="!isEditing"
            @click="startEdit"
            class="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 font-medium transition-colors"
          >
            แก้ไขข้อมูล
          </button>
        </div>
        
        <div class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1">ชื่อ :</label>
              <div v-if="!isEditing" class="bg-slate-100 px-4 py-2 rounded-lg text-slate-800">
                {{ user?.name || '-' }}
              </div>
              <input 
                v-else
                v-model="form.firstName"
                class="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1">นามสกุล :</label>
              <div v-if="!isEditing" class="bg-slate-100 px-4 py-2 rounded-lg text-slate-800">
                {{ user?.lastname || '-' }}
              </div>
              <input 
                v-else
                v-model="form.lastName"
                class="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-slate-700 mb-1">อีเมล :</label>
            <div v-if="!isEditing" class="bg-slate-100 px-4 py-2 rounded-lg text-slate-800">
              {{ user?.email || '-' }}
            </div>
            <input 
              v-else
              v-model="form.email"
              class="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-slate-700 mb-1">เบอร์ติดต่อ :</label>
            <div v-if="!isEditing" class="bg-slate-100 px-4 py-2 rounded-lg text-slate-800">
              {{ user?.phone || '-' }}
            </div>
            <input 
              v-else
              v-model="form.phone"
              class="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-slate-700 mb-1">เลขประจำตัวประชาชน :</label>
            <div v-if="!isEditing" class="bg-slate-100 px-4 py-2 rounded-lg text-slate-800">
              {{ user?.idCard || '-' }}
            </div>
            <input 
              v-else
              v-model="form.idCard"
              class="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          <!-- Action Buttons -->
          <div v-if="isEditing" class="flex gap-4 mt-6 pt-4 border-t border-slate-100">
            <button 
              @click="saveEdit"
              class="flex-1 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium shadow-lg shadow-blue-200 transition-all"
            >
              บันทึก
            </button>
            <button 
              @click="cancelEdit"
              class="px-6 py-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 font-medium transition-colors"
            >
              ยกเลิก
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'

const props = defineProps({
  user: {
    type: Object,
    default: () => ({})
  }
})

const authStore = useAuthStore()
const isEditing = ref(false)
const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  idCard: ''
})

function startEdit() {
  form.value = {
    firstName: props.user?.name || '',
    lastName: props.user?.lastname || '',
    email: props.user?.email || '',
    phone: props.user?.phone || '',
    idCard: props.user?.idCard || ''
  }
  isEditing.value = true
}

function cancelEdit() {
  isEditing.value = false
}

async function saveEdit() {
  if (authStore.currentUser) {
    const payload = {
      name: form.value.firstName,
      lastname: form.value.lastName,
      email: form.value.email,
      phone: form.value.phone,
      idCard: form.value.idCard
    }

    try {
      const response = await fetch(`http://localhost:3001/api/users/${authStore.currentUser.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      if (response.ok) {
        // Update Store
        authStore.currentUser.name = form.value.firstName
        authStore.currentUser.lastname = form.value.lastName
        authStore.currentUser.email = form.value.email
        authStore.currentUser.phone = form.value.phone
        authStore.currentUser.idCard = form.value.idCard
        
        alert('บันทึกข้อมูลเรียบร้อย')
        isEditing.value = false
      } else {
        alert('เกิดข้อผิดพลาดในการบันทึก')
      }
    } catch (err) {
      console.error(err)
      alert('ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้')
    }
  }
}
</script>

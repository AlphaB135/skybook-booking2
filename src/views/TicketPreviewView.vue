<script setup>
import BookingTicket from '../components/BookingTicket.vue' // เปลี่ยนมาใช้ตัวนี้แทน
import { useBookingStore } from '../stores/booking'
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'

const bookingStore = useBookingStore()
const authStore = useAuthStore()
const router = useRouter()

async function confirm() {
  if (!authStore.currentUser) {
    alert('กรุณาเข้าสู่ระบบก่อนจอง')
    router.push('/login')
    return
  }
  
  const result = await bookingStore.confirmBooking(
    authStore.currentUser.id, 
    authStore.currentUser
  )

  if (result.success) {
    router.push('/booking/success')
  } else {
    alert('การจองล้มเหลว: ' + result.error)
  }
}
</script>

<template>
  <div class="flex flex-col items-center justify-center py-12 space-y-6">
    <h2 class="text-2xl font-bold text-slate-800">ตรวจสอบความถูกต้อง (Review)</h2>
    
    <!-- ใช้ BookingTicket (ตั๋วใบใหญ่) เพื่อ Preview -->
    <div v-if="bookingStore.selectedFlight" class="w-full max-w-4xl px-4">
      <BookingTicket 
        :currentUser="authStore.currentUser || { name: 'Guest', phone: '-', idCard: '-' }" 
        :selectedFlight="bookingStore.selectedFlight"
        bookingReference="PREVIEW"   
        seatNumber="XX"
        gateNumber="D4"
      />
    </div>
    <div v-else class="text-red-500">กรุณาเลือกเที่ยวบินก่อน</div>
    
    <div class="flex gap-4">
      <button 
        @click="$router.push('/')"
        class="px-6 py-2 text-slate-600 hover:text-slate-800"
      >
        ย้อนกลับ
      </button>
      <button 
        v-if="bookingStore.selectedFlight"
        @click="confirm"
        class="px-8 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 shadow-lg shadow-green-200 font-bold"
      >
        ยืนยันการจอง
      </button>
    </div>
  </div>
</template>

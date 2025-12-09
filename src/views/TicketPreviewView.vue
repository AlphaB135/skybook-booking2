<template>
  <div class="flex flex-col items-center justify-center py-12 space-y-6">
    <h2 class="text-2xl font-bold text-slate-800">Review Your Flight</h2>
    <TicketCard 
      v-if="bookingStore.selectedFlight"
      :flight="bookingStore.selectedFlight" 
      :passengerName="authStore.currentUser?.name || 'Guest'"
    />
    <div v-else class="text-red-500">กรุณาเลือกเที่ยวบินก่อน</div>
    
    <div class="flex gap-4">
      <button 
        @click="$router.push('/')"
        class="px-6 py-2 text-slate-600 hover:text-slate-800"
      >
        Back
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

<script setup>
import TicketCard from '../components/TicketCard.vue'
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
  
  // Create mock passenger details from current User or just confirm
  // The original App.vue passed `currentUser` as details, but UserFormComponent isn't used here yet.
  // Actually confirmBooking is what moves us to Passenger Form (Profile). 
  // Wait, in previous flow: Confirm -> API -> success -> GoToPassengerForm.
  
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

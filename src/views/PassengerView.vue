<template>
  <div class="max-w-5xl mx-auto">
    <!-- Profile Hero Section -->
    <ProfileHero @back="$router.push('/')" />
    
    <!-- User Info Form (แสดงข้อมูลและตั๋วที่เพิ่งจอง ถ้ามี) -->
    <!-- Note: UserFormComponent uses 'flight' prop. If we just booked, selectedFlight is set. -->
    <!-- User Info Form -->
    <UserFormComponent 
      :user="authStore.currentUser"
    />

    <!-- Booking List (History) -->
    <div id="booking-list-section" class="mt-12">
      <h3 class="text-xl font-bold text-slate-800 mb-4">ประวัติการจองของคุณ</h3>
      <BookingListComponent :bookings="bookingStore.userBookings" />
    </div>
  </div>
</template>

<script setup>
import ProfileHero from '../components/ProfileHero.vue'
import UserFormComponent from '../components/UserFormComponent.vue'
import BookingListComponent from '../components/BookingListComponent.vue'
import { useBookingStore } from '../stores/booking'
import { useAuthStore } from '../stores/auth'
import { onMounted, nextTick } from 'vue'

const bookingStore = useBookingStore()
const authStore = useAuthStore()

onMounted(async () => {
  if (authStore.currentUser) {
    await bookingStore.fetchUserBookings(authStore.currentUser.id)
    // Auto scroll if needed
     nextTick(() => {
      const element = document.getElementById('booking-list-section')
      if (element) {
         element.scrollIntoView({ behavior: 'smooth' })
      }
    })
  }
})
</script>

<template>
  <div class="space-y-8">
    <HeroSection />
    <BookingComponent 
      :allFlights="bookingStore.flights" 
      @select-flight="handleSelectFlight"
    />
  </div>
</template>

<script setup>
import HeroSection from '../components/HeroSection.vue'
import BookingComponent from '../components/BookingComponent.vue'
import { useBookingStore } from '../stores/booking'
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'

const bookingStore = useBookingStore()
const router = useRouter()

onMounted(() => {
  bookingStore.fetchFlights()
})

function handleSelectFlight(flight) {
  bookingStore.selectFlight(flight)
  router.push('/booking/preview')
}
</script>

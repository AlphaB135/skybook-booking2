<template>
  <div class="w-full">
    <!-- Hero Section -->
    <ProfileHero @back="$emit('back')" />

    <!-- User Info Form -->
    <UserFormComponent :user="currentUser" />

    <!-- Booking List -->
    <BookingListComponent :bookings="bookings" />
  </div>
</template>

<script>
import ProfileHero from './ProfileHero.vue'
import UserFormComponent from './UserFormComponent.vue'
import BookingListComponent from './BookingListComponent.vue'

export default {
  name: 'BookingHistory',
  components: {
    ProfileHero,
    UserFormComponent,
    BookingListComponent
  },
  props: {
    bookings: {
      type: Array,
      default: () => []
    },
    currentUser: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ['back']
}
</script>

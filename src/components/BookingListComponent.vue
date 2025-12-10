<template>
  <div class="bg-white rounded-2xl shadow-sm border border-blue-100 p-6">
    <h2 class="text-2xl font-bold text-blue-700 mb-6">การจองของคุณ</h2>

    <div v-if="bookings.length === 0" class="text-center py-12">
      <div class="inline-flex items-center justify-center w-16 h-16 bg-slate-100 rounded-full mb-4">
        <Plane class="w-8 h-8 text-slate-400" />
      </div>
      <p class="text-slate-500 text-lg">คุณยังไม่มีประวัติการจอง</p>
    </div>

    <div v-else class="grid grid-cols-1 gap-4">
      <div
        v-for="booking in bookings"
        :key="booking.id"
        class="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-all"
      >
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center gap-3">
            <span class="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
              Confirmed
            </span>
            <span class="text-sm text-slate-500">
              จองเมื่อ: {{ new Date(booking.createdAt).toLocaleDateString('th-TH') }}
            </span>
          </div>
          <div class="text-right">
            <p class="text-sm text-slate-500">Booking Ref</p>
            <p class="text-lg font-bold text-orange-600">{{ booking.bookingReference }}</p>
          </div>
        </div>

        <div class="flex items-center justify-between">
          <div class="flex-1">
            <div class="flex items-center gap-4 mb-2">
              <span class="text-lg font-bold text-blue-700">{{ booking.flight.flightNumber }}</span>
              <div class="h-4 w-px bg-slate-300"></div>
              <span class="text-slate-700">{{ booking.flight.from_city }}</span>
              <ArrowRight class="w-4 h-4 text-slate-400" />
              <span class="text-slate-700">{{ booking.flight.to_city }}</span>
            </div>
            <div class="flex items-center gap-4 text-sm text-slate-600">
              <span class="flex items-center gap-1">
                <Clock class="w-4 h-4" />
                {{ booking.flight.departure.time }}
              </span>
              <span class="flex items-center gap-1">
                <Armchair class="w-4 h-4" />
                ที่นั่ง {{ booking.seatNumber }}
              </span>
            </div>
          </div>
          <div class="text-right">
            <p class="text-xl font-bold text-slate-900">{{ booking.flight.price.toLocaleString() }} ฿</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Plane, Clock, ArrowRight, Armchair } from 'lucide-vue-next'

export default {
  name: 'BookingListComponent',
  components: {
    Plane,
    Clock,
    ArrowRight,
    Armchair
  },
  props: {
    bookings: {
      type: Array,
      default: () => []
    }
  }
}
</script>

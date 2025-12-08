<template>
  <div class="max-w-4xl mx-auto">
    <div class="bg-white rounded-xl shadow-lg border-2 border-blue-200 p-8 mb-6">
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4">
          <Check class="w-8 h-8 text-orange-600" />
        </div>
        <h2 class="text-3xl font-bold text-blue-700 mb-2">การจองสำเร็จ</h2>
        <p class="text-slate-600">เที่ยวบินของคุณได้รับการยืนยันแล้ว</p>
      </div>

      <!-- Booking Details -->
      <div class="bg-yellow-50 rounded-lg border-2 border-yellow-200 p-6 mb-6">
        <h3 class="text-lg font-bold text-blue-700 mb-4">รายละเอียดการจอง</h3>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <p class="text-sm font-medium text-blue-600">ชื่อผู้โดยสาร</p>
            <p class="text-base text-slate-900">{{ currentUser.name }}</p>
          </div>
          <div>
            <p class="text-sm font-medium text-blue-600">เบอร์โทรศัพท์</p>
            <p class="text-base text-slate-900">{{ currentUser.phone }}</p>
          </div>
          <div>
            <p class="text-sm font-medium text-blue-600">เลขบัตรประชาชน</p>
            <p class="text-base text-slate-900">{{ currentUser.idCard }}</p>
          </div>
          <div>
            <p class="text-sm font-medium text-blue-600">รหัสการจอง</p>
            <p class="text-base text-orange-600 font-bold">{{ bookingReference }}</p>
          </div>
        </div>
      </div>

      <!-- E-Ticket -->
      <div class="border-2 border-blue-200 rounded-lg overflow-hidden">
        <div class="bg-gradient-to-r from-blue-600 to-orange-500 text-white p-6">
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center gap-2">
              <Plane class="w-8 h-8" />
              <span class="text-2xl font-bold">SkyBook Airlines</span>
            </div>
            <div class="text-right">
              <p class="text-sm opacity-90">Boarding Pass</p>
              <p class="text-lg font-bold">E-TICKET</p>
            </div>
          </div>
        </div>

        <div class="p-6">
          <div class="grid grid-cols-3 gap-6 mb-6">
            <div>
              <p class="text-xs font-medium text-blue-600 mb-1">PASSENGER</p>
              <p class="text-lg font-bold text-slate-900">{{ currentUser.name.toUpperCase() }}</p>
            </div>
            <div>
              <p class="text-xs font-medium text-blue-600 mb-1">FLIGHT</p>
              <p class="text-lg font-bold text-slate-900">{{ selectedFlight.flightNumber }}</p>
            </div>
            <div>
              <p class="text-xs font-medium text-blue-600 mb-1">CLASS</p>
              <p class="text-lg font-bold text-slate-900">{{ selectedFlight.class.toUpperCase() }}</p>
            </div>
          </div>

          <div class="border-t-2 border-dashed border-blue-300 pt-6 mb-6">
            <div class="flex items-center justify-between mb-8">
              <div class="text-center">
                <p class="text-sm font-medium text-blue-600 mb-2">FROM</p>
                <p class="text-4xl font-bold text-blue-700 mb-1">
                  {{ selectedFlight.departure.city.substring(0, 3).toUpperCase() }}
                </p>
                <p class="text-sm text-slate-600">{{ selectedFlight.departure.airport }}</p>
                <p class="text-2xl font-bold text-slate-900 mt-3">{{ selectedFlight.departure.time }}</p>
                <p class="text-sm text-slate-600">{{ selectedFlight.date }}</p>
              </div>

              <div class="flex-1 flex flex-col items-center px-8">
                <Plane class="w-8 h-8 text-orange-500 mb-2 transform rotate-90" />
                <div class="w-full h-px bg-blue-300"></div>
                <p class="text-sm text-slate-600 mt-2">{{ selectedFlight.duration }}</p>
              </div>

              <div class="text-center">
                <p class="text-sm font-medium text-blue-600 mb-2">TO</p>
                <p class="text-4xl font-bold text-blue-700 mb-1">
                  {{ selectedFlight.arrival.city.substring(0, 3).toUpperCase() }}
                </p>
                <p class="text-sm text-slate-600">{{ selectedFlight.arrival.airport }}</p>
                <p class="text-2xl font-bold text-slate-900 mt-3">{{ selectedFlight.arrival.time }}</p>
                <p class="text-sm text-slate-600">{{ selectedFlight.date }}</p>
              </div>
            </div>
          </div>

          <div class="border-t-2 border-dashed border-blue-300 pt-6">
            <div class="grid grid-cols-3 gap-6">
              <div>
                <p class="text-xs font-medium text-blue-600 mb-1">BOOKING REF</p>
                <p class="text-base font-bold text-slate-900">{{ bookingReference }}</p>
              </div>
              <div>
                <p class="text-xs font-medium text-blue-600 mb-1">SEAT</p>
                <p class="text-base font-bold text-slate-900">{{ seatNumber }}</p>
              </div>
              <div>
                <p class="text-xs font-medium text-blue-600 mb-1">GATE</p>
                <p class="text-base font-bold text-slate-900">{{ gateNumber }}</p>
              </div>
            </div>
          </div>

          <div class="mt-6 pt-6 border-t border-blue-200">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-xs font-medium text-blue-600 mb-1">TOTAL FARE</p>
                <p class="text-2xl font-bold text-orange-600">{{ selectedFlight.price.toLocaleString() }} THB</p>
              </div>
              <div class="text-right">
                <svg class="w-24 h-24" viewBox="0 0 100 100">
                  <rect width="100" height="100" fill="white"/>
                  <g fill="black">
                    <rect width="4" height="4" x="0" y="0"/>
                    <rect width="4" height="4" x="8" y="0"/>
                    <rect width="4" height="4" x="16" y="0"/>
                    <rect width="4" height="4" x="32" y="0"/>
                    <rect width="4" height="4" x="48" y="0"/>
                    <rect width="4" height="4" x="0" y="8"/>
                    <rect width="4" height="4" x="16" y="8"/>
                    <rect width="4" height="4" x="24" y="8"/>
                    <rect width="4" height="4" x="32" y="8"/>
                    <rect width="4" height="4" x="40" y="8"/>
                    <rect width="4" height="4" x="48" y="8"/>
                  </g>
                </svg>
                <p class="text-xs text-slate-500 mt-1">Scan at Gate</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-6 p-4 bg-yellow-50 border-2 border-yellow-300 rounded-lg">
        <p class="text-sm text-blue-800">
          <strong>หมายเหตุ:</strong> โปรดมาถึงสนามบินก่อนเวลาเครื่องออก 2 ชั่วโมง พร้อมบัตรประชาชนและ E-Ticket นี้
        </p>
      </div>
    </div>

    <button
      @click="$emit('reset')"
      class="w-full px-6 py-3 bg-gradient-to-r from-slate-600 to-slate-700 text-white font-medium rounded-lg hover:from-slate-700 hover:to-slate-800 transition-all shadow-md"
    >
      จองเที่ยวบินใหม่
    </button>
  </div>
</template>

<script>
import { Check, Plane } from 'lucide-vue-next'

export default {
  name: 'BookingTicket',
  components: {
    Check,
    Plane
  },
  props: {
    currentUser: {
      type: Object,
      required: true
    },
    selectedFlight: {
      type: Object,
      required: true
    },
    bookingReference: {
      type: String,
      required: true
    },
    seatNumber: {
      type: String,
      required: true
    },
    gateNumber: {
      type: String,
      required: true
    }
  },
  emits: ['reset']
}
</script>

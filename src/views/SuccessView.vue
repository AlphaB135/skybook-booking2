<template>
  <div class="flex justify-center py-12">
    <div class="w-full max-w-2xl space-y-6">
      <BookingTicket 
        v-if="bookingStore.bookingId"
        :currentUser="bookingStore.passengerDetails" 
        :selectedFlight="bookingStore.selectedFlight" 
        :bookingReference="bookingStore.passengerDetails?.bookingReference"
        :seatNumber="bookingStore.passengerDetails?.seatNumber"
        gateNumber="D4"
      />
      <div v-else class="text-center text-red-500">
        ไม่พบข้อมูลตั๋ว
      </div>

      <div class="flex justify-center gap-4">
        <button 
          @click="bookMore"
          class="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
        >
          จองเพิ่ม
        </button>
        <button 
          @click="$router.push('/booking/passenger')"
          class="px-6 py-2 bg-white text-blue-600 border border-blue-200 rounded-full hover:bg-blue-50 transition-colors"
        >
          ดูประวัติ
        </button>
      </div>
      
      <div class="text-center text-slate-500 text-sm mt-4">
        หน้านี้จะปิดเองอัตโนมัติใน {{ countdown }} วินาที...
      </div>
    </div>
  </div>
</template>

<script setup>
// --- 1. Import ของที่ต้องใช้ ---
import BookingTicket from '../components/BookingTicket.vue' // คอมโพเนนต์แสดงตั๋ว
import { useBookingStore } from '../stores/booking'         // สโตร์เก็บข้อมูลการจอง
import { useRouter } from 'vue-router'                      // เครื่องมือเปลี่ยนหน้า (Router)
import { ref, onMounted, onUnmounted } from 'vue'           // เครื่องมือของ Vue (Lifecycle Hook)

// --- 2. ประกาศตัวแปร ---
const bookingStore = useBookingStore()  // เรียกใช้ Store
const router = useRouter()              // เรียกใช้ Router
const countdown = ref(3)                // สร้างตัวแปรนับถอยหลัง (เริ่มที่ 3 วินาที)
let timer = null                        // ตัวแปรสำหรับเก็บตัวจับเวลา (Timer)

// --- 3. ฟังก์ชัน "จองเพิ่ม" ---
function bookMore() {
  bookingStore.clearSelection()         // ล้างข้อมูลการจองเก่าออกให้หมด
  router.push('/')                      // เด้งกลับไปหน้าแรก
}

// --- 4. เมื่อโหลดหน้าเสร็จ (On Mounted) ---
// --- 4. เมื่อโหลดหน้าเสร็จ (On Mounted) ---
onMounted(() => {
  // auto-redirect disabled for presentation
  /*
  timer = setInterval(() => {
    countdown.value--                  // ลดเวลาลงทีละ 1 
    
    // ถ้าเวลาหมด (เหลือ 0 หรือน้อยกว่า)
    if (countdown.value <= 0) {
      clearInterval(timer)             // หยุดตัวจับเวลา
      router.push('/booking/passenger') // สั่งให้เปลี่ยนหน้าไปที่ "ประวัติการจอง"
    }
  }, 1000)
  */
})

// --- 5. เมื่อออกจากหน้านี้ (On Unmounted) ---
onUnmounted(() => {
  // สำคัญ: ต้องเคลียร์ Timer ทิ้งเสมอ เพื่อไม่ให้ทำงานค้างใน Background
  if (timer) clearInterval(timer)
})
</script>

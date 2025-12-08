<template>
  <div class="min-h-screen bg-white font-sans text-slate-900">
    <!-- Navbar (แสดงตลอด ยกเว้นหน้า Login) -->
    <Navbar 
      v-if="currentStep !== 'login'" 
      :currentUser="currentUser" 
      :activeTab="activeTab"
      @logout="logout"
      @navigate="handleNavigation"
    />

    <!-- Main Content Area -->
    <main class="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8" style="zoom: 1.2;">
      
      <!-- 1. หน้า Login -->
      <div v-if="currentStep === 'login'" class="flex justify-center items-center min-h-[80vh]">
        <LoginPage @login="handleLoginSuccess" />
      </div>

      <!-- 2. หน้าค้นหาเที่ยวบิน (หน้าหลัก) -->
      <div v-else-if="currentStep === 'flights'" class="space-y-8">
        <!-- Hero Section ใหม่ -->
        <HeroSection />
        
        <!-- Booking Component ใหม่ -->
        <BookingComponent 
          :allFlights="flights" 
          @select-flight="selectFlight"
        />
      </div>

      <!-- 3. หน้ากรอกข้อมูลผู้โดยสาร -->
      <div v-else-if="currentStep === 'passenger-form'" class="max-w-3xl mx-auto">
        <button 
          @click="currentStep = 'flights'"
          class="mb-6 text-slate-500 hover:text-blue-600 flex items-center gap-2 transition-colors"
        >
          ← ย้อนกลับ
        </button>
        <UserFormComponent 
          :flight="selectedFlight" 
          :currentUser="currentUser"
          @submit="confirmBooking" 
        />
      </div>

      <!-- 4. หน้าตั๋วเครื่องบิน (Booking Success) -->
      <div v-else-if="currentStep === 'ticket'" class="flex justify-center py-12">
        <div class="w-full max-w-md space-y-6">
          <BookingTicket 
            :flight="selectedFlight" 
            :passenger="passengerDetails" 
            :bookingId="bookingId"
          />
          <div class="flex justify-center gap-4">
            <button 
              @click="currentStep = 'flights'; selectedFlight = null;"
              class="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
            >
              จองเพิ่ม
            </button>
            <button 
              @click="viewHistory"
              class="px-6 py-2 bg-white text-blue-600 border border-blue-200 rounded-full hover:bg-blue-50 transition-colors"
            >
              ดูประวัติ
            </button>
          </div>
        </div>
      </div>

      <!-- 5. หน้าประวัติการจอง -->
      <div v-else-if="currentStep === 'history'" class="w-full">
        <BookingHistory 
          :userId="currentUser.id" 
          @back="currentStep = 'flights'"
        />
      </div>

    </main>
  </div>
</template>

<script setup>
// นำเข้า Vue Functions
import { ref, onMounted, computed } from 'vue'

// นำเข้า Components
import Navbar from './components/Navbar.vue'
import UserFormComponent from './components/UserFormComponent.vue'
import BookingTicket from './components/BookingTicket.vue'
import LoginPage from './components/LoginPage.vue'
import BookingHistory from './components/BookingHistory.vue'
import HeroSection from './components/HeroSection.vue'
import BookingComponent from './components/BookingComponent.vue'

// --- State Variables (ตัวแปรเก็บสถานะ) ---
const currentStep = ref('login') // หน้าปัจจุบัน: login, flights, passenger-form, ticket, history
const flights = ref([]) // ข้อมูลเที่ยวบินทั้งหมด
const selectedFlight = ref(null) // เที่ยวบินที่เลือก
const passengerDetails = ref(null) // ข้อมูลผู้โดยสารที่กรอก
const currentUser = ref(null) // ผู้ใช้ที่ล็อกอินอยู่
const bookingId = ref(null) // เลขที่การจอง (หลังจองเสร็จ)

// Computed Property สำหรับ Active Tab ใน Navbar
const activeTab = computed(() => {
  if (currentStep.value === 'history') return 'profile'
  return 'flights'
})

// --- Functions (ฟังก์ชันการทำงาน) ---

// ฟังก์ชันจัดการการนำทางจาก Navbar
function handleNavigation(tab) {
  if (tab === 'flights') {
    currentStep.value = 'flights'
  } else if (tab === 'profile') {
    viewHistory()
  }
}

// ฟังก์ชันดึงข้อมูลเที่ยวบินจาก API
async function fetchFlights() {
  try {
    const response = await fetch('http://localhost:3001/api/flights')
    const data = await response.json()
    flights.value = data
  } catch (error) {
    console.error('Error fetching flights:', error)
  }
}

// ฟังก์ชันเลือกเที่ยวบิน
function selectFlight(flight) {
  selectedFlight.value = flight
  currentStep.value = 'passenger-form' // ไปหน้ากรอกข้อมูล
}

// ฟังก์ชันยืนยันการจอง
async function confirmBooking(details) {
  passengerDetails.value = details
  
  try {
    // ส่งข้อมูลไปบันทึกที่ Server
    const response = await fetch('http://localhost:3001/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: currentUser.value.id,
        flightId: selectedFlight.value.id,
        bookingReference: `BK${Date.now()}`, // สร้างเลข Booking มั่วๆ
        seatNumber: '12A' // สมมติเลขที่นั่ง
      })
    })
    const result = await response.json()
    
    if (result.success) {
      bookingId.value = result.bookingId
      currentStep.value = 'ticket' // ไปหน้าตั๋ว
    }
  } catch (error) {
    console.error('Booking failed:', error)
    alert('การจองล้มเหลว กรุณาลองใหม่')
  }
}

// ฟังก์ชันจัดการเมื่อ Login สำเร็จ
function handleLoginSuccess(user) {
  currentUser.value = user
  currentStep.value = 'flights' // เข้าหน้าหลัก
  fetchFlights() // โหลดข้อมูลเที่ยวบิน
}

// ฟังก์ชันออกจากระบบ
function logout() {
  currentUser.value = null
  selectedFlight.value = null
  currentStep.value = 'login'
}

// ฟังก์ชันดูประวัติการจอง
function viewHistory() {
  currentStep.value = 'history'
}
</script>
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

      <!-- 1. หน้า Login (Full Width) -->
    <div v-if="currentStep === 'login'" class="w-full min-h-screen bg-slate-50">
      <LoginPage 
        @login="handleLoginSuccess" 
        @switch-to-register="currentStep = 'register'"
      />
    </div>

    <!-- 1.5 หน้าลงทะเบียน (Full Width) -->
    <div v-else-if="currentStep === 'register'" class="w-full min-h-screen bg-slate-50 flex items-center justify-center py-12">
      <RegisterForm 
        @register="handleRegister" 
        @switch-to-login="currentStep = 'login'"
      />
    </div>

    <!-- Main Content Area (For other pages) -->
    <main v-else class="max-w-screen-2xl mx-auto py-8 px-4 sm:px-6 lg:px-8" style="zoom: 1.2;">
      
    <!-- 2. หน้าค้นหาเที่ยวบิน (หน้าหลัก) -->
      <div v-if="currentStep === 'flights'" class="space-y-8">
        <!-- Hero Section ใหม่ -->
        <HeroSection />
        
        <!-- Booking Component ใหม่ -->
        <BookingComponent 
          :allFlights="flights" 
          @select-flight="selectFlight"
        />
      </div>

      <!-- 2.5 หน้าดูตั๋ว (Ticket Preview) -->
      <div v-else-if="currentStep === 'ticket-preview'" class="flex flex-col items-center justify-center py-12 space-y-6">
        <h2 class="text-2xl font-bold text-slate-800">Review Your Flight</h2>
        <TicketCard 
          :flight="selectedFlight" 
          :passengerName="currentUser?.name || 'Guest'"
        />
        
        <div class="flex gap-4">
          <button 
            @click="currentStep = 'flights'"
            class="px-6 py-2 text-slate-600 hover:text-slate-800"
          >
            Back
          </button>
          <button 
            @click="confirmBooking(currentUser)"
            class="px-8 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 shadow-lg shadow-green-200 font-bold"
          >
            ยืนยันการจอง
          </button>
        </div>
      </div>

      <!-- 3. หน้ากรอกข้อมูลผู้โดยสาร -->
      <div v-else-if="currentStep === 'passenger-form'" class="max-w-5xl mx-auto">
        <!-- Profile Hero Section -->
        <ProfileHero @back="currentStep = 'flights'" />
        
        <!-- User Info Form -->
        <UserFormComponent 
          :flight="selectedFlight" 
          :user="currentUser"
        />

        <!-- Booking List (History) -->
        <div id="booking-list-section" class="mt-12">
          <h3 class="text-xl font-bold text-slate-800 mb-4">ประวัติการจองของคุณ</h3>
          <BookingListComponent :bookings="userBookings" />
        </div>
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
              @click="goToPassengerForm"
              class="px-6 py-2 bg-white text-blue-600 border border-blue-200 rounded-full hover:bg-blue-50 transition-colors"
            >
              ดูประวัติ
            </button>
          </div>
        </div>
      </div>

    </main>
  </div>
</template>

<script setup>
// นำเข้า Vue Functions
import { ref, computed, nextTick } from 'vue'

// นำเข้า Components
import Navbar from './components/Navbar.vue'
import UserFormComponent from './components/UserFormComponent.vue'
import BookingTicket from './components/BookingTicket.vue'
import LoginPage from './components/LoginPage.vue'
import RegisterForm from './components/RegisterForm.vue'
import HeroSection from './components/HeroSection.vue'
import ProfileHero from './components/ProfileHero.vue'
import BookingComponent from './components/BookingComponent.vue'
import TicketCard from './components/TicketCard.vue'
import BookingListComponent from './components/BookingListComponent.vue'

// --- State Variables (ตัวแปรเก็บสถานะ) ---
const currentStep = ref('login') // หน้าปัจจุบัน: login, register, flights, ticket-preview, passenger-form, ticket
const flights = ref([]) // ข้อมูลเที่ยวบินทั้งหมด
const selectedFlight = ref(null) // เที่ยวบินที่เลือก
const passengerDetails = ref(null) // ข้อมูลผู้โดยสารที่กรอก
const currentUser = ref(null) // ผู้ใช้ที่ล็อกอินอยู่
const bookingId = ref(null) // เลขที่การจอง (หลังจองเสร็จ)
const userBookings = ref([]) // ประวัติการจองของผู้ใช้

// Computed Property สำหรับ Active Tab ใน Navbar
const activeTab = computed(() => {
  if (currentStep.value === 'passenger-form') return 'profile'
  return 'flights'
})

// --- Functions (ฟังก์ชันการทำงาน) ---

// ฟังก์ชันจัดการการนำทางจาก Navbar
function handleNavigation(tab) {
  if (tab === 'flights') {
    currentStep.value = 'flights'
  } else if (tab === 'profile') {
    goToPassengerForm()
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

// ฟังก์ชันดึงประวัติการจอง
async function fetchUserBookings() {
  if (!currentUser.value) return
  try {
    const response = await fetch(`http://localhost:3001/api/users/${currentUser.value.id}/bookings`)
    const data = await response.json()
    userBookings.value = data
  } catch (error) {
    console.error('Error fetching bookings:', error)
  }
}

// ฟังก์ชันเลือกเที่ยวบิน
function selectFlight(flight) {
  selectedFlight.value = flight
  currentStep.value = 'ticket-preview' // ไปหน้าดูตั๋วก่อน
}

// ฟังก์ชันไปหน้ากรอกข้อมูลผู้โดยสาร (และเลื่อนลงไปดูประวัติ)
async function goToPassengerForm() {
  currentStep.value = 'passenger-form'
  await fetchUserBookings() // ดึงข้อมูลประวัติ
  
  // รอให้ DOM อัพเดทแล้วค่อยเลื่อนลง
  nextTick(() => {
    const element = document.getElementById('booking-list-section')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  })
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
      // currentStep.value = 'ticket' // ไม่ไปหน้าตั๋วแล้ว
      goToPassengerForm() // ไปหน้าข้อมูลผู้ใช้ (ดูประวัติ) เลย
    }
  } catch (error) {
    console.error('Booking failed:', error)
    alert('การจองล้มเหลว กรุณาลองใหม่')
  }
}

// ฟังก์ชันสมัครสมาชิก
async function handleRegister(userData) {
  try {
    const response = await fetch('http://localhost:3001/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    })
    const result = await response.json()
    
    if (result.success) {
      alert('สมัครสมาชิกสำเร็จ!')
      currentStep.value = 'login' // กลับไปหน้า Login
    } else {
      alert('สมัครสมาชิกไม่สำเร็จ: ' + (result.error || 'ไม่ทราบสาเหตุ'))
    }
  } catch (error) {
    console.error('Register failed:', error)
    alert('เกิดข้อผิดพลาดในการเชื่อมต่อ')
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
  goToPassengerForm()
}
</script>
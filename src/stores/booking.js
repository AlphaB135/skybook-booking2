import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useBookingStore = defineStore('booking', () => {
  // ==========================================
  // 1. STATE (ตัวแปรเก็บข้อมูล)
  // ==========================================
  const flights = ref([])           // รายการเที่ยวบินทั้งหมด
  const selectedFlight = ref(null)  // เที่ยวบินที่ลูกค้าเลือก
  const passengerDetails = ref(null)// ข้อมูลผู้โดยสาร
  const bookingId = ref(null)       // รหัสการจอง
  const userBookings = ref([])      // ประวัติการจองของผู้ใช้

  // --- MOCK DATA (เที่ยวบินจำลอง) ---
  const MOCK_FLIGHTS = [
    { id: 1, flightNumber: 'PG201', from_city: 'Bangkok (BKK)', to_city: 'Chiang Mai (CNX)', departure: { city: 'Bangkok', airport: 'Bangkok (BKK)', time: '08:00' }, arrival: { city: 'Chiang Mai', airport: 'Chiang Mai (CNX)', time: '09:15' }, duration: '1h 15m', price: 1500, seats: 20 },
    { id: 2, flightNumber: 'PG202', from_city: 'Chiang Mai (CNX)', to_city: 'Bangkok (BKK)', departure: { city: 'Chiang Mai', airport: 'Chiang Mai (CNX)', time: '10:30' }, arrival: { city: 'Bangkok', airport: 'Bangkok (BKK)', time: '11:45' }, duration: '1h 15m', price: 1500, seats: 15 },
    { id: 3, flightNumber: 'PG301', from_city: 'Bangkok (BKK)', to_city: 'Phuket (HKT)', departure: { city: 'Bangkok', airport: 'Bangkok (BKK)', time: '13:00' }, arrival: { city: 'Phuket', airport: 'Phuket (HKT)', time: '14:30' }, duration: '1h 30m', price: 2200, seats: 5 },
    { id: 4, flightNumber: 'PG302', from_city: 'Phuket (HKT)', to_city: 'Bangkok (BKK)', departure: { city: 'Phuket', airport: 'Phuket (HKT)', time: '15:30' }, arrival: { city: 'Bangkok', airport: 'Bangkok (BKK)', time: '17:00' }, duration: '1h 30m', price: 2200, seats: 10 },
    { id: 5, flightNumber: 'PG401', from_city: 'Bangkok (BKK)', to_city: 'Samui (USM)', departure: { city: 'Bangkok', airport: 'Bangkok (BKK)', time: '09:00' }, arrival: { city: 'Samui', airport: 'Samui (USM)', time: '10:00' }, duration: '1h 00m', price: 3500, seats: 8 },
    { id: 6, flightNumber: 'PG402', from_city: 'Samui (USM)', to_city: 'Bangkok (BKK)', departure: { city: 'Samui', airport: 'Samui (USM)', time: '11:00' }, arrival: { city: 'Bangkok', airport: 'Bangkok (BKK)', time: '12:00' }, duration: '1h 00m', price: 3500, seats: 12 }
  ]

  // MOCK DATABASE (เก็บประวัติการจองใน RAM Browser) - อยู่ข้างนอกจะได้ไม่หายเวลาเปลี่ยนหน้า
  // (Note: ถ้า Refresh Browser ข้อมูลนี้จะหาย ก็ถูกต้องตาม Requirement User)
  let mockBookingsDB = [] 

  // ==========================================
  // 2. ACTIONS (ฟังก์ชันทำงาน)
  // ==========================================

  // จำลองการดึงข้อมูลเที่ยวบิน
  async function fetchFlights() {
    // ดึงปุ๊บ ได้ปั๊บ (ไม่ต้องรอโหลด)
    flights.value = MOCK_FLIGHTS
  }

  // จำลองการดึงประวัติการจอง
  async function fetchUserBookings(userId) {
    if (!userId) return
    // Filter bookings for this user
    userBookings.value = mockBookingsDB.filter(b => b.userId === userId)
  }

  // เลือกเที่ยวบิน
  function selectFlight(flight) {
    selectedFlight.value = flight
  }

  // จำลองการบันทึกการจอง
  async function confirmBooking(userId, userDetails) {
    try {
      passengerDetails.value = userDetails
      
      // Create new booking record
      const newBooking = {
        id: Math.floor(Math.random() * 10000),
        userId: userId,
        bookingReference: 'BK' + Math.floor(Math.random() * 100000),
        seatNumber: 'A' + (Math.floor(Math.random() * 30) + 1),
        flight: selectedFlight.value, // เก็บ object เที่ยวบิน
        createdAt: new Date()
      }

      // Save to "Mock DB"
      mockBookingsDB.unshift(newBooking)
      
      bookingId.value = newBooking.id
      return { success: true, bookingId: newBooking.id }

    } catch (error) {
      console.error('Booking failed:', error)
      return { success: false, error: 'เกิดข้อผิดพลาดในการจอง' }
    }
  }

  // ล้างข้อมูลหน้าจอ
  function clearSelection() {
    selectedFlight.value = null
    bookingId.value = null
    passengerDetails.value = null
  }

  // ==========================================
  // 3. RETURN
  // ==========================================
  return {
    flights,
    selectedFlight,
    passengerDetails,
    bookingId,
    userBookings,
    fetchFlights,
    fetchUserBookings,
    selectFlight,
    confirmBooking,
    clearSelection
  }
})

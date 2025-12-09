import { defineStore } from 'pinia'
import { ref } from 'vue'

// --- กำหนด Store ชื่อ 'booking' (ใช้เก็บข้อมูลการจองตั๋วทั้งระบบ) ---
export const useBookingStore = defineStore('booking', () => {
  
  // ==========================================
  // 1. STATE (ตัวแปรเก็บข้อมูล)
  // ==========================================
  
  const flights = ref([])           // เก็บรายการเที่ยวบินทั้งหมด (ดึงมาจาก DB)
  const selectedFlight = ref(null)  // เก็บเที่ยวบินที่ลูกค้า "กำลังเลือก" (เช่น เที่ยวบินไปเชียงใหม่)
  const passengerDetails = ref(null)// เก็บข้อมูลผู้โดยสาร + รายละเอียดตั๋ว (ไว้โชว์หน้าตั๋ว)
  const bookingId = ref(null)       // เก็บ ID การจองที่ได้จาก Database (เช่น บันทึกแล้วได้ ID 15)
  const userBookings = ref([])      // เก็บประวัติการจองทั้งหมดของผู้ใช้นั้นๆ
  const isFlightsLoaded = ref(false)// ตัวเช็คว่า "โหลดข้อมูลเที่ยวบินมาหรือยัง?" (จะได้ไม่ต้องโหลดซ้ำ)

  // ==========================================
  // 2. ACTIONS (ฟังก์ชันทำงาน)
  // ==========================================

  // --- ฟังก์ชันดึงข้อมูลเที่ยวบินทั้งหมด (เรียกตอนเข้าหน้าแรก) ---
  // ไปดึงจาก Server: GET /api/flights
  async function fetchFlights() {
    // ถ้าเคยโหลดมาแล้ว และมีข้อมูลอยู่แล้ว -> ไม่ต้องโหลดซ้ำ (ประหยัดเน็ต)
    if (isFlightsLoaded.value && flights.value.length > 0) return 
    
    try {
      // ยิง Request ไปขอข้อมูล
      const response = await fetch('http://localhost:3001/api/flights')
      const data = await response.json() // แปลงเป็น JSON
      flights.value = data               // เอาข้อมูลใส่ตัวแปร flights
      isFlightsLoaded.value = true       // จำไว้ว่า "โหลดเสร็จแล้วนะ"
    } catch (error) {
      console.error('Error fetching flights:', error)
    }
  }

  // --- ฟังก์ชันดึงประวัติการจองของผู้ใช้ (เรียกหน้าประวัติ) ---
  // ไปดึงจาก Server: GET /api/users/:userId/bookings
  async function fetchUserBookings(userId) {
    if (!userId) return // ถ้าไม่มี User ID ก็จบงานเลย
    try {
      const response = await fetch(`http://localhost:3001/api/users/${userId}/bookings`)
      const data = await response.json()
      userBookings.value = data // เอาประวัติใส่ตัวแปร userBookings
    } catch (error) {
      console.error('Error fetching bookings:', error)
    }
  }

  // --- ฟังก์ชันเลือกเที่ยวบิน (เรียกตอนกดปุ่ม "เลือก" ที่การ์ดเที่ยวบิน) ---
  function selectFlight(flight) {
    selectedFlight.value = flight // จำไว้ว่าลูกค้าเลือกไฟลท์นี้นะ
  }

  // --- ฟังก์ชันยืนยันการจอง (เรียกตอนกด "ยืนยันการจอง" ที่หน้ากรอกชื่อ) ---
  // ไปบันทึกที่ Server: POST /api/bookings
  async function confirmBooking(userId, details) {
    passengerDetails.value = details // จำชื่อผู้โดยสารไว้ก่อน

    // ถ้ายังไม่ได้เลือกเที่ยวบิน -> แจ้ง Error
    if (!selectedFlight.value) return { success: false, error: 'No flight selected' }

    // สร้างข้อมูลจำลอง (เลขตั๋ว, เลขที่นั่ง) *ของจริงอาจต้องให้ Server คิดให้
    const bookingRef = `BK${Date.now()}` // สุ่มเลขตั๋วจากเวลาปัจจุบัน
    const seatNum = '12A'                // กำหนดที่นั่ง (Fix ไว้ก่อน)

    try {
      // ยิงข้อมูลไปบันทึกจริงใน Database
      const response = await fetch('http://localhost:3001/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: userId,
          flightId: selectedFlight.value.id,
          bookingReference: bookingRef,
          seatNumber: seatNum 
        })
      })
      const result = await response.json()
      
      // ถ้าบันทึกสำเร็จ
      if (result.success) {
        bookingId.value = result.bookingId // เก็บ ID การจองที่ได้มา
        
        // อัปเดตข้อมูลตั๋วให้ครบถ้วน (เอาไว้โชว์หน้า Success)
        passengerDetails.value = {
            ...details,
            bookingReference: bookingRef,
            seatNumber: seatNum
        }

        return { success: true, bookingId: result.bookingId }
      }
      return { success: false, error: 'Booking failed on server' }
    } catch (error) {
      console.error('Booking failed:', error)
      return { success: false, error: 'Connection error' }
    }
  }

  // --- ฟังก์ชันล้างข้อมูล (เรียกตอนจองเสร็จ หรือเริ่มใหม่) ---
  function clearSelection() {
    selectedFlight.value = null   // ล้างเที่ยวบินที่เลือก
    bookingId.value = null        // ล้างเลข Booking ID
    passengerDetails.value = null // ล้างข้อมูลผู้โดยสาร
    // (หมายเหตุ: ข้อมูลใน Database ไม่หาย หายแค่หน้าจอ)
  }

  // ==========================================
  // 3. RETURN (ส่งออกให้คนอื่นใช้)
  // ==========================================
  return {
    // ตัวแปร (State)
    flights,
    selectedFlight,
    passengerDetails,
    bookingId,
    userBookings,
    
    // ฟังก์ชัน (Actions)
    fetchFlights,
    fetchUserBookings,
    selectFlight,
    confirmBooking,
    clearSelection
  }
})

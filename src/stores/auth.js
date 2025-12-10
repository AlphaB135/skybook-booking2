import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  // ==========================================
  // 1. STATE (เก็บข้อมูล)
  // ==========================================
  const currentUser = ref(null) // เก็บข้อมูลคนล็อกอิน
  const isAuthenticated = ref(false)

  // --- MOCK DATABASE (เก็บคนสมัครสมาชิกใน RAM) ---
  // (Note: ถ้า Refresh Browser ข้อมูลนี้จะหาย ตาม Requirement)
  const mockUsersDB = [] 
  let userIdCounter = 1

  // ==========================================
  // 2. ACTIONS (ฟังก์ชันทำงาน)
  // ==========================================

  // ฟังก์ชันสมัครสมาชิก (จำลอง)
  async function register(userData) {
    try {
      // สร้าง User ใหม่
      const newUser = {
        id: userIdCounter++,
        ...userData
      }
      
      // บันทึกลง "Database จำลอง"
      mockUsersDB.push(newUser)
      
      console.log('✅ Registered Mock User:', newUser)
      return { success: true, userId: newUser.id }

    } catch (error) {
      console.error('Registration failed:', error)
      return { success: false, error: 'Registration failed' }
    }
  }

  // ฟังก์ชันเข้าสู่ระบบ (จำลอง)
  async function login(credentials) {
    try {
      const { phone, idCard, password } = credentials

      // ค้นหาใน Mock DB
      const user = mockUsersDB.find(u => 
        (u.phone === phone || u.idCard === phone) && u.password === password
      )

      if (user) {
        // เจอตัว -> ล็อกอินสำเร็จ
        currentUser.value = user
        isAuthenticated.value = true
        return { success: true }
      } else {
        // ไม่เจอ -> ล็อกอินไม่ผ่าน
        return { success: false, error: 'Invalid credentials' }
      }
    } catch (error) {
      console.error('Login failed:', error)
      return { success: false, error: 'Login error' }
    }
  }

  // ฟังก์ชันอัปเดตข้อมูล (จำลอง)
  async function updateUser(userId, updatedData) {
    const index = mockUsersDB.findIndex(u => u.id === userId)
    if (index !== -1) {
      // อัปเดตข้อมูลใน Mock DB
      mockUsersDB[index] = { ...mockUsersDB[index], ...updatedData }
      // อัปเดตข้อมูลใน currentUser ด้วย (ถ้าเป็นคนเดียวกัน)
      if (currentUser.value && currentUser.value.id === userId) {
        currentUser.value = { ...currentUser.value, ...updatedData }
      }
      return { success: true }
    }
    return { success: false, error: 'User not found' }
  }

  // ออกจากระบบ
  function logout() {
    currentUser.value = null
    isAuthenticated.value = false
  }

  // ==========================================
  // 3. RETURN
  // ==========================================
  return {
    currentUser,
    isAuthenticated,
    register,
    login,
    logout,
    updateUser
  }
})

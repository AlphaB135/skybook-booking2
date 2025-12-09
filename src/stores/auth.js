import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export const useAuthStore = defineStore('auth', () => {
  const currentUser = ref(null)
  
  // Login Action
  async function login(credential) {
    try {
      const response = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credential)
      })

      const data = await response.json()

      if (response.ok) {
        currentUser.value = data.user
        return { success: true }
      } else {
        return { success: false, error: data.error || 'เข้าสู่ระบบไม่สำเร็จ' }
      }
    } catch (err) {
      console.error('Login error:', err)
      return { success: false, error: 'เกิดข้อผิดพลาดในการเชื่อมต่อ' }
    }
  }

  // Register Action
  async function register(userData) {
    try {
      const response = await fetch('http://localhost:3001/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      })
      const result = await response.json()
      
      if (result.success) {
        return { success: true }
      } else {
        return { success: false, error: result.error || 'ไม่ทราบสาเหตุ' }
      }
    } catch (error) {
      console.error('Register failed:', error)
      return { success: false, error: 'เกิดข้อผิดพลาดในการเชื่อมต่อ' }
    }
  }

  // Logout Action
  function logout() {
    currentUser.value = null
  }

  return {
    currentUser,
    login,
    register,
    logout
  }
})

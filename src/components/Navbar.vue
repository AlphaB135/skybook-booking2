<template>
  <nav>
    <div class="left" @click="$router.push('/')" style="cursor: pointer;">
      <img src="../assets/logoapp.png" alt="Logo" class="logo" />
      <p>Skybook Airlines</p>
    </div>

    <div class="right">
      <p>สวัสดี, {{ currentUser?.name || 'ผู้ใช้' }}</p>

      <div class="btn">
        <a href="#" class="link" :class="{ active: activeTab === 'flights' }" @click.prevent="$router.push('/')">เที่ยวบิน</a>
        <a href="#" class="link" :class="{ active: activeTab === 'profile' }" @click.prevent="$router.push('/booking/passenger')">ข้อมูลส่วนตัว</a>
      </div>

      <button class="logout" @click="handleLogout">ออกจากระบบ</button>
    </div>
  </nav>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const props = defineProps({
  currentUser: Object,
  activeTab: String
})

const router = useRouter()
const authStore = useAuthStore()

function handleLogout() {
  authStore.logout()
  router.push('/login')
}
</script>

<style scoped>
nav {
  width: 100%;
  height: 80px;
  background: #ffffff;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: "Roboto", sans-serif;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.left {
  display: flex;
  align-items: center;
  gap: 10px;
}

.logo {
  width: 40px;
  height: 40px;
  border-radius: 6px;
}

.left p {
  font-size: 20px;
  font-weight: bold;
  padding: 0 5px;
  color: #475569;
  margin: 0;
}

.right {
  display: flex;
  align-items: center;
}

.right p {
  color: #000000;
  font-size: 15px;
  font-weight: normal;
  margin: 0 15px;
}

.btn {
  display: flex;
  width: 280px;
  background: #e0e0e0;
  height: 35px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  overflow: hidden;
}

.link {
  text-decoration: none;
  width: 140px;
  text-align: center;
  font-size: 14px;
  font-weight: 600;
  color: #002c66;
  background: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.link.active {
  background: #002c66;
  color: #ffda04 !important;
  box-shadow: inset 0px 4px 10px rgba(0, 0, 0, 0.1);
}

.logout {
  background: transparent;
  color: #000000;
  font-weight: 500;
  border: none;
  font-size: 15px;
  text-shadow: 0px 1px 3px rgba(0, 0, 0, 0.2);
  padding: 8px 16px;
  cursor: pointer;
  margin-left: 10px;
}
.logout:hover {
  color: #d60000;
}
</style>

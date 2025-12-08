<template>
  <nav>
    <div class="left">
      <img src="../assets/logoapp.png" alt="Logo" class="logo" />
      <p>Skybook Airlines</p>
    </div>

    <div class="right">
      <p>สวัสดี, {{ username }}</p>

      <div class="btn">
        <router-link to="/" class="link">เที่ยวบิน</router-link>
        <router-link to="/booking" class="link">ข้อมูลส่วนตัว</router-link>
      </div>

      <button class="logout" @click="logout">ออกจากระบบ</button>
    </div>
  </nav>
</template>

<script>
export default {
  name: "NavbarComponent",

  props: {
    username: {
      type: String,
      default: "ผู้ใช้",
    },
  },

  methods: {
    logout() {
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
nav {
  width: screen-width;
  height: 50px;
  background: #ffffff;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: "Roboto", sans-serif;
}

.left {
  display: flex;
  align-items: center;
  gap: 10px;
}

.logo {
  width: 40px;
  height: 40px;
}

.left p {
  font-size: 20px;
  font-weight: bold;
  padding: 0 5px;
  color: #475569;
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
}

.link {
  text-decoration: none;
  width: 140px;
  text-align: center;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  color: #002c66;
  background: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
}

.router-link-active {
  background: #002c66;
  color: #ffda04 !important;
  box-shadow: inset 0px 4px 10px rgba(0, 0, 0, 0.1);
}

.logo {
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  color: #000000;
}

.logout {
  background: transparent;
  color: #000000;
  font-weight: 500;
  border: none;
  font-size: 15px;
  text-shadow: 0px 1px 3px rgba(0, 0, 0, 0.2);
  padding: 8px 16px;
}
.logout:hover {
  color: #d60000;
}
</style>

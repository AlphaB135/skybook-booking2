<template>
    <div class="container">
        <NavbarComponent :username="userName" />

        <div class="success-page">
            <h2 class="title">การจองสำเร็จ</h2>
            <p class="subtitle">เที่ยวบินของคุณได้รับการยืนยันแล้ว</p>

            <TicketCard />

            <button class="back-btn" @click="$router.push('/')">
            จองเที่ยวบินใหม่
            </button>

        </div>
    </div>
  
</template>

<script>
import NavbarComponent from "../components/NavbarComponent.vue";
import TicketCard from "../components/TicketCard.vue";

export default {
  name: "SuccessView",

  components: {
    NavbarComponent,
    TicketCard
  },

  computed: {
    from() { return this.$route.query.from; },
    to() { return this.$route.query.to; },
    depart() { return this.$route.query.depart; },
    arrive() { return this.$route.query.arrive; },
    date() { return this.$route.query.date; },
    seat() { return this.$route.query.seat; },
    price() { return this.$route.query.price; }
  }
}
</script>

<style scoped>
.container {
  width: screen-width;
  background-color: #ffffff;
  font-family: "Roboto", sans-serif;
}
.success-page {
  width: 70%;
  margin: 60px auto;
  text-align: center;
  font-family: 'Prompt', sans-serif;
}

.title {
  font-size: 26px;
  color: #1d4ed8;
  margin-bottom: 5px;
}

.subtitle {
  color: #6b7280;
  margin-bottom: 30px;
}

.back-btn {
  margin-top: 30px;
  background: #1D4ED8;
  color: white;
  padding: 14px 50px;
  border-radius: 5px;
  border: none;
  font-size: 12px;
  width: 100%;
}

.back-btn:hover {
  background: #173a9a;
}
</style>

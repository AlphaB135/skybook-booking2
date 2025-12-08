<template>
  <div class="container">
    <NavbarComponent :username="userName" />

    <HeroSection />

    <BookingComponent />

  </div>
</template>

<script>
import NavbarComponent from "../components/NavbarComponent.vue";
import HeroSection from "../components/HeroSection.vue";
import BookingComponent from "../components/BookingComponent.vue";

export default {
  components: {
    NavbarComponent,
    HeroSection,
    BookingComponent,
  },

  data() {
    return {
      userName: "Somchai Jaidee",
    };
  },
};
</script>

<style scoped>
.container {
  width: screen-width;
  background-color: #ffffff;
  font-family: "Roboto", sans-serif;
}
</style>

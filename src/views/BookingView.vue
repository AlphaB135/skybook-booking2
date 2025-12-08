<template>
  <div class="container">
    <NavbarComponent :username="userName" />

  </div>
</template>

<script>
import NavbarComponent from "../components/NavbarComponent.vue";

export default {
  components: {
    NavbarComponent,
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

<template>
  <div class="hero">
    <div class="content">
      <h1>Find And Book</h1>
      <h1>A Great Experience</h1>

      <img src="../assets/flight.png" alt="flight image" />
    </div>
  </div>
</template>

<script>
export default {
  name: "HeroSection",
};
</script>

<style scoped>
.hero {
  width: 100%;
  display: flex;
  justify-content: center;
}

.content {
  text-align: center;
  padding-top: 70px;
}

h1 {
  font-size: 45px;
  font-weight: bolder;
  margin: 0;
  color: #000000;
}

img {
  width: 90%;
  border-radius: 25px;
  margin-top: 10px;
  margin-bottom: 80px;
  object-fit: cover;
  display: block;
  margin-left: auto;
  margin-right: auto;
}
</style>

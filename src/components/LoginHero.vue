<template>
  <div class="hidden lg:block w-full overflow-hidden">
    <img
      :src="heroImage"
      alt="Skybook Airlines"
      class="w-full h-auto block object-cover"
    />
  </div>
</template>

<script setup>
import heroImage from '../assets/Group 10.png'
</script>

<style scoped>
.mask-container {
  /* 
    SVG Path: M 0,0 L 100,0 Q 92,50 85,100 L 0,100 Z
    This defines the visible area (opaque).
    Top-Left -> Top-Right -> Curve to Bottom-Right -> Bottom-Left -> Close
  */
  -webkit-mask-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' preserveAspectRatio='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M 0,0 L 100,0 Q 92,50 85,100 L 0,100 Z' fill='black' /%3E%3C/svg%3E");
  mask-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' preserveAspectRatio='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M 0,0 L 100,0 Q 92,50 85,100 L 0,100 Z' fill='black' /%3E%3C/svg%3E");
  -webkit-mask-size: 100% 100%;
  mask-size: 100% 100%;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
}
</style>

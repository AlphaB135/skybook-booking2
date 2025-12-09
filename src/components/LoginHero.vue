<template>
  <div class="hidden lg:block relative w-full h-full min-h-[600px] rounded-l-3xl overflow-hidden">
    <div class="w-full h-full relative mask-container">
      <img
        src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074&auto=format&fit=crop"
        alt="Airplane wing at sunset"
        class="absolute inset-0 w-full h-full object-cover"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
    </div>
  </div>
</template>

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


<script>
export default {
  name: 'LoginHero'
}
</script>

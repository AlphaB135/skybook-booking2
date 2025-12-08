<template>
  <div class="hidden lg:block relative w-full h-full min-h-[600px] overflow-hidden bg-slate-900">
    <!-- Background Image with Zoom Effect -->
    <div class="absolute inset-0">
      <img
        src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074&auto=format&fit=crop"
        alt="Airplane wing at sunset"
        class="w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-1000 ease-out"
      />
      <!-- Gradient Overlays -->
      <div class="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-transparent to-transparent"></div>
      <div class="absolute inset-0 bg-gradient-to-r from-blue-900/40 to-transparent"></div>
    </div>

    <!-- Content Overlay -->
    <div class="absolute bottom-0 left-0 p-12 text-white z-10">
      <h2 class="text-4xl font-bold mb-4 leading-tight">
        Discover the World <br/> with Comfort
      </h2>
      <p class="text-blue-100 text-lg max-w-md mb-8">
        Experience premium travel with Skybook Airlines. 
        Your journey begins the moment you book.
      </p>
      
      <!-- Decorative Elements -->
      <div class="flex gap-4">
        <div class="w-12 h-1 bg-orange-500 rounded-full"></div>
        <div class="w-4 h-1 bg-white/50 rounded-full"></div>
        <div class="w-4 h-1 bg-white/50 rounded-full"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginHero'
}
</script>

<style scoped>
/* No extra CSS needed, using Tailwind */
</style>

<template>
  <div class="profile-hero relative w-full mb-8">
    <!-- Background Image (Full Width, Auto Height) -->
    <img src="../assets/image.png" alt="Profile Background" class="w-full h-auto block" />
    
    <!-- Content Overlay -->
    <div class="absolute inset-0 flex items-center p-8 sm:p-12">
      <div class="max-w-2xl">
        <h1 class="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
          ข้อมูลผู้ใช้
        </h1>
        <p class="text-lg text-slate-600 mb-8 max-w-md">
          จัดการข้อมูลส่วนตัวและดูประวัติการจองของคุณได้อย่างง่ายดาย
        </p>
        
        <button 
          @click="$emit('back')"
          class="group flex items-center gap-2 px-6 py-3 bg-white border-2 border-yellow-400 text-yellow-500 font-bold rounded-full hover:bg-yellow-50 transition-all shadow-sm"
        >
          <span class="text-xl font-bold">&lt;&lt;</span> จองเที่ยวบิน
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProfileHero',
  emits: ['back']
}
</script>

<style scoped>
/* Removed fixed min-height to let image define height */
</style>

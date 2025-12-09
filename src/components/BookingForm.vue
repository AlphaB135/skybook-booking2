<template>
  <div class="bg-white p-6 rounded-xl shadow-lg border border-slate-100">
    <form @submit.prevent="handleSearch" class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <!-- From -->
      <div class="space-y-2">
        <label class="block text-sm font-medium text-slate-700">จาก</label>
        <div class="relative">
          <input 
            v-model="searchString.from"
            type="text" 
            placeholder="จังหวัดต้นทาง"
            class="w-full px-4 py-3 pl-10 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <span class="absolute left-3 top-3.5 text-slate-400">🛫</span>
        </div>
      </div>

      <!-- To -->
      <div class="space-y-2">
        <label class="block text-sm font-medium text-slate-700">ถึง</label>
        <div class="relative">
          <input 
            v-model="searchString.to"
            type="text" 
            placeholder="จังหวัดปลายทาง"
            class="w-full px-4 py-3 pl-10 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <span class="absolute left-3 top-3.5 text-slate-400">🛬</span>
        </div>
      </div>

      <!-- Date -->
      <div class="space-y-2">
        <label class="block text-sm font-medium text-slate-700">วันที่เดินทาง</label>
        <input 
          v-model="searchString.date"
          type="date"
          class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      <!-- Button -->
      <div class="flex items-end">
        <button 
          type="submit"
          class="w-full px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all shadow-md active:scale-95"
        >
          ค้นหาเที่ยวบิน
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "BookingForm",
  emits: ['search-flight'],
  data() {
    return {
      searchString: {
        from: '',
        to: '',
        date: '',
        passengers: 1
      }
    }
  },
  methods: {
    handleSearch() {
      this.$emit('search-flight', this.searchString);
    }
  }
};
</script>

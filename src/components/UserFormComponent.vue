<template>
  <div class="bg-white rounded-2xl shadow-sm border border-blue-100 p-6 mb-6">
    <div class="flex flex-col md:flex-row gap-8">
      <!-- Left Decorative Image -->
      <div class="md:w-1/3">
        <div class="h-full min-h-[300px] rounded-xl overflow-hidden relative">
          <img
            src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074&auto=format&fit=crop"
            alt="Sunset view from airplane window"
            class="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </div>

      <!-- Right Form Content -->
      <div class="md:w-2/3">
        <h2 class="text-2xl font-bold text-slate-900 mb-6">ประวัติผู้ใช้</h2>
        
        <div class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1">ชื่อ :</label>
              <div class="bg-slate-100 px-4 py-2 rounded-lg text-slate-800">
                {{ user?.name?.split(' ')[0] || '-' }}
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1">นามสกุล :</label>
              <div class="bg-slate-100 px-4 py-2 rounded-lg text-slate-800">
                {{ user?.name?.split(' ').slice(1).join(' ') || '-' }}
              </div>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-slate-700 mb-1">อีเมล :</label>
            <div class="bg-slate-100 px-4 py-2 rounded-lg text-slate-800">
              - <!-- Email not available in current schema -->
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-slate-700 mb-1">เบอร์ติดต่อ :</label>
            <div class="bg-slate-100 px-4 py-2 rounded-lg text-slate-800">
              {{ user?.phone || '-' }}
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-slate-700 mb-1">เลขประจำตัวประชาชน :</label>
            <div class="bg-slate-100 px-4 py-2 rounded-lg text-slate-800">
              {{ user?.idCard || '-' }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserFormComponent',
  props: {
    user: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>

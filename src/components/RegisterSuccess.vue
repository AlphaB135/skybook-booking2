<template>
  <div class="max-w-2xl mx-auto">
    <div class="bg-white rounded-xl shadow-lg border-2 border-blue-200 p-8">
      <div class="text-center mb-6">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4">
          <Check class="w-8 h-8 text-orange-600" />
        </div>
        <h2 class="text-3xl font-bold text-blue-700 mb-2">บันทึกข้อมูลสำเร็จ</h2>
        <p class="text-slate-600">ข้อมูลของคุณถูกบันทึกเรียบร้อยแล้ว</p>
      </div>

      <div class="bg-yellow-50 rounded-lg border-2 border-yellow-200 p-6 mb-6 space-y-3">
        <div class="flex justify-between">
          <span class="text-sm font-medium text-blue-700">ชื่อ-นามสกุล:</span>
          <span class="text-sm text-slate-900">{{ currentUser.name }}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-sm font-medium text-blue-700">เบอร์โทรศัพท์:</span>
          <span class="text-sm text-slate-900">{{ currentUser.phone }}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-sm font-medium text-blue-700">เลขบัตรประชาชน:</span>
          <span class="text-sm text-slate-900">{{ currentUser.idCard }}</span>
        </div>
      </div>

      <button
        @click="$emit('continue')"
        class="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-orange-500 text-white font-medium rounded-lg hover:from-blue-700 hover:to-orange-600 transition-all shadow-md hover:shadow-lg"
      >
        ดำเนินการจองเที่ยวบิน
      </button>
    </div>
  </div>
</template>

<script>
import { Check } from 'lucide-vue-next'

export default {
  name: 'RegisterSuccess',
  components: {
    Check
  },
  props: {
    currentUser: {
      type: Object,
      required: true
    }
  },
  emits: ['continue']
}
</script>

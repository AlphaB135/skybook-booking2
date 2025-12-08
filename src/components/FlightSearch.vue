<template>
  <div class="bg-white rounded-xl shadow-lg border-2 border-blue-200 p-6 mb-6">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div>
        <label class="block text-sm font-medium text-blue-700 mb-2">จุดหมายปลายทาง</label>
        <select
          :value="modelValue.destination"
          @input="updateFilter('destination', $event.target.value)"
          class="w-full px-4 py-2 border-2 border-blue-200 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
        >
          <option value="">ทั้งหมด</option>
          <option value="domestic">ในประเทศ</option>
          <option value="international">ต่างประเทศ</option>
        </select>
      </div>
      <div>
        <label class="block text-sm font-medium text-blue-700 mb-2">ประเภท</label>
        <select
          :value="modelValue.class"
          @input="updateFilter('class', $event.target.value)"
          class="w-full px-4 py-2 border-2 border-blue-200 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
        >
          <option value="">ทั้งหมด</option>
          <option value="economy">Economy</option>
          <option value="business">Business</option>
          <option value="first">First Class</option>
        </select>
      </div>
      <div>
        <label class="block text-sm font-medium text-blue-700 mb-2">ราคา</label>
        <select
          :value="modelValue.priceRange"
          @input="updateFilter('priceRange', $event.target.value)"
          class="w-full px-4 py-2 border-2 border-blue-200 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
        >
          <option value="">ทั้งหมด</option>
          <option value="low">น้อยกว่า 5,000 บาท</option>
          <option value="medium">5,000 - 15,000 บาท</option>
          <option value="high">มากกว่า 15,000 บาท</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FlightSearch',
  props: {
    modelValue: {
      type: Object,
      required: true
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    function updateFilter(key, value) {
      emit('update:modelValue', {
        ...props.modelValue,
        [key]: value
      })
    }

    return {
      updateFilter
    }
  }
}
</script>

<style scoped>
select:focus {
  outline: none;
}
</style>

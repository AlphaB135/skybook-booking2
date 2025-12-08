<template>
  <div class="booking">
    <div class="cont">
      <h1>จองเที่ยวบิน</h1>
      <p>กรอกรายละเอียดและเลือกเที่ยวบินที่คุณต้องการ</p>

      <!-- ฟอร์มค้นหาเที่ยวบิน -->
      <div>
        <!-- รับ event @search-flight จาก BookingForm เมื่อกดปุ่มค้นหา -->
        <BookingForm @search-flight="handleSearch" />
      </div>

      <!-- ส่วนแสดงผลลัพธ์การค้นหา (แสดงเมื่อมีข้อมูล) -->
      <div v-if="hasSearched" class="mt-8">
        <div v-if="filteredFlights.length > 0">
          <FlightCard 
            :flights="filteredFlights"
            :data="formData"
            @select="$emit('select-flight', $event)"
          />
        </div>
        <div v-else class="text-center text-gray-500 py-8">
          ไม่พบเที่ยวบินที่คุณค้นหา
        </div>
      </div>
      
    </div>
  </div>
</template>

<script>
import BookingForm from "./BookingForm.vue";
import FlightCard from "./FlightCard.vue"; 

export default { 
    name: "BookingComponent", 
    
    components: { 
        BookingForm,
        FlightCard 
    },

    props: {
      allFlights: {
        type: Array,
        default: () => []
      }
    },

    emits: ['select-flight'], 
    
    data() {
        return {
            formData: null,      // เก็บข้อมูลการค้นหาเพื่อส่งให้ FlightCard
            filteredFlights: [], // เก็บรายการเที่ยวบินที่กรองแล้ว
            hasSearched: false   // ตัวแปรเช็คว่ากดค้นหาหรือยัง
        };
    },

    methods: {
      // ฟังก์ชันทำงานเมื่อกดปุ่มค้นหา
      handleSearch(criteria) {
        this.hasSearched = true;
        this.formData = criteria; // เก็บข้อมูลการค้นหา (เผื่อใช้แสดง header)
        console.log("ค้นหาด้วยเงื่อนไข:", criteria);

        // กรองข้อมูลเที่ยวบินตามเงื่อนไข
        this.filteredFlights = this.allFlights.filter(flight => {
          // ถ้ามีการเลือกจังหวัดต้นทาง ให้เช็คว่าตรงไหม (ถ้าไม่เลือกถือว่าผ่าน)
          const matchFrom = criteria.from ? flight.from_city.includes(criteria.from.split(' ')[0]) : true;
          // ถ้ามีการเลือกจังหวัดปลายทาง ให้เช็คว่าตรงไหม
          const matchTo = criteria.to ? flight.to_city.includes(criteria.to.split(' ')[0]) : true;
          
          return matchFrom && matchTo;
        });

        // ถ้าไม่ได้เลือกอะไรเลย ให้โชว์ทั้งหมด
        if (!criteria.from && !criteria.to) {
           this.filteredFlights = this.allFlights;
        }
      }
    }
};
</script>

<style scoped>
.booking {
  width: 100%;
  padding: 20px;
  font-family: "Roboto", sans-serif;
}
.cont {
  width: 90%;
  margin: 0 auto;
}
h1 {
  font-size: 30px;
  font-weight: bold;
  color: #1d4ed8;
  margin: 0;
}
p {
  font-size: 22px;
  color: #000000;
}
</style>

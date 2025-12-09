<template>
      <div class="booking">
    <div class="cont">
      <h1>จองเที่ยวบิน</h1>
      <p>กรอกรายละเอียดและเลือกเที่ยวบินที่คุณต้องการ</p>

      <!-- ฟอร์มค้นหาเที่ยวบิน -->
      <div>
        <!-- รับ event @search-flight จาก BookingForm เมื่อกดปุ่มค้นหา -->
        <BookingForm 
          @search-flight="handleSearch" 
          :origins="uniqueOrigins"
          :destinations="uniqueDestinations"
        />
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

    computed: {
      // 1. หาจังหวัดต้นทางทั้งหมดที่มีในระบบ (ไม่เอาตัวซ้ำ)
      uniqueOrigins() {
        // ดึงชื่อสนามบิน/จังหวัด จากข้อมูลเที่ยวบินทั้งหมด
        const cities = this.allFlights.map(f => f.departure.airport)
        // ใช้ Set เพื่อตัดตัวซ้ำออก แล้วแปลงกลับเป็น Array
        return [...new Set(cities)]
      },

      // 2. หาจังหวัดปลายทางทั้งหมดที่มีในระบบ (ไม่เอาตัวซ้ำ)
      uniqueDestinations() {
        // ดึงชื่อสนามบิน/จังหวัด จากข้อมูลเที่ยวบินทั้งหมด
        const cities = this.allFlights.map(f => f.arrival.airport)
        // ใช้ Set เพื่อตัดตัวซ้ำออก แล้วแปลงกลับเป็น Array
        return [...new Set(cities)]
      }
    },

    methods: {
      // 3. ฟังก์ชันค้นหา: ทำงานเมื่อกดปุ่ม "ค้นหาเที่ยวบิน"
      handleSearch(criteria) {
        this.hasSearched = true;     // บอกระบบว่า "กดค้นหาแล้วนะ"
        this.formData = criteria;    // เก็บสิ่งที่ User เลือกไว้
        
        console.log("กำลังค้นหา:", criteria);

        // เริ่มการกรองข้อมูล (Filter)
        this.filteredFlights = this.allFlights.filter(flight => {
          
          // เช็คต้นทาง: ถ้า User เลือกมา ต้องตรงกับข้อมูลเที่ยวบิน (ถ้าไม่เลือก ถือว่าผ่าน)
          const matchFrom = criteria.from ? flight.departure.airport === criteria.from : true;
          
          // เช็คปลายทาง: ถ้า User เลือกมา ต้องตรงกับข้อมูลเที่ยวบิน
          const matchTo = criteria.to ? flight.arrival.airport === criteria.to : true;
          
          // ต้องตรงทั้ง 2 อย่าง (ต้นทาง และ ปลายทาง) ถึงจะผ่าน
          return matchFrom && matchTo;
        });

        // กรณีพิเศษ: ถ้าไม่ได้เลือกอะไรเลย ให้โชว์ทั้งหมด
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

<template>
  <div class="booking-form">
    <div class="tabs">
      <button class="tab" :class="{ active: activeTab === 'oneway' }" @click="activeTab = 'oneway'" >
        เที่ยวเดียว
      </button>

      <button class="tab" :class="{ active: activeTab === 'round' }" @click="activeTab = 'round'" >
        ไป-กลับ
      </button>
    </div>

    <form>
      <select class="select" v-model="fromAirport">
        <option disabled value="">เลือกสนามบินต้นทาง</option>
        <option>สนามบินสุวรรณภูมิ (BKK)</option>
        <option>สนามบินดอนเมือง (DMK)</option>
        <option>สนามบินสุราษฎร์ธานี (URT)</option>
        <option>สนามบินเชียงใหม่ (CNX)</option>
        <option>สนามบินขอนแก่น (KKC)</option>
      </select>

      <select class="select" v-model="toAirport">
        <option disabled value="">เลือกสนามบินปลายทาง</option>
        <option>สนามบินสุวรรณภูมิ (BKK)</option>
        <option>สนามบินดอนเมือง (DMK)</option>
        <option>สนามบินสุราษฎร์ธานี (URT)</option>
        <option>สนามบินเชียงใหม่ (CNX)</option>
        <option>สนามบินขอนแก่น (KKC)</option>
      </select>

      <div class="oneway-dates" v-if="activeTab === 'oneway'">
        <span v-if="!departDate" class="date-placeholder">
          เลือกวันที่เดินทาง
        </span>
        <input type="date" class="select date-input" v-model="departDate" :class="{ hasValue: departDate }" />
      </div>

      <div class="round-dates" v-if="activeTab === 'round'">
        <span v-if="!departDate" class="date-placeholder">
          เลือกวันที่เดินทางไป
        </span>
        <input type="date" class="select date-input" v-model="departDate" :class="{ hasValue: departDate }" />
      </div>

      <div class="round-dates" v-if="activeTab === 'round'">
        <span v-if="!returnDate" class="date-placeholder">
          เลือกวันที่เดินทางกลับ
        </span>
        <input type="date" class="select date-input" v-model="returnDate" :class="{ hasValue: returnDate }" />
      </div>

      <div class="selector-box">
        <div class="selector-header" @click="isOpen = !isOpen" type="button">
          <p>เลือกประเภท และจำนวนผู้โดยสาร</p>
          <span>{{ isOpen ? "▲" : "▼" }}</span>
        </div>

        <div v-if="isOpen" class="selector-content">
          <!-- cabin class buttons -->
          <div class="cabin-row">
            <button type="button" v-for="item in seatTypes" :key="item.value" class="cabin-btn" :class="{ active: seat === item.value }" @click="seat = item.value">
              {{ item.text }}
            </button>
          </div>

          <div class="line"></div>

          <!-- passenger rows -->
          <div class="passenger-row" v-for="(item, i) in passengers" :key="i">
            <div class="passenger-info">
              <p class="title">{{ item.label }}</p>
              <span class="sub">{{ item.desc }}</span>
            </div>

            <!-- counter -->
            <div class="passenger-counter">
              <button type="button" class="circle" :disabled="item.count === 0" @click="item.count--">
                −
              </button>

              <span class="count">{{ item.count }}</span>

              <button type="button" class="circle" @click="item.count++">
                +
              </button>
            </div>
          </div>
        </div>
      </div>

      <button class="submit-btn" type="button" @click="submitForm">
        ดูราคา
      </button>

    </form>
  </div>
</template>

<script>
export default {
  name: "BookingForm",

  data() {
    return {
      activeTab: "oneway",
      isOpen: false,
      seat: "",

      departDate: "",
      returnDate: "",

      fromAirport: "",
      toAirport: "",


      seatTypes: [
        { text: "ชั้นประหยัด", value: "eco" },
        { text: "ชั้นประหยัดพรีเมียม", value: "ecoPlus" },
        { text: "ชั้นธุรกิจ", value: "biz" },
        { text: "ชั้นเฟิร์สคลาส", value: "first" },
      ],

      passengers: [
        { label: "ผู้ใหญ่", desc: "(มากกว่า 11 ปี)", count: 0 },
        { label: "เด็ก", desc: "(อายุ 2-11 ปี)", count: 0 },
        { label: "ทารก", desc: "(ต่ำกว่า 2 ปี)", count: 0 },
      ],
    };
  },

  methods: {
    submitForm() {
        const payload = {
            activeTab: this.activeTab,
            from: this.fromAirport,
            to: this.toAirport,
            departDate: this.departDate,
            returnDate: this.returnDate,
            seat: this.seat,
            passengers: this.passengers,
        };

        this.$emit("search-flight", payload);
    },
  },
};
</script>

<style scoped>
.booking-form {
  width: 90%;
  background: #ffffff;
  margin: auto;
  padding: 25px 40px;
  margin-top: 50px;
  border-radius: 20px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  border: 1px solid #9ca3af;
  font-family: "Roboto", sans-serif;
}

/* ---------------- TAB ---------------- */
.tabs {
  display: flex;
  margin-bottom: 20px;
}

.tab {
  flex: 1;
  padding: 14px;
  background: none;
  border: none;
  font-size: 18px;
  color: #9ca3af;
  border-bottom: 3px solid #9ca3af;
  transition: 0.25s;
}

.tab.active {
  color: #1d4ed8;
  font-weight: bold;
  border-bottom: 3px solid #1d4ed8;
}

/* ---------------- FORM ITEMS ---------------- */
form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.select {
  width: 100%;
  height: 50px;
  padding: 0 15px;
  border-radius: 50px;
  border: 1px solid #1d4fd81a;
  background: #1d4fd81a;
  font-size: 15px;
  color: #7d8187;
}

/* ---------------- DATE (เที่ยวเดียว) ---------------- */
.oneway-dates,
.round-dates {
  position: relative;
  width: 100%;
  display: flex;
}

.date-placeholder {
  position: absolute;
  left: 20px;
  top: 14px;
  font-size: 15px;
  color: #7d8187;
  pointer-events: none;
}

.date-input {
  width: 100%;
  height: 50px;
  padding: 0 15px;
  border-radius: 50px;
  border: 1px solid #1d4fd81a;
  background: #1d4fd81a;
  font-size: 15px;

  /* ซ่อนวันที่จนกว่าจะเลือก */
  color: transparent;
}

/* ถ้าเลือกวันที่แล้ว → ข้อความวันที่โชว์ */
.date-input.hasValue {
  color: #7d8187;
}

/* ---------------- DATE (ไปกลับ) ---------------- */
.round-dates {
  display: flex;
  width: 100%;
}

/* ---------------- PASSENGER BOX ---------------- */
.selector-box {
  width: 100%;
  border: 1px solid #1d4fd81a;
  border-radius: 18px;
  overflow: hidden;
  font-family: sans-serif;
}

/* header */
.selector-header {
  padding: 14px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  font-size: 15px;
  background: #1d4fd81a;
  font-weight: 500;
}

p,
span {
  font-size: 15px;
  color: #7d8187;
}

/* content */
.selector-content {
  background: #ffffff;
  padding: 18px;
}

/* cabin btn row */
.cabin-row {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

.cabin-btn {
  height: 42px;
  border-radius: 22px;
  border: 1px solid #9ca3af;
  background: #ffffff;
  text-align: center;
  font-size: 14px;
  color: #9ca3af;
  transition: 0.2s;
}

.cabin-btn.active {
  background: #1d4fd81a;
  border-color: #1d4ed8;
  color: #1d4ed8;
}

/* separator */
.line {
  height: 6px;
  background: #1d4fd81a;
  margin: 20px 0;
}

/* passenger row */
.passenger-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 0;
  border-bottom: 1px solid #1d4fd81a;
}

.passenger-row:last-child {
  border-bottom: none;
}

.passenger-info .title {
  font-weight: 600;
  margin: 0 0 2px 0;
  color: black;
}

.passenger-info .sub {
  color: #6b7280;
  font-size: 12px;
}

/* counter */
.passenger-counter {
  display: flex;
  align-items: center;
  gap: 16px;
}

.circle {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  border: none;
  background: #e5e7eb;
  font-size: 20px;
  transition: 0.15s;
}

.circle:disabled {
  opacity: 0.35;
}

.circle:hover:not(:disabled) {
  background: #d1d5db;
}

.count {
  width: 18px;
  text-align: center;
  font-size: 16px;
  font-weight: 600;
}

/* ---------------- Submit Button ---------------- */
.submit-btn {
  margin-top: 18px;
  width: 100%;
  padding: 16px;
  border-radius: 50px;
  border: none;
  background: #1d4ed8;
  color: white;
  font-size: 16px;
  font-weight: normal;
}

.submit-btn:hover {
  background: #1e40af;
}
</style>

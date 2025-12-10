<template>
  <div class="flight-list-container">
    <div v-for="flight in generatedFlights" :key="flight.id" class="flight-card">
      <div class="card-header">
        <div class="airline-info">
          <span class="badge flight-num">{{ flight.flightNumber }}</span>
          <span class="badge class-type">{{ flight.class }}</span>
        </div>
        <div class="price-info">
          <span class="price">{{ flight.price.toLocaleString() }} ฿</span>
        </div>
      </div>

      <div class="flight-route">
        <div class="time-loc">
          <p class="time">{{ flight.departure.time }}</p>
          <p class="city">{{ flight.departure.city }}</p>
          <p class="airport">{{ flight.departure.airport }}</p>
        </div>

        <div class="duration-line">
          <div class="line"></div>
          <span class="duration">{{ flight.duration }}</span>
          <div class="line"></div>
        </div>

        <div class="time-loc">
          <p class="time">{{ flight.arrival.time }}</p>
          <p class="city">{{ flight.arrival.city }}</p>
          <p class="airport">{{ flight.arrival.airport }}</p>
        </div>
      </div>

      <div class="card-footer">
        <div class="details">
          <span>{{ flight.date }}</span>
          <span> ว่าง {{ flight.seats }} ที่นั่ง</span>
        </div>
        <button class="select-btn" @click="$emit('select', flight)">
          เลือก
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FlightCard',
  props: {
    flights: {
      type: Array,
      default: () => []
    },
    data: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    generatedFlights() {
      // Use the passed flights prop instead of internal mock data
      return this.flights.map((f, i) => ({
        id: f.id,
        // Map fields from API response (which has nested departure/arrival objects)
        flightNumber: f.flightNumber || ('DD' + (150 + i)), 
        class: f.class || this.data?.seat || 'Economy',
        price: f.price || (860 + i * 100 + (this.data?.passengers?.reduce((s, p) => s + p.count, 0) || 1) * 200),
        duration: f.duration || '2 ชม.',
        date: f.date || this.data?.departDate || '15 ธันวาคม 2567',
        seats: f.seats || (12 - i),
        departure: {
          time: f.departure?.time || f.depart, 
          city: f.departure?.city || this.data?.from || 'กรุงเทพ',
          airport: f.departure?.airport || (this.data?.from || 'BKK') + ' (DMK)'
        },
        arrival: {
          time: f.arrival?.time || f.arrive,
          city: f.arrival?.city || this.data?.to || 'เชียงใหม่',
          airport: f.arrival?.airport || (this.data?.to || 'CNX') + ' (CNX)'
        },
        from_city: f.from_city, // Pass these through so they exist in History
        to_city: f.to_city
      }));
    }
  },
  emits: ['select']
}
</script>

<style scoped>
.flight-card {
  background: white;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  border: 1px solid #e2e8f0;
  margin-bottom: 16px;
  transition: transform 0.2s, box-shadow 0.2s;
}

.flight-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(0,0,0,0.1);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.badge {
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  margin-right: 8px;
}

.flight-num {
  background: #dbeafe;
  color: #1e40af;
}

.class-type {
  background: #ffedd5;
  color: #c2410c;
}

.price {
  font-size: 24px;
  font-weight: bold;
  color: #ea580c;
}

.flight-route {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.time-loc {
  text-align: center;
}

.time {
  font-size: 20px;
  font-weight: bold;
  color: #1e3a8a;
}

.city {
  font-size: 14px;
  color: #475569;
}

.airport {
  font-size: 12px;
  color: #94a3b8;
}

.duration-line {
  flex: 1;
  display: flex;
  align-items: center;
  padding: 0 20px;
  color: #64748b;
  font-size: 12px;
}

.line {
  flex: 1;
  height: 1px;
  background: #cbd5e1;
}

.duration {
  margin: 0 10px;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid #f1f5f9;
}

.details {
  display: flex;
  gap: 16px;
  font-size: 14px;
  color: #64748b;
}

.select-btn {
  background: #2563eb;
  color: white;
  border: none;
  padding: 8px 24px;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: opacity 0.2s;
}

.select-btn:hover {
  opacity: 0.9;
}
</style>

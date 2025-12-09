<template>
  <div class="ticket-card">

                <div class="header">
                    <div class="logo-container">
                        <img src="../assets/logobg.png" class="logo" />
                        <p>Skybook Airlines</p>
                    </div>
                    
                    <div class="e-ticket">E-TICKET</div>
                </div>

                <div class="info-row top-info">
                    <div>
                    <label>PASSENGER</label>
                    <div class="data">{{ passengerName }}</div>
                    </div>

                    <div>
                    <label>FLIGHT</label>
                    <div class="data">{{ flight?.flightNumber || 'FD4213' }}</div>
                    </div>

                    <div>
                    <label>CLASS</label>
                    <div class="data">{{ flight?.class || 'Economy' }}</div>
                    </div>
                </div>

                <hr/>

                <div class="flight-section">
                    <div class="from">
                    <div class="big">{{ flight?.departure?.city || 'BKK' }}</div>
                    <div class="small">ต้นทาง</div>
                    <div class="time">{{ flight?.departure?.time || '10:00' }}</div>
                    <div class="date">{{ flight?.date || '15 Dec 2025' }}</div>
                    </div>

                    <div class="plane-icon">✈️</div>

                    <div class="to">
                    <div class="big">{{ flight?.arrival?.city || 'CNX' }}</div>
                    <div class="small">ปลายทาง</div>
                    <div class="time">{{ flight?.arrival?.time || '12:00' }}</div>
                    <div class="date">{{ flight?.date || '15 Dec 2025' }}</div>
                    </div>
                </div>

                <hr/>

                <div class="price-row">
                    <div>
                    <label>TOTAL FARE</label>
                    <div class="total">{{ flight?.price?.toLocaleString() || '0' }} THB</div>
                    </div>

                    <img src="../assets/QR.svg" class="qr"/>
                </div>

            </div>
</template>

<script>
export default {
    name: "TicketCard",
    props: {
        flight: {
            type: Object,
            default: () => ({})
        },
        passengerName: {
            type: String,
            default: 'SOMCHAI JAIDEE'
        }
    }
}
</script>

<style scoped>
.ticket-card {
  background: white;
  padding: 30px;
  border-radius: 12px;
  border: 2px solid #dbeafe;
  box-shadow: 0 3px 10px #e5e7eb;
}

.header {
  display: flex;
  justify-content: space-between;
  background: #1d4ed8;
  color: white;
  padding: 30px;
  border-radius: 8px;
}

.logo-container {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: bold;
  font-size: 16px;
}

.logo {
  width: 50px;
  border-radius: 100%;
}

.e-ticket {
  font-size: 14px;
  font-weight: bold;
  margin-top: 5px;
}

.info-row {
  display: flex;
  justify-content: space-between;
  margin: 25px 0 15px;
}

label {
  font-size: 13px;
  color: #6b7280;
}

.data {
  font-size: 14px;
  font-weight: 700;
}

.flight-section {
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
}

.big {
  font-size: 25px;
  font-weight: bold;
  color: #1d4ed8;
}

.time {
  font-size: 20px;
  margin-top: 5px;
}

.date {
  font-size: 13px;
  color: #6b7280;
}

.plane-icon {
  font-size: 25px;
  margin-top: 20px;
}

.price-row {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.total {
  font-size: 22px;
  color: #d00000;
  font-weight: bold;
  margin-top: 5px;
}

.qr {
  width: 70px;
}

</style>
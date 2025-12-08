const mysql = require('mysql2/promise');

// กูเพิ่มสายการบิน Inter ดังๆ ให้ด้วย จะได้ดูหลากหลาย
const airlines = [
  // Thai & Low Cost
  { code: 'TG', name: 'Thai Airways', type: 'full' },
  { code: 'FD', name: 'Thai AirAsia', type: 'low' },
  { code: 'PG', name: 'Bangkok Airways', type: 'full' },
  { code: 'DD', name: 'Nok Air', type: 'low' },
  { code: 'VZ', name: 'Thai Vietjet Air', type: 'low' },
  // International
  { code: 'SQ', name: 'Singapore Airlines', type: 'full' },
  { code: 'EK', name: 'Emirates', type: 'full' },
  { code: 'JL', name: 'Japan Airlines', type: 'full' },
  { code: 'KE', name: 'Korean Air', type: 'full' },
  { code: 'CX', name: 'Cathay Pacific', type: 'full' }
];

// แยกเมืองไทยกับเมืองนอก จะได้จับคู่ถูก
const citiesDomestic = [
  'กรุงเทพฯ (BKK)', 'กรุงเทพฯ (DMK)', 'เชียงใหม่ (CNX)', 'ภูเก็ต (HKT)',
  'หาดใหญ่ (HDY)', 'กระบี่ (KBV)', 'สุราษฎร์ธานี (URT)', 'อุบลราชธานี (UBP)',
  'อุดรธานี (UTH)', 'เชียงราย (CEI)', 'ขอนแก่น (KKC)', 'สมุย (USM)'
];

const citiesInternational = [
  'Singapore (SIN)', 'Tokyo (NRT)', 'Tokyo (HND)', 'Seoul (ICN)', 
  'London (LHR)', 'Dubai (DXB)', 'Hong Kong (HKG)', 'Osaka (KIX)',
  'Paris (CDG)', 'New York (JFK)', 'Sydney (SYD)'
];

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomTime() {
  const hour = getRandomInt(0, 23); 
  const minute = getRandomInt(0, 11) * 5; 
  return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}:00`;
}

function generateFlights(count) {
  const flights = [];
  
  for (let i = 0; i < count; i++) {
    // สุ่มว่าจะบินแบบไหน: 0 = ในประเทศ, 1 = ขาออก, 2 = ขาเข้า
    const flightType = getRandomInt(0, 2); 
    
    let fromCity, toCity, airline;
    let basePrice = 0;

    if (flightType === 0) {
      // --- Domestic Flight (Thai -> Thai) ---
      fromCity = citiesDomestic[getRandomInt(0, citiesDomestic.length - 1)];
      toCity = citiesDomestic[getRandomInt(0, citiesDomestic.length - 1)];
      while (toCity === fromCity) toCity = citiesDomestic[getRandomInt(0, citiesDomestic.length - 1)];
      
      // บินในประเทศ ส่วนใหญ่สุ่มพวกสายการบิน Low cost + Thai Airways / Bangkok Air
      // กรองเอาเฉพาะสายการบินที่มีคำว่า Thai, Nok, Bangkok
      const domesticAirlines = airlines.filter(a => ['TG', 'FD', 'PG', 'DD', 'VZ'].includes(a.code));
      airline = domesticAirlines[getRandomInt(0, domesticAirlines.length - 1)];
      
      basePrice = getRandomInt(800, 3500); // ราคาพื้นฐานในประเทศ
    } 
    else {
      // --- International Flight ---
      if (flightType === 1) { // ขาออก (Thai -> Inter)
        fromCity = citiesDomestic[getRandomInt(0, 1)]; // เอาแค่ BKK/DMK ส่วนใหญ่
        toCity = citiesInternational[getRandomInt(0, citiesInternational.length - 1)];
      } else { // ขาเข้า (Inter -> Thai)
        fromCity = citiesInternational[getRandomInt(0, citiesInternational.length - 1)];
        toCity = citiesDomestic[getRandomInt(0, 1)]; // ลง BKK/DMK
      }

      // บินอินเตอร์ สุ่มได้ทุกสายการบิน
      airline = airlines[getRandomInt(0, airlines.length - 1)];
      
      basePrice = getRandomInt(8000, 35000); // ราคาบินนอกแพงหน่อย
    }

    const flightNumber = `${airline.code}${getRandomInt(100, 999)}`;
    const departureTime = getRandomTime();
    
    // Logic เพิ่มราคาตามความหรูของสายการบิน
    if (airline.type === 'full') {
      basePrice += getRandomInt(1000, 5000);
    }
    
    // ปรับราคาให้เลขสวยๆ หน่อย (ลงท้ายด้วย 0 หรือ 9)
    const price = Math.floor(basePrice / 10) * 10; 

    flights.push([flightNumber, fromCity, toCity, departureTime, price]);
  }
  return flights;
}

async function seed() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    port: 3307,
    user: 'app_user',
    password: 'app_password',
    database: 'ticket_booking',
    charset: 'utf8mb4'
  });

  try {
    console.log('Connected to database (Modified by Gemini).');

    // กูจัดให้ 100 เที่ยวบินเลย จะได้เยอะๆ
    const flights = generateFlights(100); 
    console.log(`Generated ${flights.length} flights with mixed destinations.`);

    const sql = 'INSERT INTO flights (flight_number, from_city, to_city, departure_time, price) VALUES ?';
    await connection.query(sql, [flights]);

    console.log('Seeding completed successfully. Data is now varied!');
  } catch (err) {
    console.error('Error seeding data:', err);
  } finally {
    await connection.end();
  }
}

seed();
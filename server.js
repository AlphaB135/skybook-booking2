// ==========================================
// 1. ส่วนนำเข้าของที่ต้องใช้ (Import Libraries)
// ==========================================
const express = require('express');        // พระเอกของเรา: Express คือเครื่องมือสร้าง Web Server
const cors = require('cors');              // ตัวช่วย: อนุญาตให้เว็บอื่น (Frontend) มาขอข้อมูลได้
const mysql = require('mysql2/promise');   // ตัวช่วย: เครื่องมือคุยกับ Database (แบบ Promise/Async)

// ==========================================
// 2. การตั้งค่า Server (Configuration)
// ==========================================
const app = express();  // สร้างแอป Server ขึ้นมา 1 ตัว
const port = 3001;      // กำหนดให้รันที่ช่องทาง (Port) หมายเลข 3001

// สั่งให้ Server ใช้งานฟังก์ชันเสริม (Middleware)
app.use(cors());         // เปิดประตูให้ Frontend เข้ามาคุยได้
app.use(express.json()); // สั่งให้อ่านภาษา JSON รู้เรื่อง (เวลา Frontend ส่งข้อมูลมา)

// การตั้งค่าเชื่อมต่อฐานข้อมูล (Database Connection)
const dbConfig = {
  host: 'localhost',       // ที่อยู่ของ Database (เครื่องนี้แหละ)
  port: 3307,              // ช่องทางเชื่อมต่อ
  user: 'app_user',        // ชื่อผู้ใช้
  password: 'app_password',// รหัสผ่าน
  database: 'ticket_booking', // ชื่อก้อนข้อมูลที่เราจะเข้าไปใช้
  charset: 'utf8mb4'       // รองรับภาษาไทยสมบูรณ์แบบ
};

// ==========================================
// 3. เส้นทางรับส่งข้อมูล (API Endpoints)
// ==========================================

// --- 3.1 ดึงข้อมูลเที่ยวบิน (GET /api/flights) ---
// หน้าที่: ส่งรายชื่อเที่ยวบินทั้งหมดไปให้หน้าเว็บ
app.get('/api/flights', async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig); // 1. ต่อสายโทรศัพท์หา Database
    
    // 2. สั่งคำสั่ง SQL: "ขอก้อนข้อมูล flights ทั้งหมด เรียงตามราคาจากน้อยไปมาก"
    const [rows] = await connection.execute('SELECT * FROM flights ORDER BY price ASC');
    await connection.end(); // 3. วางสาย (สำคัญมาก! เพื่อไม่ให้สายค้าง)
    
    // 4. แปลงร่างข้อมูลให้สวยงามก่อนส่งกลับ (Format Data)
    const flights = rows.map(row => {
      
      /**
       * อธิบาย: substring(0, 5) คือการตัดคำ
       * ตัวอย่าง: ข้อมูลเราคือเวลา '08:00:00' (มี 8 ตัวอักษร)
       * 
       * ตำแหน่ง   :  0   1   2   3   4   5   6   7
       * ตัวอักษร   :  0   8   :   0   0   :   0   0
       * ผลลัพธ์    :  ✅  ✅  ✅   ✅  ✅  ❌  ❌  ❌
       * 
       * จะได้ออกมาเป็น '08:00' ครับ
       */
      
      // ตัดเวลาให้เหลือแค่ ชั่วโมง:นาที (ใช้แบบสั้นๆ ง่ายๆ)
      const time = row.departure_time?.substring(0, 5) || '00:00';

      // สร้างกล่องข้อมูลใหม่ ส่งกลับไป
      return {
        id: row.id,
        flightNumber: row.flight_number,
        class: 'Economy', 
        departure: { 
          city: row.from_city.split(' ')[0], // เอาแค่ชื่อจังหวัด "Bangkok"
          airport: row.from_city,            // เอาเต็มยศ "Bangkok (BKK)"
          time: time 
        },
        arrival: { 
          city: row.to_city.split(' ')[0], 
          airport: row.to_city, 
          time: 'XX:XX' // (สมมติไว้ก่อน)
        },
        duration: '2ชม.',
        date: '15 ธันวาคม 2567', // (สมมติไว้ก่อน) เพราะถ้าใส่ข้อมูลในฐานข้อมูลเยอะ
        price: parseFloat(row.price),
        seats: Math.floor(Math.random() * 50) + 10 // สุ่มที่นั่งว่าง *50 คือ ตั้งเเต่ 0-49
      };
    });

    res.json(flights); // 5. ส่งของกลับไปให้ frontend
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Error' }); // ถ้าพัง ให้บอกว่า Error
  }
});

// --- 3.2 สมัครสมาชิก (POST /api/register) ---
// หน้าที่: รับข้อมูลคนสมัครใหม่ แล้วเอาไปหย่อนลง Database
app.post('/api/register', async (req, res) => {
  // 1. แกะกล่องพัสดุที่ Frontend ส่งมา
  const { name, lastname, phone, idCard, password, email } = req.body;

  try {
    const connection = await mysql.createConnection(dbConfig);
    // 2. สั่ง SQL: "เอาข้อมูลพวกนี้ ไปแปะลงในตาราง users ที"
    const [result] = await connection.execute(
      'INSERT INTO users (name, lastname, phone, id_card, password, email) VALUES (?, ?, ?, ?, ?, ?)',
      [name, lastname, phone, idCard, password, email]
    );
    await connection.end();
    
    // 3. ตอบกลับว่า "โอเค เรียบร้อย"
    res.json({ success: true, userId: result.insertId });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'สมัครไม่ผ่าน' });
  }
});

// --- 3.3 เข้าสู่ระบบ (POST /api/login) ---
// หน้าที่: ตรวจสอบว่า เบอร์โทรและรหัสผ่าน ตรงกับที่มีไหม
app.post('/api/login', async (req, res) => {
  const phone = req.body.phone;
  const password = req.body.password;

  try {
    const connection = await mysql.createConnection(dbConfig);
    // 1. สั่ง SQL ค้นหา: "ช่วยหาคนที่มีเบอร์นี้ และรหัสผ่านนี้ หน่อยซิ"
    const [rows] = await connection.execute(
      'SELECT * FROM users WHERE (phone = ? OR id_card = ?) AND password = ?',
      [phone, phone, password]
    );
    await connection.end();

    // 2. ตรวจสอบผลลัพธ์
    if (rows.length > 0) {
      // ถ้าเจอตัว (Length > 0) = ล็อกอินผ่าน
      const user = rows[0];
      res.json({ 
        success: true, 
        user: { // ส่งข้อมูลเขากลับไปให้จำไว้
          id: user.id,
          name: user.name, 
          lastname: user.lastname,
          email: user.email,
          phone: user.phone,
          idCard: user.id_card
        }
      });
    } else {
      // ถ้าหาไม่เจอ = ล็อกอินไม่ผ่าน
      res.status(401).json({ error: 'รหัสผิด' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'ระบบมีปัญหา' });
  }
});

// --- 3.4 บันทึกการจอง (POST /api/bookings) ---
// หน้าที่: สร้างใบจองใหม่ลงในตาราง bookings
app.post('/api/bookings', async (req, res) => {
  const userId = req.body.userId;
  const flightId = req.body.flightId;
  const bookingReference = req.body.bookingReference;
  const seatNumber = req.body.seatNumber;

  try {
    const connection = await mysql.createConnection(dbConfig);
    // สั่ง SQL Insert เหมือนเดิม
    const [result] = await connection.execute(
      'INSERT INTO bookings (user_id, flight_id, booking_reference, seat_number) VALUES (?, ?, ?, ?)',
      [userId, flightId, bookingReference, seatNumber]
    );
    await connection.end();
    res.json({ success: true, bookingId: result.insertId });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'จองไม่สำเร็จ' });
  }
});

// --- 3.5 ดูประวัติการจอง (GET /api/users/:userId/bookings) ---
// หน้าที่: ดึงรายการจองของคนๆ นั้นออกมาโชว์
app.get('/api/users/:userId/bookings', async (req, res) => {
  const userId = req.params.userId; // รับ ID จาก URL (เช่น .../users/5/bookings)
  try {
    const connection = await mysql.createConnection(dbConfig);
    // สั่ง SQL Join ตาราง: "เอาตารางจอง (bookings) ไปแปะกับตารางเที่ยวบิน (flights) ให้หน่อย อยากรู้รายละเอียดเที่ยวบินด้วย"
    const [rows] = await connection.execute(`
      SELECT b.*, f.flight_number, f.from_city, f.to_city, f.departure_time, f.price 
      FROM bookings b
      JOIN flights f ON b.flight_id = f.id
      WHERE b.user_id = ?
      ORDER BY b.created_at DESC
    `, [userId]);
    await connection.end();
    
    // จัดรูปแบบข้อมูลให้สวยงาม
    const bookings = rows.map(row => {
      return {
        id: row.id,
        bookingReference: row.booking_reference,
        seatNumber: row.seat_number,
        flight: { // ซ่อนรายละเอียดเที่ยวบินไว้ใน object ย่อย
          flightNumber: row.flight_number,
          from: row.from_city,
          to: row.to_city,
          time: row.departure_time.substring(0, 5),
          price: parseFloat(row.price)
        },
        createdAt: row.created_at
      };
    });

    res.json(bookings);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Error' });
  }
});

// --- 3.6 แก้ไขข้อมูลส่วนตัว (PUT /api/users/:userId) ---
// หน้าที่: อัปเดตข้อมูลผู้ใช้ (ชื่อ, นามสกุล, อีเมล ฯลฯ)
app.put('/api/users/:userId', async (req, res) => {
  const userId = req.params.userId;
  const { name, lastname, phone, idCard, email } = req.body;

  try {
    const connection = await mysql.createConnection(dbConfig);
    // สั่ง SQL UPDATE: "แก้ไขข้อมูล WHERE (ที่) ID นี้เท่านั้น"
    await connection.execute(
      'UPDATE users SET name = ?, lastname = ?, phone = ?, id_card = ?, email = ? WHERE id = ?',
      [name, lastname, phone, idCard, email, userId]
    );
    await connection.end();
    
    res.json({ success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Update failed' });
  }
});

// ==========================================
// 4. เริ่มต้นทำงาน (Server Start)
// ==========================================
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`); // แจ้งเตือนว่า "พร้อมทำงานแล้วจ้า"
});

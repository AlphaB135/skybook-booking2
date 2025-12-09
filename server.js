const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// เชื่อมต่อฐานข้อมูล
const dbConfig = {
  host: 'localhost',
  port: 3307,
  user: 'app_user',
  password: 'app_password',
  database: 'ticket_booking',
  charset: 'utf8mb4'
};

// 1. ดึงข้อมูลเที่ยวบิน
app.get('/api/flights', async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    // เรียงตามราคา (ถูก -> แพง)
    const [rows] = await connection.execute('SELECT * FROM flights ORDER BY price ASC');
    await connection.end();
    
    // วนลูปข้อมูลที่ได้มา เพื่อจัดรูปแบบใหม่
    const flights = rows.map(row => {
      // ตัดเวลาให้เหลือแค่ ชั่วโมง:นาที
      let time = row.departure_time;
      if (time) {
        time = time.substring(0, 5);
      }

      return {
        id: row.id,
        type: 'domestic', // เหมาเป็นในประเทศหมดเลย ง่ายดี
        flightNumber: row.flight_number,
        class: 'Economy', // เหมาเป็น Economy หมดเลย
        departure: { 
          city: row.from_city.split(' ')[0], 
          airport: row.from_city, 
          time: time 
        },
        arrival: { 
          city: row.to_city.split(' ')[0], 
          airport: row.to_city, 
          time: 'XX:XX'
        },
        duration: '2ชม.',
        date: '15 ธันวาคม 2567',
        price: parseFloat(row.price),
        seats: Math.floor(Math.random() * 50) + 10
      };
    });

    res.json(flights);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Error' });
  }
});

// 2. สมัครสมาชิก
app.post('/api/register', async (req, res) => {
  console.log('มีคนสมัครสมาชิก:', req.body);
  
  const { name, lastname, phone, idCard, password, email } = req.body;

  try {
    const connection = await mysql.createConnection(dbConfig);
    // เพิ่มลงฐานข้อมูล
    const [result] = await connection.execute(
      'INSERT INTO users (name, lastname, phone, id_card, password, email) VALUES (?, ?, ?, ?, ?, ?)',
      [name, lastname, phone, idCard, password, email]
    );
    
    await connection.end();
    
    res.json({ success: true, userId: result.insertId });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Error' });
  }
});

// 3. ล็อกอิน
app.post('/api/login', async (req, res) => {
  console.log('มีคนล็อกอิน:', req.body);
  
  const phone = req.body.phone;
  const password = req.body.password;

  try {
    const connection = await mysql.createConnection(dbConfig);
    // หาคนที่มีเบอร์นี้ และรหัสผ่านนี้
    const [rows] = await connection.execute(
      'SELECT * FROM users WHERE (phone = ? OR id_card = ?) AND password = ?',
      [phone, phone, password]
    );
    await connection.end();

    if (rows.length > 0) {
      // ถ้าเจอ
      const user = rows[0];
      res.json({ 
        success: true, 
        user: {
          id: user.id,
          name: user.name, // This is now First Name
          lastname: user.lastname,
          email: user.email,
          phone: user.phone,
          idCard: user.id_card
        }
      });
    } else {
      // ถ้าไม่เจอ
      res.status(401).json({ error: 'ผิดพลาด' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Error' });
  }
});

// 4. จองตั๋ว
app.post('/api/bookings', async (req, res) => {
  const userId = req.body.userId;
  const flightId = req.body.flightId;
  const bookingReference = req.body.bookingReference;
  const seatNumber = req.body.seatNumber;

  try {
    const connection = await mysql.createConnection(dbConfig);
    const [result] = await connection.execute(
      'INSERT INTO bookings (user_id, flight_id, booking_reference, seat_number) VALUES (?, ?, ?, ?)',
      [userId, flightId, bookingReference, seatNumber]
    );
    await connection.end();
    res.json({ success: true, bookingId: result.insertId });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Error' });
  }
});

// 5. ดูประวัติ
app.get('/api/users/:userId/bookings', async (req, res) => {
  const userId = req.params.userId;
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute(`
      SELECT b.*, f.flight_number, f.from_city, f.to_city, f.departure_time, f.price 
      FROM bookings b
      JOIN flights f ON b.flight_id = f.id
      WHERE b.user_id = ?
      ORDER BY b.created_at DESC
    `, [userId]);
    await connection.end();
    
    const bookings = rows.map(row => {
      return {
        id: row.id,
        bookingReference: row.booking_reference,
        seatNumber: row.seat_number,
        flight: {
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

// 6. แก้ไขข้อมูลผู้ใช้
app.put('/api/users/:userId', async (req, res) => {
  const userId = req.params.userId;
  const { name, lastname, phone, idCard, email } = req.body;

  try {
    const connection = await mysql.createConnection(dbConfig);
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

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

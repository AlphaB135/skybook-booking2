-- สร้างตารางผู้ใช้
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    image VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- สร้างตารางเที่ยวบิน
CREATE TABLE flights (
    id INT AUTO_INCREMENT PRIMARY KEY,
    flight_number VARCHAR(10) NOT NULL,
    from_city VARCHAR(100) NOT NULL,
    to_city VARCHAR(100) NOT NULL,
    departure_time TIME NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    booked BOOLEAN DEFAULT FALSE,
    booked_by VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- เพิ่มข้อมูลเที่ยวบินจำลอง
INSERT INTO flights (flight_number, from_city, to_city, departure_time, price) VALUES
('TG123', 'กรุงเทพฯ', 'เชียงใหม่', '08:00:00', 1500.00),
('TG456', 'กรุงเทพฯ', 'ภูเก็ต', '10:30:00', 2200.00),
('TG789', 'กรุงเทพฯ', 'หาดใหญ่', '14:00:00', 1800.00),
('TG101', 'เชียงใหม่', 'กรุงเทพฯ', '09:15:00', 1500.00),
('TG202', 'ภูเก็ต', 'กรุงเทพฯ', '11:45:00', 2200.00);
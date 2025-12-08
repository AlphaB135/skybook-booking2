import mysql from 'mysql2/promise'

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3307,
  user: 'app_user',
  password: 'app_password',
  database: 'ticket_booking',
  charset: 'utf8mb4'
})

export default connection
const mysql = require('mysql2/promise');

const dbConfig = {
  host: 'localhost',
  port: 3307,
  user: 'app_user',
  password: 'app_password',
  database: 'ticket_booking'
};

async function migrate() {
  try {
    const connection = await mysql.createConnection(dbConfig);
    console.log('Connected to database.');

    // Check if columns exist
    const [columns] = await connection.execute('SHOW COLUMNS FROM users');
    const columnNames = columns.map(c => c.Field);

    if (!columnNames.includes('email')) {
      console.log('Adding email column...');
      await connection.execute('ALTER TABLE users ADD COLUMN email VARCHAR(255)');
    } else {
      console.log('email column already exists.');
    }

    if (!columnNames.includes('lastname')) {
      console.log('Adding lastname column...');
      await connection.execute('ALTER TABLE users ADD COLUMN lastname VARCHAR(255)');
    } else {
      console.log('lastname column already exists.');
    }

    console.log('Migration complete.');
    await connection.end();
  } catch (err) {
    console.error('Migration failed:', err);
  }
}

migrate();

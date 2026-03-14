// lib/db.js
// MySQL connection pool — points at your cPanel database
// Add these to Vercel environment variables:
//   DB_HOST     = your cPanel server IP or hostname
//   DB_USER     = your cPanel MySQL username
//   DB_PASSWORD = your MySQL password
//   DB_NAME     = your database name
//   DB_PORT     = 3306 (default)

import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host:               process.env.DB_HOST,
  port:               parseInt(process.env.DB_PORT || '3306'),
  user:               process.env.DB_USER,
  password:           process.env.DB_PASSWORD,
  database:           process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit:    10,
  queueLimit:         0,
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
});

export default pool;

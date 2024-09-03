require('dotenv').config();
const { Client } = require('pg');

// Create a new client instance
const client = new Client({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
    // ssl: {
    //     rejectUnauthorized: false
    // }
});

client.connect().then(() => console.log('Connected to the PostgresSQL database!'))
    .catch(err => console.log('Connection error', err.stack));

module.exports = client;
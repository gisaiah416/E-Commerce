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

client.connect().then(() => {
    console.log('Connected to the PostgresSQL database!');

    // const insertQuery =
    //     `INSERT INTO users (username, email)
    //  VALUES ($1, $2)
    //  RETURNING *;`;

    // const values = ['Jill Doe', 'jill.doe@example.com'];

    //return client.query(insertQuery, values);

    const selectQuery = `SELECT * FROM USERS;`;

    return client.query(selectQuery);

}).then((result) => {
    //console.log('User inserted:', result.rows[0]);

    console.log('Users:', result.rows);


    // Close the database connection
    return client.end();
})
    .catch(err => {
        if (err.code === '23505') {
            console.log('Duplicate entry detected:', err.detail)
        }
        else {
            console.log('Error executing query', err.stack);
        }
    });

module.exports = client; // testing
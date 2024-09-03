const client = require('../config/db.js');

// Create a new user
exports.createUser = async (req, res) => {
    console.log('Hello');
    const { username, email } = req.body;
    console.log(`username ${username}`);
    console.log(`email ${email}`);
    try {
        const result = await client.query
            (
                'INSERT INTO users (username, email) VALUES ($1, $2) RETURNING *', [username, email]
            );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
};
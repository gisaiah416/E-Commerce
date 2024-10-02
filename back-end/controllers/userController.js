const client = require('../config/db.js');

// Create a new user
exports.createUser = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const result = await client.query
            (
                'INSERT INTO users (username, email, user_pw) VALUES ($1, $2, $3) RETURNING *', [username, email, password]
            );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        if (err.code === '23505') {
            res.status(409).json({ error: 'Duplicate entry detected' });
        }
        else {
            res.status(500).json({ error: 'Error executing query' });
        }
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const result = await client.query
            (
                'SELECT * FROM USERS'
            );
        res.status(200).json(result.rows);
    } catch (err) {
        res.status(500).json({ error: 'Error getting all users' });
    }
};
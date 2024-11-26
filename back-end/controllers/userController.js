const client = require('../config/db.js');
const bcyrpt = require('bcrypt');

// Create a new user
exports.createUser = async (req, res) => {
    const { username, email, password } = req.body;
    const saltRounds = 10;
    try {
        const InvalidEmail = await client.query
            (
                'SELECT * FROM USERS WHERE username = $1', [email]
            );

        if (InvalidEmail.rows.length > 0) {
            return res.status(409).json({ error: 'Email already exists' });
        }

        const hashedPassword = await bcyrpt.hash(password, saltRounds);

        console.log(hashedPassword);

        const result = await client.query
            (
                'INSERT INTO users (username, email, user_pw) VALUES ($1, $2, $3) RETURNING *', [username, email, hashedPassword]
            );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        // if (err.code === '23505') {
        //     res.status(409).json({ error: 'Duplicate entry detected' });
        // }
        res.status(500).json({ error: 'Error executing query' });

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

exports.GetUser = async (req, res) => {
    const { username, password } = req.body;
    res.json({
        username,
        password
    });
}
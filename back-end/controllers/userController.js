const client = require('../config/db.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET;
require('dotenv').config();

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

        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const result = await client.query
            (
                'INSERT INTO users (username, email, user_pw) VALUES ($1, $2, $3) RETURNING *', [username, email, hashedPassword]
            );
        res.status(201).json(result.rows[0]);

        res.json({ message: 'Login succesfull', token })

    } catch (err) {
        // if (err.code === '23505') {
        //     res.status(409).json({ error: 'Duplicate entry detected' });
        // }
        res.status(500).json({ error: 'Error executing query' });

    }
};

// exports.getAllUsers = async (req, res) => {
//     try {
//         const result = await client.query
//             (
//                 'SELECT * FROM USERS'
//             );
//         res.status(200).json(result.rows);
//     } catch (err) {
//         res.status(500).json({ error: 'Error getting all users' });
//     }
// };

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const validemail = await client.query
            (
                'select * from users where email = $1', [email]
            );

        if (validemail.rows.length === 0) {
            return res.status(404).json(
                {
                    error: "User not found"
                }
            )
        }

        const user = validemail.rows[0];
        const isvalidPassword = await bcrypt.compare(password, user.user_pw);

        if (isvalidPassword) {
            const token = jwt.sign(
                { id: user.id, email: user.email },
                JWT_SECRET, { expiresIn: '1h' }
            );

            return res.status(200).json(
                {
                    message: 'Login successful', token
                }
            )

        }
        else {
            return res.status(401).json(
                {
                    "Denied": "Invalid password"
                }
            )
        }

    } catch (err) {
        return res.status(500).json(
            {
                error: "Servor Error"
            }
        )
    }
}

exports.getUser = async (req, res) => {

    try {
        const userQuery = await client.query
            (
                'select * from users where email = $1', [req.user.id]
            );

        if (userQuery.rows.length === 0) {
            return res.status(404).json({ message: 'User not found' })
        }
        res.json(userQuery.rows[0]);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error' });
    }

}

exports.deleteUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const validEmail = await client.query(
            'SELECT * FROM USERS WHERE email = $1', [email]
        );

        if (validEmail.rows.length === 0) {
            return res.status(404).json({
                error: "User does not exist"
            });
        }

        const user = validEmail.rows[0];
        const isvalidPassword = await bcrypt.compare(password, user.user_pw);

        if (isvalidPassword) {
            return res.status(200).json({
                "Message": "User deleted"
            })
        }

        else {
            return res.status(404).json({
                error: "invalid password"
            })
        }

    } catch (error) {
        return res.status(500).json({
            error: "Server Error"
        })
    }
}

exports.changePassword = async (req, res) => {
    const { email, password } = req.body;

    try {

    } catch (error) {

    }

}
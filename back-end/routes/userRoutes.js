const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');

// create a new user
router.post('/users', userController.createUser);

// Get all users
// router.get('/users', userController.getAllUsers);

module.exports = router;
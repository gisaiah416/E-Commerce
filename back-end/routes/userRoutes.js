const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');

// create a new user
router.post('/users', userController.createUser);

router.get('/users', userController.getAllUsers);

// router.get('/users/login', userController.GetUser);
router.get('/login', userController.GetUser);


// Get all users
// router.get('/users', userController.getAllUsers);

module.exports = router;
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');

// create a new user
router.post('/', userController.createUser);

// router.get('/', userController.getAllUsers);

router.post('/login', userController.loginUser);

router.delete('/delete', userController.deleteUser);

router.put('/changepassword', userController.changePassword);

module.exports = router;
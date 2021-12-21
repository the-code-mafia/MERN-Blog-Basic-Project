const express = require('express');
const router = express.Router();
const { registerValidation, loginValidation,register, login } = require('../controllers/userController');

// User registration route
router.post('/register', registerValidation, register);
// User login route
router.post('/login', loginValidation, login);

module.exports = router;
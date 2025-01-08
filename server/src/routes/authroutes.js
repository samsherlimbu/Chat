const express = require('express');
const router = express.Router();
const { signup, login, logout } = require('../controllers/authcontrollers');

// Define the routes
router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);

module.exports = router;

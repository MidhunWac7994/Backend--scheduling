const express = require('express');
const authController = require('../Controllers/authController');
const router = express.Router();

// Google Login Route
router.post('/google-login', authController.googleLogin);

// User Profile Route
router.get('/profile', authController.getProfile);

module.exports = router;
const express = require('express');
const authController = require('../Controllers/authController');
const router = express.Router();


router.post('/google-login', authController.googleLogin);


router.get('/profile', authController.getProfile);

module.exports = router;
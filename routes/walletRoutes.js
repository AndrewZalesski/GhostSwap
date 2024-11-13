// Routes for wallet-related actions
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/connect', authController.authenticateWallet);

module.exports = router;
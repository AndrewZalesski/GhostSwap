// Routes for analytics APIs
const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');

router.get('/top-gainers', analyticsController.getTopGainers);

module.exports = router;
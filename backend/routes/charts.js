const express = require('express');
const router = express.Router();
const chartsController = require('../controllers/chartsController');
router.get('/:ticker', chartsController.getChartData);
module.exports = router;
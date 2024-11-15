const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/ordersController');

router.post('/', ordersController.logOrder);
router.get('/:ticker', ordersController.getOrdersByTicker);

module.exports = router;
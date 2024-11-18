const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Order = require('../models/Order');

router.get('/', async (req, res) => {
  const { ticker } = req.query;
  if (!ticker) {
    return res.status(400).json({ error: 'Ticker query parameter is required.' });
  }

  try {
    const orders = await Order.find({ ticker: ticker.toUpperCase(), status: 'active' });
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

router.post('/',
  [
    body('txJsonString').notEmpty().withMessage('txJsonString is required.'),
    body('ticker').isString().withMessage('Ticker must be a string.'),
    body('amount').isNumeric().withMessage('Amount must be a number.'),
    body('uAmt').isNumeric().withMessage('uAmt must be a number.'),
    body('from').isString().withMessage('From must be a string.'),
    body('psktData').notEmpty().withMessage('psktData is required.'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id, txJsonString, ticker, amount, uAmt, from, psktData } = req.body;

    try {
      const existingOrder = await Order.findOne({ txJsonString });
      if (existingOrder) {
        return res.status(400).json({ error: 'Order with this txJsonString already exists.' });
      }

      const newOrder = new Order({
        id,
        txJsonString,
        ticker: ticker.toUpperCase(),
        amount,
        uAmt,
        from: from.toLowerCase(),
        psktData,
      });

      await newOrder.save();
      res.status(201).json(newOrder);
    } catch (error) {
      console.error('Error creating order:', error);
      res.status(500).json({ error: 'Internal server error.' });
    }
});

router.put('/:id',
  [
    body('status').isIn(['active', 'completed', 'canceled']).withMessage('Invalid status value.')
  ],
  async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const order = await Order.findOne({ id });
      if (!order) {
        return res.status(404).json({ error: 'Order not found.' });
      }

      order.status = status;
      await order.save();

      res.json(order);
    } catch (error) {
      console.error('Error updating order:', error);
      res.status(500).json({ error: 'Internal server error.' });
    }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const order = await Order.findOneAndDelete({ id });
    if (!order) {
      return res.status(404).json({ error: 'Order not found.' });
    }

    res.json({ message: 'Order deleted successfully.' });
  } catch (error) {
    console.error('Error deleting order:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

module.exports = router;

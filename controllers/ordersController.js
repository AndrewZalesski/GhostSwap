
const Order = require('../models/Order');

// Log a New Order
exports.logOrder = async (req, res) => {
  try {
    const { ticker, amount, price } = req.body;

    if (!ticker || typeof ticker !== 'string' || ticker.length > 6) {
      return res.status(400).json({ error: 'Invalid ticker format' });
    }
    if (!amount || isNaN(amount) || amount <= 0) {
      return res.status(400).json({ error: 'Amount must be a positive number' });
    }
    if (!price || isNaN(price) || price <= 0) {
      return res.status(400).json({ error: 'Price must be a positive number' });
    }

    const order = new Order({
      ticker: ticker.trim().toUpperCase(),
      amount,
      price,
    });

    await order.save();
    res.status(201).json({ message: 'Order logged successfully' });
  } catch (error) {
    res.status(500).json({ error: `Failed to log order: ${error.message}` });
  }
};

// Get Orders by Ticker
exports.getOrdersByTicker = async (req, res) => {
  try {
    const { ticker } = req.params;

    if (!ticker || typeof ticker !== 'string' || ticker.length > 6) {
      return res.status(400).json({ error: 'Invalid ticker format' });
    }

    const orders = await Order.find({ ticker: ticker.trim().toUpperCase() }).sort({ createdAt: -1 });

    if (!orders.length) {
      return res.status(404).json({ error: 'No orders found for this ticker' });
    }

    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: `Failed to fetch orders: ${error.message}` });
  }
};

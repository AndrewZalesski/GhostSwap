const Order = require('../models/Order');

exports.logOrder = async (req, res) => {
  try {
    const { ticker, amount, price } = req.body;
    const order = new Order({ ticker, amount, price });
    await order.save();
    res.status(201).json({ message: 'Order logged successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to log order' });
  }
};

exports.getOrdersByTicker = async (req, res) => {
  try {
    const { ticker } = req.params;
    const orders = await Order.find({ ticker }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};
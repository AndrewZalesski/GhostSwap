// server.js

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Initialize Express App
const app = express();
app.use(express.json());

// Allowed Origins
const allowedOrigins = [
  'https://kasper-3-0.webflow.io',
  'https://kaspercoin.net'
];

// CORS Configuration
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = `The CORS policy for this site does not allow access from the specified Origin: ${origin}`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));

// Connect to MongoDB
const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB Connected'))
  .catch(err => console.log('MongoDB Connection Error:', err));

// Define Order Schema
const orderSchema = new mongoose.Schema({
  txJsonString: { type: String, required: true, unique: true },
  ticker: { type: String, required: true },
  amount: { type: Number, required: true },
  uAmt: { type: Number, required: true }, // Total KAS amount in sompi
  from: { type: String, required: true }, // Seller's address
  psktData: { type: String, required: true }, // Store PSKT data if needed
  status: { type: String, default: 'active' }, // active, completed, canceled
  createdAt: { type: Date, default: Date.now },
});

// Ensure unique index on txJsonString
orderSchema.index({ txJsonString: 1 }, { unique: true });

const Order = mongoose.model('Order', orderSchema);

// API Endpoints

// Create Order
app.post('/api/orders', async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.status(201).json(order);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(400).json({ error: 'Failed to create order.' });
  }
});

// Retrieve Orders
app.get('/api/orders', async (req, res) => {
  try {
    const { ticker } = req.query;
    const query = ticker ? { ticker: ticker.toUpperCase(), status: 'active' } : { status: 'active' };
    const orders = await Order.find(query).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Failed to fetch orders.' });
  }
});

// Cancel Order
app.delete('/api/orders/:txJsonString', async (req, res) => {
  try {
    const { txJsonString } = req.params;
    const result = await Order.findOneAndUpdate(
      { txJsonString },
      { status: 'canceled' },
      { new: true }
    );
    if (result) {
      res.json({ message: 'Order canceled.', order: result });
    } else {
      res.status(404).json({ error: 'Order not found.' });
    }
  } catch (error) {
    console.error('Error canceling order:', error);
    res.status(500).json({ error: 'Failed to cancel order.' });
  }
});

// Update Order Status (e.g., mark as completed)
app.put('/api/orders/:txJsonString', async (req, res) => {
  try {
    const { txJsonString } = req.params;
    const { status } = req.body;
    const order = await Order.findOneAndUpdate(
      { txJsonString },
      { status },
      { new: true }
    );
    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ error: 'Order not found.' });
    }
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ error: 'Failed to update order status.' });
  }
});

// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

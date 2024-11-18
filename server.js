// server.js

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

// Initialize Express App
const app = express();
app.use(express.json());

// Allowed Origins
const allowedOrigins = [
  'https://kasper-3-0.webflow.io',
  'https://kaspercoin.net',
  'http://localhost:3000' // Added for local testing
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

// Rate Limiting
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: { error: 'Too many requests, please try again later.' }
});
app.use('/api/', apiLimiter);

// Connect to MongoDB
const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log('MongoDB Connection Error:', err));

// Define Order Schema
const orderSchema = new mongoose.Schema({
  txJsonString: { type: String, required: true, unique: true },
  ticker: { type: String, required: true },
  amount: { type: Number, required: true },
  uAmt: { type: Number, required: true }, // Total KAS amount in sompi
  from: { type: String, required: true }, // Seller's address
  psktData: { type: String, required: true }, // Store PSKT data if needed
  status: { type: String, enum: ['active', 'completed', 'canceled'], default: 'active' },
  createdAt: { type: Date, default: Date.now },
});

// Indexes for optimized queries
orderSchema.index({ txJsonString: 1 }, { unique: true });
orderSchema.index({ ticker: 1 });
orderSchema.index({ from: 1 });

const Order = mongoose.model('Order', orderSchema);

// API Endpoints

// Create Order
app.post('/api/orders', async (req, res) => {
  try {
    const { txJsonString, ticker, amount, uAmt, from, psktData } = req.body;

    // Basic validation
    if (!txJsonString || !ticker || !amount || !uAmt || !from || !psktData) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    const order = new Order({ txJsonString, ticker: ticker.toUpperCase(), amount, uAmt, from, psktData });
    await order.save();
    res.status(201).json(order);
  } catch (error) {
    console.error('Error creating order:', error);
    if (error.code === 11000) { // Duplicate key error
      res.status(400).json({ error: 'Order with this txJsonString already exists.' });
    } else {
      res.status(400).json({ error: 'Failed to create order.' });
    }
  }
});

// Retrieve Orders
app.get('/api/orders', async (req, res) => {
  try {
    const { ticker, status } = req.query;
    let query = {};

    if (ticker) {
      query.ticker = ticker.toUpperCase();
    }

    if (status) {
      query.status = status.toLowerCase();
    } else {
      query.status = 'active'; // Default to active listings
    }

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

    if (!txJsonString) {
      return res.status(400).json({ error: 'txJsonString is required.' });
    }

    const decodedTxJsonString = decodeURIComponent(txJsonString);

    const order = await Order.findOneAndUpdate(
      { txJsonString: decodedTxJsonString, status: 'active' },
      { status: 'canceled' },
      { new: true }
    );

    if (order) {
      res.json({ message: 'Order canceled successfully.', order });
    } else {
      res.status(404).json({ error: 'Order not found or already canceled/completed.' });
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

    if (!status || !['active', 'completed', 'canceled'].includes(status.toLowerCase())) {
      return res.status(400).json({ error: 'Invalid status provided.' });
    }

    const decodedTxJsonString = decodeURIComponent(txJsonString);

    const order = await Order.findOneAndUpdate(
      { txJsonString: decodedTxJsonString },
      { status: status.toLowerCase() },
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

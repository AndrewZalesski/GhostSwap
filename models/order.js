const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const orderSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true, default: uuidv4 },
  txJsonString: { type: String, required: true, unique: true },
  ticker: { type: String, required: true },4
  amount: { type: Number, required: true }, // Amount in smallest units (e.g., sompi)
  uAmt: { type: Number, required: true }, // Total KAS amount in smallest units
  from: { type: String, required: true }, // User's address
  psktData: { type: String, required: true }, // PSKT data if needed
  status: { type: String, enum: ['active', 'completed', 'canceled'], default: 'active' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Order', orderSchema);

const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const orderSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true, default: uuidv4 },
  txJsonString: { type: String, required: true, unique: true },
  ticker: { type: String, required: true },
  amount: { type: Number, required: true },
  uAmt: { type: Number, required: true },
  from: { type: String, required: true },
  psktData: { type: String, required: true },
  status: { type: String, enum: ['active', 'completed', 'canceled'], default: 'active' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Order', orderSchema);

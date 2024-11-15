const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  ticker: String,
  amount: Number,
  price: Number,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Order', OrderSchema);
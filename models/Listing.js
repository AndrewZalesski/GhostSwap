const mongoose = require('mongoose');
const ListingSchema = new mongoose.Schema({
  ticker: String,
  amount: Number,
  price: Number,
  createdAt: { type: Date, default: Date.now },
  seller: String,
});
module.exports = mongoose.model('Listing', ListingSchema);
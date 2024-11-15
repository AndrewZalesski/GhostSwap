const mongoose = require('mongoose');
const TokenStatsSchema = new mongoose.Schema({
  ticker: { type: String, unique: true },
  lastPurchasedPrice: { type: Number, required: true },
  lastVolume: { type: Number, default: 0 },
  lastTrades: { type: Number, default: 0 },
});
module.exports = mongoose.model('TokenStats', TokenStatsSchema);
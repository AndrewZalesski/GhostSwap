const mongoose = require('mongoose');
const HighlightsSchema = new mongoose.Schema({
  topGainers: [{ ticker: String, priceChange: Number, logo: String }],
  highestVolume: [{ ticker: String, volume: Number, logo: String }],
  trendingTokens: [{ ticker: String, trades: Number, logo: String }],
});
module.exports = mongoose.model('Highlights', HighlightsSchema);
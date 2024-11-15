
const mongoose = require('mongoose');

const HighlightsSchema = new mongoose.Schema({
  topGainers: [
    {
      ticker: {
        type: String,
        required: true,
        trim: true,
        maxlength: [6, 'Ticker must be 6 characters or fewer'],
      },
      priceChange: {
        type: Number,
        required: true,
        min: [0, 'Price change must be non-negative'],
      },
    },
  ],
  highestVolume: [
    {
      ticker: {
        type: String,
        required: true,
        trim: true,
        maxlength: [6, 'Ticker must be 6 characters or fewer'],
      },
      volume: {
        type: Number,
        required: true,
        min: [0, 'Volume must be non-negative'],
      },
    },
  ],
  trendingTokens: [
    {
      ticker: {
        type: String,
        required: true,
        trim: true,
        maxlength: [6, 'Ticker must be 6 characters or fewer'],
      },
      trades: {
        type: Number,
        required: true,
        min: [0, 'Trades must be non-negative'],
      },
    },
  ],
});

module.exports = mongoose.model('Highlights', HighlightsSchema);

const mongoose = require('mongoose');

const ChartDataSchema = new mongoose.Schema({
  ticker: String,
  data: [
    {
      timestamp: Date,
      price: Number,
    },
  ],
});

module.exports = mongoose.model('ChartData', ChartDataSchema);
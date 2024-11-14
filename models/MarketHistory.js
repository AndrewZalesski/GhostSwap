
const mongoose = require("mongoose");

const MarketHistorySchema = new mongoose.Schema({
    ticker: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    pricePerToken: { type: Number, required: true },
    volume: { type: Number, required: true }
});

module.exports = mongoose.model("MarketHistory", MarketHistorySchema);

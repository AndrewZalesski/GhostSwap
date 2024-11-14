
const mongoose = require("mongoose");

const MarketDataSchema = new mongoose.Schema({
    ticker: { type: String, required: true },
    timestamp: { type: Date, required: true },
    price: { type: Number, required: true },
    volume: { type: Number, required: true },
});

module.exports = mongoose.model("MarketData", MarketDataSchema);

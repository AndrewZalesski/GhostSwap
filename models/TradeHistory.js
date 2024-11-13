
const mongoose = require("mongoose");

const tradeHistorySchema = new mongoose.Schema({
    ticker: {
        type: String,
        required: true,
        trim: true
    },
    quantity: {
        type: Number,
        required: true,
    },
    totalPrice: {
        type: Number,
        required: true,
    },
    buyerWalletAddress: {
        type: String,
        required: true,
    },
    sellerWalletAddress: {
        type: String,
        required: true,
    },
    fee: {
        type: Number,
        required: true,
    }
}, { timestamps: true });

module.exports = mongoose.model("TradeHistory", tradeHistorySchema);

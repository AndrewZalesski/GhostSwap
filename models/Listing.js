
const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema({
    ticker: {
        type: String,
        required: true,
        trim: true
    },
    quantity: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    walletAddress: {
        type: String,
        required: true,
    },
    fee: {
        type: Number,
        required: true,
    },
    totalPrice: {
        type: Number,
        required: true,
    }
}, { timestamps: true });

module.exports = mongoose.model("Listing", listingSchema);

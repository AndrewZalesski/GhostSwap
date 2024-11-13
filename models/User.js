// Database model for users
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    walletAddress: String,
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', userSchema);
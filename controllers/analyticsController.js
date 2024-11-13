const TradeHistory = require("../models/TradeHistory");

exports.getTopGainers = async (req, res) => {
    try {
        const topGainers = await TradeHistory.find({}).sort({ percentageChange: -1 }).limit(5);
        res.json({ success: true, topGainers });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getHighestVolume = async (req, res) => {
    try {
        const highestVolume = await TradeHistory.find({}).sort({ volume: -1 }).limit(5);
        res.json({ success: true, highestVolume });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getTrending = async (req, res) => {
    try {
        const trending = await TradeHistory.find({}).sort({ tradeCount: -1 }).limit(5);
        res.json({ success: true, trending });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

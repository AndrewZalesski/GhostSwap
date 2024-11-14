
const MarketHistory = require("../models/MarketHistory");

exports.getMarketHistory = async (req, res) => {
    const { ticker } = req.params;
    const { timeframe = "24h" } = req.query;

    try {
        const endTime = new Date();
        let startTime;

        switch (timeframe) {
            case "24h":
                startTime = new Date(endTime - 24 * 60 * 60 * 1000);
                break;
            case "7d":
                startTime = new Date(endTime - 7 * 24 * 60 * 60 * 1000);
                break;
            case "30d":
                startTime = new Date(endTime - 30 * 24 * 60 * 60 * 1000);
                break;
            default:
                return res.status(400).json({ error: "Invalid timeframe" });
        }

        const history = await MarketHistory.find({
            ticker: ticker.toUpperCase(),
            timestamp: { $gte: startTime, $lte: endTime },
        }).sort({ timestamp: 1 });

        res.status(200).json(history);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

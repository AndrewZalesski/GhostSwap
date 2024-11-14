
const MarketData = require("../models/MarketData");

exports.getMarketHighlights = async (req, res) => {
    try {
        const endTime = new Date();
        const startTime = new Date(endTime - 24 * 60 * 60 * 1000);

        // Fetch trades in the last 24 hours
        const trades = await MarketData.find({ timestamp: { $gte: startTime, $lte: endTime } });

        // Calculate top gainers, highest volume, and most trades
        const tickers = [...new Set(trades.map(t => t.ticker))];

        const highlights = tickers.map(ticker => {
            const tickerTrades = trades.filter(t => t.ticker === ticker);
            const priceChange = ((tickerTrades[tickerTrades.length - 1]?.price || 0) - (tickerTrades[0]?.price || 0)) / (tickerTrades[0]?.price || 1);
            const volume = tickerTrades.reduce((sum, trade) => sum + trade.volume, 0);
            const tradeCount = tickerTrades.length;

            return { ticker, priceChange, volume, tradeCount };
        });

        res.status(200).json({
            topGainers: highlights.sort((a, b) => b.priceChange - a.priceChange).slice(0, 5),
            highestVolume: highlights.sort((a, b) => b.volume - a.volume).slice(0, 5),
            mostTrades: highlights.sort((a, b) => b.tradeCount - a.tradeCount).slice(0, 5),
        });
    } catch (error) {
        console.error("Error fetching market highlights:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

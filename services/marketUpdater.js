
const cron = require("node-cron");
const MarketData = require("../models/MarketData");
const fetch = require("node-fetch");

const fetchAndStoreMarketData = async () => {
    try {
        const response = await fetch("https://ghostswap-69212846b3d2.herokuapp.com/api/trades");
        if (!response.ok) throw new Error(`Error fetching market data: ${response.status}`);

        const trades = await response.json();

        // Insert fetched trades into the database
        const bulkOps = trades.map(trade => ({
            updateOne: {
                filter: { ticker: trade.ticker, timestamp: trade.timestamp },
                update: { $set: trade },
                upsert: true,
            },
        }));

        if (bulkOps.length > 0) {
            await MarketData.bulkWrite(bulkOps);
            console.log(`Market data updated: ${new Date().toISOString()}`);
        }
    } catch (error) {
        console.error("Error fetching and storing market data:", error);
    }
};

// Schedule the job to run every 2 minutes
cron.schedule("*/2 * * * *", fetchAndStoreMarketData);
module.exports = fetchAndStoreMarketData;

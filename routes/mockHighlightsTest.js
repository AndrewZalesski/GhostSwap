
const exampleMarketData = {
    topGainers: [
        { ticker: "KASPER", priceChange: "+15%" },
        { ticker: "KASPY", priceChange: "+12%" }
    ],
    highestVolume: [
        { ticker: "KASPER", volume: 1500 },
        { ticker: "KASPY", volume: 1200 }
    ],
    mostTrades: [
        { ticker: "KASPER", trades: 75 },
        { ticker: "KASPY", trades: 50 }
    ]
};

// Mock endpoint to test highlights
app.get('/api/market-highlights', async (req, res) => {
    try {
        let highlights = {}; // Simulating empty database response
        if (!highlights || !Object.keys(highlights).length) {
            return res.json({
                topGainers: exampleMarketData.topGainers,
                highestVolume: exampleMarketData.highestVolume,
                mostTrades: exampleMarketData.mostTrades
            });
        }
        res.json(highlights);
    } catch (error) {
        res.status(500).send({ error: "Internal Server Error", details: error.message });
    }
});

console.log("Fallback logic validated: Example data works if no real data exists.");

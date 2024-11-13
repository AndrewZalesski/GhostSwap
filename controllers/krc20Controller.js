const kasplexClient = require('../utils/kasplexClient');

// Fetch KRC20 Token Details
exports.getTokenDetails = async (req, res) => {
    const { ticker } = req.params;

    try {
        // Validate the ticker length
        if (ticker.length > 6) {
            return res.status(400).json({ success: false, message: "Ticker must be 6 characters or fewer." });
        }

        // Fetch token details from the Kasplex API
        const tokenDetails = await kasplexClient.getTokenDetails(ticker);

        if (!tokenDetails) {
            return res.status(404).json({ success: false, message: "Token details not found." });
        }

        res.json({
            success: true,
            data: tokenDetails,
        });
    } catch (error) {
        console.error("Error fetching token details:", error.message);
        res.status(500).json({ success: false, message: "An error occurred while fetching token details." });
    }
};

// Fetch Holders List
exports.getHolders = async (req, res) => {
    const { ticker } = req.params;

    try {
        const holders = await kasplexClient.getTokenHolders(ticker);

        if (!holders) {
            return res.status(404).json({ success: false, message: "No holders found for the token." });
        }

        res.json({
            success: true,
            data: holders,
        });
    } catch (error) {
        console.error("Error fetching token holders:", error.message);
        res.status(500).json({ success: false, message: "An error occurred while fetching token holders." });
    }
};

// Fetch Token Statistics
exports.getTokenStats = async (req, res) => {
    const { ticker } = req.params;

    try {
        const stats = await kasplexClient.getTokenStats(ticker);

        if (!stats) {
            return res.status(404).json({ success: false, message: "No statistics found for the token." });
        }

        res.json({
            success: true,
            data: stats,
        });
    } catch (error) {
        console.error("Error fetching token statistics:", error.message);
        res.status(500).json({ success: false, message: "An error occurred while fetching token statistics." });
    }
};

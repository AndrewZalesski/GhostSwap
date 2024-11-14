
const kasplexUtil = require('../utils/kasplexUtil');

// Fetch KRC20 Token Details
exports.getTokenDetails = async (req, res) => {
    const { ticker } = req.params;

    try {
        // Validate the ticker length
        if (!ticker || ticker.length > 6) {
            return res.status(400).json({ success: false, message: "Invalid ticker provided. Must be 1-6 characters." });
        }

        // Fetch token details from the Kasplex API
        const tokenDetails = await kasplexUtil.getTokenDetails(ticker);

        if (!tokenDetails) {
            return res.status(404).json({ success: false, message: "Token details not found." });
        }

        res.json({
            success: true,
            data: tokenDetails,
        });
    } catch (error) {
        console.error(`[KRC20Controller] Error fetching token details for ${ticker}:`, error.message);
        res.status(500).json({ success: false, message: "An error occurred while fetching token details." });
    }
};

// Fetch Holders List
exports.getHolders = async (req, res) => {
    const { ticker } = req.params;

    try {
        const holders = await kasplexUtil.getTokenHolders(ticker);

        if (!holders) {
            return res.status(404).json({ success: false, message: "Holders not found." });
        }

        res.json({
            success: true,
            data: holders,
        });
    } catch (error) {
        console.error(`[KRC20Controller] Error fetching holders for ${ticker}:`, error.message);
        res.status(500).json({ success: false, message: "An error occurred while fetching token holders." });
    }
};


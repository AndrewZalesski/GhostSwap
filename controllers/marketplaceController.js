
const marketplaceService = require('../services/marketplaceService');

exports.createListing = async (req, res) => {
    try {
        const { ticker, quantity, price, feeOption, customFee } = req.body;

        if (!ticker || !quantity || !price) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const listing = await marketplaceService.createListing(ticker, quantity, price, feeOption, customFee);
        res.status(201).json({ success: true, listing });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

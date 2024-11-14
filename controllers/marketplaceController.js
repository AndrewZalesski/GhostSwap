
const kaspaClient = require('../utils/kaspaClient');
const marketplaceService = require('../services/marketplaceService');
const { FEE_RECEIVER_ADDRESS } = require('../config');

// Create a Listing
exports.createListing = async (req, res) => {
    const { ticker, quantity, price } = req.body;

    try {
        if (!ticker || ticker.length > 6) {
            return res.status(400).json({ success: false, message: "Invalid ticker. Must be 1-6 characters." });
        }
        if (quantity <= 0 || price <= 0) {
            return res.status(400).json({ success: false, message: "Quantity and price must be positive numbers." });
        }

        const listing = await marketplaceService.createListing(ticker, quantity, price);
        res.json({ success: true, listing });
    } catch (error) {
        console.error("Error creating listing:", error);
        res.status(500).json({ success: false, message: "Failed to create listing" });
    }
};

// Fetch Listings
exports.getListings = async (req, res) => {
    try {
        const listings = await marketplaceService.fetchListings();
        res.json({ success: true, listings });
    } catch (error) {
        console.error("Error fetching listings:", error);
        res.status(500).json({ success: false, message: "Failed to fetch listings" });
    }
};

// Purchase a Listing
exports.purchaseListing = async (req, res) => {
    const { listingId, buyerAddress } = req.body;

    try {
        const result = await marketplaceService.purchaseListing(listingId, buyerAddress, FEE_RECEIVER_ADDRESS);
        res.json({ success: true, result });
    } catch (error) {
        console.error("Error purchasing listing:", error);
        res.status(500).json({ success: false, message: "Failed to complete purchase" });
    }
};

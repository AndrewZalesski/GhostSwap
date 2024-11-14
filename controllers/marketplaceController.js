const kaspaClient = require('../utils/kaspaClient');
const marketplaceService = require('../services/marketplaceService');
const { FEE_RECEIVER_ADDRESS } = require('../config');

// Create a Listing
exports.createListing = async (req, res) => {
    const { ticker, quantity, price, feeOption, customFee } = req.body;

    try {
        // Validate inputs
        if (!ticker || ticker.length > 6) {
            return res.status(400).json({ success: false, message: "Invalid ticker. Must be 1-6 characters." });
        }
        if (!quantity || quantity <= 0) {
            return res.status(400).json({ success: false, message: "Quantity must be greater than zero." });
        }
        if (!price || price <= 0) {
            return res.status(400).json({ success: false, message: "Price must be greater than zero." });
        }

        // Fetch fee estimates from Kaspa
        const feeEstimates = await kaspaClient.getFeeEstimates();
        let networkFee = feeEstimates[feeOption] || feeEstimates.medium; // Default to medium if feeOption is invalid

        // Use custom fee if provided and valid
        if (customFee && customFee > 0) {
            networkFee = customFee;
        }

        // Calculate platform fee
        const platformFee = (price * 0.0099).toFixed(8); // 0.99% of price

        // Create the listing
        const listing = await marketplaceService.createListing({
            ticker,
            quantity,
            price,
            networkFee,
            platformFee,
            seller: req.user.address, // Assuming authenticated user's address
        });

        res.status(201).json({
            success: true,
            message: "Listing created successfully.",
            data: listing,
        });
    } catch (error) {
        console.error("Error creating listing:", error.message);
        res.status(500).json({ success: false, message: "Failed to create listing." });
    }
};

// Fetch Listings
exports.getListings = async (req, res) => {
    const { ticker, page = 1, limit = 10 } = req.query;

    try {
        const listings = await marketplaceService.getListings({ ticker, page, limit });
        res.json({ success: true, data: listings });
    } catch (error) {
        console.error("Error fetching listings:", error.message);
        res.status(500).json({ success: false, message: "Failed to fetch listings." });
    }
};

// Buy a Listing
exports.buyListing = async (req, res) => {
    const { listingId, feeOption, customFee } = req.body;

    try {
        // Fetch listing details
        const listing = await marketplaceService.getListingById(listingId);

        if (!listing) {
            return res.status(404).json({ success: false, message: "Listing not found." });
        }

        // Fetch fee estimates from Kaspa
        const feeEstimates = await kaspaClient.getFeeEstimates();
        let networkFee = feeEstimates[feeOption] || feeEstimates.medium; // Default to medium if feeOption is invalid

        // Use custom fee if provided and valid
        if (customFee && customFee > 0) {
            networkFee = customFee;
        }

        // Calculate platform fee
        const platformFee = (listing.price * 0.0099).toFixed(8); // 0.99% of price

        // Process transaction (Placeholder logic for Kasware APIs)
        const transactionResult = await marketplaceService.processTransaction({
            listing,
            buyer: req.user.address, // Assuming authenticated user's address
            networkFee,
            platformFee,
            feeReceiver: FEE_RECEIVER_ADDRESS,
        });

        res.json({
            success: true,
            message: "Purchase completed successfully.",
            data: transactionResult,
        });
    } catch (error) {
        console.error("Error buying listing:", error.message);
        res.status(500).json({ success: false, message: "Failed to complete purchase." });
    }
};

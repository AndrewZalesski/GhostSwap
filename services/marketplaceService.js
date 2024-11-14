
const Listing = require('../models/Listing');

exports.createListing = async (ticker, quantity, price, feeOption, customFee) => {
    try {
        // Validate inputs
        if (!ticker || ticker.length > 6) throw new Error("Invalid ticker. Must be 1-6 characters.");
        if (quantity <= 0) throw new Error("Quantity must be greater than zero.");
        if (price <= 0) throw new Error("Price must be greater than zero.");

        // Calculate fee logic based on feeOption
        const fee = feeOption === 'custom' ? customFee : 0.01 * price; // Example fee logic

        // Save listing to database
        const listing = new Listing({ ticker, quantity, price, fee });
        await listing.save();

        return listing;
    } catch (error) {
        throw new Error(`Failed to create listing: ${error.message}`);
    }
};

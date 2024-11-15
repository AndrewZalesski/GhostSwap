const Listing = require('../models/Listing');
const TokenStats = require('../models/TokenStats');
exports.getListings = async (req, res) => {
  try {
    const listings = await Listing.find().sort({ createdAt: -1 });
    res.json(listings);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch listings' });
  }
};
exports.createListing = async (req, res) => {
  try {
    const { ticker, amount, price, seller } = req.body;
    const listing = new Listing({ ticker, amount, price, seller });
    await listing.save();
    await TokenStats.findOneAndUpdate(
      { ticker },
      { $inc: { lastVolume: amount, lastTrades: 1 }, lastPurchasedPrice: price },
      { upsert: true }
    );
    res.json({ message: 'Listing created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create listing' });
  }
};
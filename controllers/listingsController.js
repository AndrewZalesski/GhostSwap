
const Listing = require('../models/Listing');

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
    const listing = new Listing({
      ticker,
      amount,
      price,
      lastPurchasedPrice: price,
      seller,
    });
    await listing.save();
    res.json({ message: 'Listing created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create listing' });
  }
};

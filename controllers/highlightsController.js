
const Highlights = require('../models/Highlights');

// Fetch Highlights
exports.getHighlights = async (req, res) => {
  try {
    const highlights = await Highlights.findOne();
    if (!highlights) {
      return res.status(404).json({ error: 'No highlights data found' });
    }
    res.json(highlights);
  } catch (error) {
    res.status(500).json({ error: `Failed to fetch highlights: ${error.message}` });
  }
};

// Update Highlights
exports.updateHighlights = async (req, res) => {
  try {
    const { topGainers, highestVolume, trendingTokens } = req.body;

    // Validate input
    if (!Array.isArray(topGainers) || !Array.isArray(highestVolume) || !Array.isArray(trendingTokens)) {
      return res.status(400).json({ error: 'Invalid input format' });
    }

    let highlights = await Highlights.findOne();

    if (!highlights) {
      highlights = new Highlights();
    }

    highlights.topGainers = topGainers.slice(0, 5).map(item => ({
      ticker: item.ticker || 'N/A',
      priceChange: item.priceChange || 0
    }));
    highlights.highestVolume = highestVolume.slice(0, 5).map(item => ({
      ticker: item.ticker || 'N/A',
      volume: item.volume || 0
    }));
    highlights.trendingTokens = trendingTokens.slice(0, 5).map(item => ({
      ticker: item.ticker || 'N/A',
      trades: item.trades || 0
    }));

    await highlights.save();
    res.json({ message: 'Highlights updated successfully' });
  } catch (error) {
    res.status(500).json({ error: `Failed to update highlights: ${error.message}` });
  }
};

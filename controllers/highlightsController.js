const Highlights = require('../models/Highlights');

exports.getHighlights = async (req, res) => {
  try {
    const highlights = await Highlights.findOne();
    res.json(highlights);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch highlights' });
  }
};

exports.updateHighlights = async (req, res) => {
  try {
    const { topGainers, highestVolume, trendingTokens } = req.body;
    let highlights = await Highlights.findOne();

    if (!highlights) {
      highlights = new Highlights();
    }

    highlights.topGainers = topGainers.slice(0, 5);
    highlights.highestVolume = highestVolume.slice(0, 5);
    highlights.trendingTokens = trendingTokens.slice(0, 5);

    await highlights.save();
    res.json({ message: 'Highlights updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update highlights' });
  }
};
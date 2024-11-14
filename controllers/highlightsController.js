const Highlights = require('../models/Highlights');
exports.getHighlights = async (req, res) => {
  try {
    const highlights = await Highlights.findOne();
    if (!highlights) {
      return res.json({
        topGainers: [],
        highestVolume: [],
        trendingTokens: [],
      });
    }
    const trimmedHighlights = {
      topGainers: highlights.topGainers.slice(0, 5),
      highestVolume: highlights.highestVolume.slice(0, 5),
      trendingTokens: highlights.trendingTokens.slice(0, 5),
    };
    res.json(trimmedHighlights);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch highlights' });
  }
};
exports.updateHighlights = async (req, res) => {
  try {
    const { topGainers, highestVolume, trendingTokens } = req.body;
    let highlights = await Highlights.findOne();
    if (!highlights) highlights = new Highlights();
    highlights.topGainers = topGainers;
    highlights.highestVolume = highestVolume;
    highlights.trendingTokens = trendingTokens;
    await highlights.save();
    res.json({ message: 'Highlights updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update highlights' });
  }
};
const Highlights = require('../models/Highlights');
exports.getHighlights = async (req, res) => {
  try {
    const highlights = await Highlights.findOne();
    res.json(highlights);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch highlights' });
  }
};
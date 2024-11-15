
const ChartData = require('../models/ChartData');

// Fetch Chart Data
exports.getChartData = async (req, res) => {
  try {
    const { ticker } = req.params;

    if (!ticker || typeof ticker !== 'string' || ticker.length > 6) {
      return res.status(400).json({ error: 'Invalid ticker format' });
    }

    const chartData = await ChartData.findOne({ ticker: ticker.trim().toUpperCase() });

    if (!chartData) {
      return res.status(404).json({ error: 'Chart data not found' });
    }

    res.json(chartData);
  } catch (error) {
    res.status(500).json({ error: `Failed to fetch chart data: ${error.message}` });
  }
};

// Update Chart Data
exports.updateChartData = async (req, res) => {
  try {
    const { ticker } = req.params;
    const { data } = req.body;

    if (!ticker || typeof ticker !== 'string' || ticker.length > 6) {
      return res.status(400).json({ error: 'Invalid ticker format' });
    }
    if (!Array.isArray(data) || !data.length) {
      return res.status(400).json({ error: 'Data must be a non-empty array' });
    }

    let chartData = await ChartData.findOne({ ticker: ticker.trim().toUpperCase() });

    if (!chartData) {
      chartData = new ChartData({ ticker: ticker.trim().toUpperCase(), data });
    } else {
      chartData.data = data;
    }

    await chartData.save();
    res.json({ message: 'Chart data updated successfully' });
  } catch (error) {
    res.status(500).json({ error: `Failed to update chart data: ${error.message}` });
  }
};

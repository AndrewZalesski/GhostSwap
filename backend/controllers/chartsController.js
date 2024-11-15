const ChartData = require('../models/ChartData');
exports.getChartData = async (req, res) => {
  try {
    const { ticker } = req.params;
    const chartData = await ChartData.findOne({ ticker });
    res.json(chartData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch chart data' });
  }
};
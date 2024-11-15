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

exports.updateChartData = async (req, res) => {
  try {
    const { ticker } = req.params;
    const { data } = req.body;
    let chartData = await ChartData.findOne({ ticker });

    if (!chartData) {
      chartData = new ChartData({ ticker, data });
    } else {
      chartData.data = data;
    }

    await chartData.save();
    res.json({ message: 'Chart data updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update chart data' });
  }
};
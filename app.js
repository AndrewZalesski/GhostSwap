const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');
const highlightsRoutes = require('./routes/highlights');
const chartsRoutes = require('./routes/charts');
const ordersRoutes = require('./routes/orders');

const app = express();

// Middleware
app.use(
  cors({
    origin: ['https://kasper-3-0.webflow.io', 'https://kaspercoin.net'],
  })
);
app.use(express.json());

// Routes
app.use('/api/highlights', highlightsRoutes);
app.use('/api/charts', chartsRoutes);
app.use('/api/orders', ordersRoutes);

// Error Handler
app.use(errorHandler);

// Database Connection and Server Start
connectDB();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
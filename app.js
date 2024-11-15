
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const highlightsRoutes = require('./routes/highlights');
const listingsRoutes = require('./routes/listings');
const chartsRoutes = require('./routes/charts');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Middleware
app.use(cors({ origin: ['https://kasper-3-0.webflow.io', 'https://kaspercoin.net'] }));
app.use(express.json());

// Routes
app.use('/api/highlights', highlightsRoutes);
app.use('/api/listings', listingsRoutes);
app.use('/api/charts', chartsRoutes);

// Error Handler
app.use(errorHandler);

// Start server
connectDB();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

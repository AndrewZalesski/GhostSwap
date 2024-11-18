const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const ordersRoute = require('./routes/orders');
const path = require('path');
const rateLimit = require('express-rate-limit'); // Import express-rate-limit
const helmet = require('helmet'); // Import Helmet
const morgan = require('morgan'); // Import Morgan

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Rate Limiter Configuration
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: {
    status: 429,
    error: 'Too many requests from this IP, please try again after 15 minutes.'
  },
  headers: true, // Send rate limit info in the `RateLimit-*` headers
});

// Apply Rate Limiter to All Requests
app.use(limiter);

// Use Helmet to secure HTTP headers
app.use(helmet());

// Use Morgan for HTTP request logging
app.use(morgan('combined'));

// CORS Configuration
const allowedOrigins = process.env.ALLOWED_ORIGINS.split(',');

app.use(cors({
  origin: function(origin, callback){
    // Allow requests with no origin (like mobile apps or curl requests)
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, // If you need to handle cookies or authentication tokens
}));

// Middleware
app.use(express.json());

// Routes
app.use('/api/orders', ordersRoute);

// Serve Frontend (Optional)
app.use(express.static(path.join(__dirname, 'public')));

// Fallback to serve index.html for any unmatched routes (for frontend routing)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Root Route
app.get('/', (req, res) => {
  res.send('Welcome to GhostSwap Marketplace Backend!');
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    // Handle JSON parse errors
    return res.status(400).json({ error: 'Invalid JSON payload.' });
  }
  res.status(500).json({ error: 'An unexpected error occurred.' });
});

// Connect to MongoDB and Start Server
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ Connected to MongoDB.');
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}.`);
  });
})
.catch(err => {
  console.error('❌ Failed to connect to MongoDB:', err);
});

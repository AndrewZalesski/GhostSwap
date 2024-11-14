
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const rateLimit = require("express-rate-limit");
const { connectDatabase } = require("./utils/database");
const { ALLOWED_ORIGINS } = require("./config");

const marketplaceRoutes = require("./routes/marketplaceRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");

const app = express();

// Connect to Database
connectDatabase();

// Security headers
app.use(helmet());

// CORS configuration
const allowedOrigins = ALLOWED_ORIGINS.split(",");

app.use(
    cors({
        origin: function (origin, callback) {
            if (allowedOrigins.includes(origin) || !origin) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
    })
);

// Rate limiting
app.use(
    rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100, // Limit each IP to 100 requests per window
        message: { error: "Too many requests. Please try again later." },
    })
);

// Middleware
app.use(compression()); // Compress response bodies
app.use(bodyParser.json()); // Parse JSON requests

// Define your routes
app.use("/marketplace", marketplaceRoutes);
app.use("/analytics", analyticsRoutes);

// Root path handler
app.get("/", (req, res) => {
    res.send("Welcome to GhostSwap!");
});

// Catch-all route for unmatched paths
app.use((req, res) => {
    res.status(404).json({ success: false, message: "Route not found" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;

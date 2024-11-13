const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const morgan = require("morgan");
const connectDatabase = require("./database");
const { ALLOWED_ORIGINS, RATE_LIMIT_WINDOW, RATE_LIMIT_MAX } = require("./config");
const walletRoutes = require("./routes/walletRoutes");
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
        windowMs: RATE_LIMIT_WINDOW,
        max: RATE_LIMIT_MAX,
        message: { error: "Too many requests. Please try again later." },
    })
);

// Logging
app.use(morgan("combined"));

// JSON Parsing Middleware
app.use(express.json());

// Routes
app.use("/wallet", walletRoutes);
app.use("/marketplace", marketplaceRoutes);
app.use("/analytics", analyticsRoutes);

// Centralized error handling
app.use((err, req, res, next) => {
    console.error(err.message);
    if (err.name === "UnauthorizedError") {
        res.status(401).send({ error: "Unauthorized access" });
    } else if (err.message === "Not allowed by CORS") {
        res.status(403).send({ error: "Access denied. Invalid origin." });
    } else {
        res.status(500).send({ error: "Internal Server Error" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;

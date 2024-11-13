require("dotenv").config();

module.exports = {
    PORT: process.env.PORT || 3000,
    DB_URI: process.env.DB_URI || "mongodb://localhost:27017/ghostswap",
    ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS || "https://kasper-3-0.webflow.io,https://kaspercoin.net",
    KASPA_API_URL: process.env.KASPA_API_URL || "https://api.kaspa.org",
    KASPLEX_API_URL: process.env.KASPLEX_API_URL || "https://api.kasplex.org/v1",
    RATE_LIMIT_WINDOW: parseInt(process.env.RATE_LIMIT_WINDOW, 10) || 15 * 60 * 1000,
    RATE_LIMIT_MAX: parseInt(process.env.RATE_LIMIT_MAX, 10) || 100,
};

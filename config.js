require("dotenv").config();

module.exports = {
    TESTNET_FEE_WALLET: "kaspatest:qrpfg7ygceglm40pkvnhqykd4f6prhj4xhq35f3mgrkau6sfm8chgnzukrxrq",
    MAINNET_FEE_WALLET: "kaspa:qqclapm8ztmkmv8l0zthzg5cv40uer5jk0dv7fplpxu499eklak4j2crngyth",
    PORT: process.env.PORT || 3000,
    DB_URI: process.env.DB_URI || "mongodb://localhost:27017/ghostswap",
    ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS || "https://kasper-3-0.webflow.io,https://kaspercoin.net,https://ghostswap-69212846b3d2.herokuapp.com/",
    KASPA_API_URL: process.env.KASPA_API_URL || "https://api.kaspa.org",
    KASPLEX_API_URL: process.env.KASPLEX_API_URL || "https://api.kasplex.org/v1",
    RATE_LIMIT_WINDOW: parseInt(process.env.RATE_LIMIT_WINDOW, 10) || 15 * 60 * 1000,
    RATE_LIMIT_MAX: parseInt(process.env.RATE_LIMIT_MAX, 10) || 100,
};


const express = require("express");
const router = express.Router();
const { getMarketHistory } = require("../controllers/marketHistoryController");

// Market History Endpoint
router.get("/market-history/:ticker", getMarketHistory);

module.exports = router;

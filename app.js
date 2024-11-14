
const express = require("express");
const bodyParser = require("body-parser");
const marketplaceRoutes = require("./routes/marketplaceRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");

const app = express();

// Trust proxy for rate limiting
app.set("trust proxy", 1);

app.use(bodyParser.json());

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

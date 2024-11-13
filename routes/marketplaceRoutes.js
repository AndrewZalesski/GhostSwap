// Routes for marketplace actions
const express = require('express');
const router = express.Router();
const marketplaceController = require('../controllers/marketplaceController');

router.post('/listings', marketplaceController.createListing);

module.exports = router;
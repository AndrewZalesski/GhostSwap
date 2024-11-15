
const express = require('express');
const router = express.Router();
const listingsController = require('../controllers/listingsController');

router.get('/', listingsController.getListings);
router.post('/', listingsController.createListing);

module.exports = router;

const express = require('express');
const router = express.Router();
const highlightsController = require('../controllers/highlightsController');
router.get('/', highlightsController.getHighlights);
module.exports = router;
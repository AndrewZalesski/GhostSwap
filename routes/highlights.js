const express = require('express');
const router = express.Router();
const highlightsController = require('../controllers/highlightsController');

router.get('/', highlightsController.getHighlights);
router.put('/', highlightsController.updateHighlights);

module.exports = router;
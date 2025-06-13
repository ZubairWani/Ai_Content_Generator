// server/routes/analyticsRoutes.js
const express = require('express');
const { getAnalyticsData } = require('../controllers/analyticsController');
const router = express.Router();

router.get('/', getAnalyticsData);

module.exports = router;
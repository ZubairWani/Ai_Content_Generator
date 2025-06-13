// server/routes/openaiRoutes.js
const express = require('express');
const { generateContent } = require('../controllers/openaiController');
const router = express.Router();

router.post('/generate', generateContent);

module.exports = router;
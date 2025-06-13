// server/controllers/analyticsController.js
const fs = require('fs');
const path = require('path');

const getAnalyticsData = (req, res) => {
    try {
        const dataPath = path.join(__dirname, '..', 'data', 'mockAnalytics.json');
        const rawData = fs.readFileSync(dataPath);
        const analyticsData = JSON.parse(rawData);
        res.json(analyticsData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error: Could not fetch analytics data' });
    }
};

module.exports = { getAnalyticsData };
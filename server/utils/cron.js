const cron = require('node-cron');
const axios = require('axios');

function initializeCronJobs() {
cron.schedule('*/14 * * * *', async () => {
    try {
        console.log('Running cron job at:', new Date().toISOString());

        // Make GET request to the root endpoint
        const response = await axios.get('https://ai-content-generator-server-z1e2.onrender.com');
       

        console.log('API response status:', response.status);
        console.log('API response data:', response.data);
    } catch (error) {
        console.error('Error in cron job:', error.message);

        // If the error has a response property, log more details
        if (error.response) {
            console.error('Status:', error.response.status);
            console.error('Data:', error.response.data);
        }
    }
});

    console.log('Cron jobs initialized.');
}



// generateAutomatedServices()
// updateAllPurifiersFilterHealth()
module.exports = initializeCronJobs;
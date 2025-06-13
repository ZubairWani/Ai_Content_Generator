// server/server.js
const dotenv = require('dotenv');

dotenv.config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const analyticsRoutes = require('./routes/analyticsRoutes');
const openaiRoutes = require('./routes/openaiRoutes');
const userRoutes = require('./routes/userRoutes'); 


console.log('My OpenAI Key:', process.env.OPENAI_API_KEY ? 'Loaded' : 'Missing'); 


connectDB();

const app = express();

app.use(cors());


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/analytics', analyticsRoutes);
app.use('/api/openai', openaiRoutes);
app.use('/api/users', userRoutes); 

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const app = express();
dotenv.config();

// CORS Configuration with more permissive settings for development
app.use(cors({
    origin: true, // Allow all origins
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware
app.use(express.json());

// MongoDB Connection with default URL if env variable is not set
const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://localhost:27017/coconutdb';
mongoose.connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connection established successfully for Register Server!'))
.catch((error) => console.error('MongoDB connection error:', error));

// Import routes
const registerRoute = require('./routes/register');

// Use routes
app.use('/register', registerRoute);

const PORT = process.env.PORT || 8072;
app.listen(PORT, () => {
    console.log(`🚀 Register Server is running on port: ${PORT}`);
}); 
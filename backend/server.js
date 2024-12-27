const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoute'); // Add order routes
const morgan = require('morgan');
const  errorHandler = require('./middlewares/handlers');
const redis = require("redis");





// Load environment variables
dotenv.config();

const app = express();



// Middleware
app.use(cors({
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, 
    allowedHeaders: 'Content-Type,Authorization',
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(morgan('tiny'));
app.use(errorHandler);
// Routes
app.use('/api', userRoutes);
app.use('/api/orders', orderRoutes); // Add order routes

app.get('/test', async (req, res) => {
    try {
        await client.set('testKey', 'testValue', { EX: 60 });
        const value = await client.get('testKey');
        res.json({ message: 'Redis is working', value });
    } catch (error) {
        res.status(500).json({ message: 'Redis error', error });
    }
});

// Test route
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to WEB3 API' });
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({
        status: 'error',
        message: 'Route not found'
    });
});

// Global error handler
app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        status: 'error',
        message: err.message || 'Internal server error'
    });
});

// Database connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection error:', err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
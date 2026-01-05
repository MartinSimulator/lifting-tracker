// load vars from .env
require('dotenv').config();

// import libraries express, mongoose, and cors
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
// create server instance where app is the backend application object
const app = express()
// import routes
const workoutRoutes = require('./routes/workouts');

// allow frontend to talk to us
app.use(cors());
// allow us to read expression sent in request body
app.use(express.json());
// use the workout routes
app.use('/api/workouts', workoutRoutes);


// connect to mongodb database
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log('MongoDB connection error', err));

// test to make sure server works
app.get('/', (req, res) => {
    res.send('API is running...');
});

// start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
console.log('Starting app...');
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

const plantRoutes = require('./Routes/plants');
const gardenerRoutes = require('./Routes/gardeners');
const harvestRoutes = require('./Routes/harvest');
const mongoose = require('mongoose');

dotenv.config();

const app = express();
app.use(express.json());


app.use('/api/plants', plantRoutes);
app.use('/api/gardeners', gardenerRoutes);
app.use('/api/harvests', harvestRoutes);

connectDB()
.then(() => {
  app.listen(3000, () => console.log('Server running on port 3000'));
}).catch(err => {
  console.error('MongoDB connection error:', err);
});
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Allows all origins
app.use(express.json());
  // Remove favicon.ico 404 error
  app.get('/favicon.ico', (req, res) => res.status(204).end());

// Routes
const placeRoutes = require('./routes/placeRoutes');
app.use('/api/places', placeRoutes);
app.get('/', (req, res) => res.send('Travel Wishlist API'));
// Connect MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch(err => console.error('Mongo error:', err));

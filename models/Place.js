const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  notes: String,
  image: String,
  visited: { type: Boolean, default: false }
});

module.exports = mongoose.model('Place', placeSchema);

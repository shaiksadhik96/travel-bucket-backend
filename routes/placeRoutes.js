const express = require('express');
const router = express.Router();
const Place = require('../models/Place');

// Create
router.post('/', async (req, res) => {
  try {
    const place = await Place.create(req.body);
    res.status(201).json(place);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Read All
router.get('/', async (req, res) => {
  const places = await Place.find();
  res.json(places);
});

// Update
router.put('/:id', async (req, res) => {
  try {
    const place = await Place.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(place);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete
router.delete('/:id', async (req, res) => {
  await Place.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;

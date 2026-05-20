const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Trip = require('../models/Trip.js');

// Authentication Middleware
const auth = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.id;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token validation failed' });
  }
};

router.post('/', auth, async (req, res) => {
  try {
    const { destination, startDate, endDate, totalBudget, itineraries } = req.body;
    const newTrip = new Trip({ userId: req.user, destination, startDate, endDate, totalBudget, itineraries });
    const savedTrip = await newTrip.save();
    res.json(savedTrip);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const trips = await Trip.find({ userId: req.user });
    res.json(trips);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    await Trip.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
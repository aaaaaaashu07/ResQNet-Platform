const express = require('express');
const router = express.Router();
const { User, SOSAlert, MissingReport, Volunteer, Donation } = require('../models/Schemas');

// --- Auth Endpoints ---
router.post('/auth/register', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post('/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- SOS Communication ---
router.post('/sos', async (req, res) => {
  try {
    const alert = new SOSAlert(req.body);
    await alert.save();
    
    // Broadcast message to any socket.io clients to reload dashboard data immediately 
    req.io.emit('data_updated'); 
    
    res.status(201).json(alert);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/sos', async (req, res) => {
  try {
    const alerts = await SOSAlert.find().sort({ priority: -1 }); // Highest severity first
    res.json(alerts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- Missing Persons ---
router.post('/missing', async (req, res) => {
  try {
    const report = new MissingReport(req.body);
    await report.save();
    req.io.emit('data_updated'); // Alert war room
    res.status(201).json(report);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/missing', async (req, res) => {
  try {
    const reports = await MissingReport.find().sort({ _id: -1 });
    res.json(reports);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- NGO / Roles ---
router.post('/volunteer', async (req, res) => {
  try {
    const vol = new Volunteer(req.body);
    await vol.save();
    req.io.emit('data_updated');
    res.status(201).json(vol);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post('/donate', async (req, res) => {
  try {
    const donation = new Donation(req.body);
    await donation.save();
    req.io.emit('data_updated');
    res.status(201).json(donation);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;

const mongoose = require('mongoose');

// Unified file for simplistic Mongoose schemas

const UserSchema = new mongoose.Schema({
  id: String,
  photo: String, // Base64 encoding
  name: String,
  age: Number,
  blood: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: String,
  aadhaar: String,
  aadhaarMasked: String,
  address: String,
  disabilities: [String],
  medical: String,
  role: { type: String, default: 'user' }
});

const SOSAlertSchema = new mongoose.Schema({
  id: String,
  userId: String,
  user: Object, // Embedded user object for speed
  location: { lat: Number, lng: Number },
  battery: Number,
  type: String,
  desc: String,
  people: Number,
  priority: Number,
  timestamp: Number,
  status: { type: String, default: 'active' }
});

const MissingReportSchema = new mongoose.Schema({
  id: String,
  auto: Boolean,
  name: String,
  age: Number,
  phone: String,
  location: String,
  time: String,
  desc: String,
  medical: String,
  reporter: String,
  relation: String,
  status: { type: String, default: 'Reported' }
});

const VolunteerSchema = new mongoose.Schema({
  id: String,
  userId: String,
  name: String,
  contact: String,
  aadhaar: String,
  ngo: String,
  skills: [String],
  date: { type: Date, default: Date.now }
});

const DonationSchema = new mongoose.Schema({
  id: String,
  userId: String,
  cause: String,
  amount: Number,
  date: { type: Date, default: Date.now }
});

module.exports = {
  User: mongoose.model('User', UserSchema),
  SOSAlert: mongoose.model('SOSAlert', SOSAlertSchema),
  MissingReport: mongoose.model('MissingReport', MissingReportSchema),
  Volunteer: mongoose.model('Volunteer', VolunteerSchema),
  Donation: mongoose.model('Donation', DonationSchema)
};

const mongoose = require('mongoose');

const DriverSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  currentLat: { type: Number },
  currentLng: { type: Number },
  available: { type: Boolean, default: true }
});

module.exports = mongoose.model('Driver', DriverSchema);

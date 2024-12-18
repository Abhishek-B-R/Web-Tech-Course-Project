const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  status: { type: String, enum: ['Present', 'Absent'], required: true },
});

module.exports = mongoose.model('Student', studentSchema);

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
  rollno: { type: Number, required: true },     // Roll number
  subject: { type: String, required: true },   // Subject
  attendence: { type: Boolean, required: true } // Attendance
});

// Create a unique index on the combination of rollno and subject
studentSchema.index({ rollno: 1, subject: 1 }, { unique: true });

const StudentModel = mongoose.model("Student", studentSchema);
module.exports = StudentModel;

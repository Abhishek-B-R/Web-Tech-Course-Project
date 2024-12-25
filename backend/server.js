const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

const Student = require('./db');

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: "http://localhost:5173", // Update to match the frontend URL
  methods: ["GET", "POST"],       // Specify allowed methods
  credentials: true               // Allow credentials if required
}));

app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error(err));

// Routes
app.get('/Students', async (req, res) => {
  const Students = await Student.find();
  res.json(Students);
});

app.post('/Students', async (req, res) => {
  const studentData = req.body; // Expecting an array of student objects

  // Validate input
  if (!Array.isArray(studentData) || studentData.length === 0) {
    return res.status(400).json({ error: "Invalid or missing data" });
  }

  // Transform data to ensure proper structure
  const transformedData = studentData.map((student) => ({
    rollno: student.rollNo || 0,
    bookletNo: student.bookletNumber || 0,
    subject: student.subject || "Unknown",
    attendence: typeof student.attendence === "boolean" ? student.attendence : false,
  }));

  // Validate entries for any missing or incorrect data
  const invalidEntries = transformedData.filter(
    (student) =>
      typeof student.rollno !== "number" ||
      typeof student.bookletNo !== "number" ||
      typeof student.subject !== "string" ||
      typeof student.attendence !== "boolean"
  );

  if (invalidEntries.length > 0) {
    return res.status(400).json({
      error: "Some entries have missing or invalid fields",
      invalidEntries,
    });
  }

  try {
    // Insert validated data into MongoDB
    const result = await Student.insertMany(transformedData, { ordered: false });
    res.status(201).json({ message: "Students added successfully", data: result });
  } catch (err) {
    console.error("Error while inserting students:", err);
    res.status(500).json({
      error: "Failed to save some or all students",
      details: err.message,
    });
  }
});



app.post('/',async (req,res)=>{
  const { name , status } = req.body;
})

app.listen(5000, () => console.log('Server running on http://localhost:5000'));

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

  if (!Array.isArray(studentData) || studentData.length === 0) {
    return res.status(400).json({ error: "Invalid or missing data" });
  }

  try {
    // Insert all entries directly into the database
    const result = await Student.insertMany(studentData, { ordered: false });
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

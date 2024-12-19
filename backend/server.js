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
  const { attendanceArray, startNo, selectedSubject } = req.body;

  if (!attendanceArray || !startNo || !selectedSubject) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const studentData = attendanceArray.map((attendance, index) => ({
    rollno: startNo + index + 1,
    subject: selectedSubject,
    attendence: attendance,
  }));

  try {
    // Check for duplicates and only insert new records
    const bulkOps = studentData.map((student) => ({
      updateOne: {
        filter: { rollno: student.rollno, subject: student.subject },
        update: { $setOnInsert: student },
        upsert: true,
      },
    }));

    const result = await Student.bulkWrite(bulkOps);
    res.status(201).json({ message: "Students added successfully", data: result });
  } catch (err) {
    console.error("Error while inserting students:", err);
    res.status(500).json({ error: "Failed to save students", details: err.message });
  }
});




app.post('/',async (req,res)=>{
    const { name , status } = req.body;
})

app.listen(5000, () => console.log('Server running on http://localhost:5000'));

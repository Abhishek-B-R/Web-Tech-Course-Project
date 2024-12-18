const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

const Student = require('./db');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
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
  const { name, status } = req.body;
  const newStudent = new Student({ name, status });
  await newStudent.save();
  res.json(newStudent);
});

app.post('/',async (req,res)=>{
    const { name , status } = req.body;
})

app.listen(5000, () => console.log('Server running on http://localhost:5000'));

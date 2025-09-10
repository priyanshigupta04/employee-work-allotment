const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const managerRoutes = require('./routes/manager');
const employeeRoutes = require('./routes/employee');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// 🚨 ADD TH TEST ROUTES FIRST - CRITICAL!
app.get('/', (req, res) => {
  res.send('Backend Server is Running!');
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Backend is running', timestamp: new Date() });
});

app.get('/api/test', (req, res) => {
  res.json({ message: 'Test route is working!', success: true });
});

// Your existing routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/manager', managerRoutes);
app.use('/api/employee', employeeRoutes);

// Database connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.log(err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

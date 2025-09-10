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
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://employee-work-allotment-frontend.onrender.com',
    'https://employee-work-allotment-frontend.vercel.app'
  ],
  credentials: true
}));
app.use(express.json());

// Routes
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
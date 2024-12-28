// filepath: /d:/WebProject/Webproject/backend/scripts/createAdmin.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const Admin = require('../models/Admin');

dotenv.config();

mongoose.connect("mongodb://localhost:27017/webproject01")
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection error:', err));

const createAdmin = async () => {
  const email = 'admin@example.com';
  const password = 'adminpassword';

  const hashedPassword = await bcrypt.hash(password, 10);

  const admin = new Admin({
    email,
    password: hashedPassword,
  });

  await admin.save();
  console.log('Admin user created');
  mongoose.connection.close();
};

createAdmin();
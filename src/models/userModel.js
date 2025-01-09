// src/models/userModel.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  topics: { type: Array, default: [] }, 
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  // Only hash the password if it has been modified and is not already hashed
  if (this.isModified('password') && !this.password.startsWith('$2')) {
    try {
      this.password = await bcrypt.hash(this.password, 10);
      next();
    } catch (error) {
      return next(error);
    }
  } else {
    return next();
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
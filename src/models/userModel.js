// src/models/userModel.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  firebaseUserId: { type: String, required: true, unique: true },
  username: { type: String, required: true},
  password: { type: String },
  topics:{type : [
    {
      language: { type: String, required: true },
      topics: [
        {
          id: { type: Number, required: true },
          name: { type: String, required: true },
          completed: { type: Boolean, default: false },
          subtopics: [
            {
              id: { type: Number, required: true },
              name: { type: String, required: true },
              completed: { type: Boolean, default: false },
            },
          ],
        },
      ],
    },
  ], default :[]}
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
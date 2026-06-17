const mongoose = require('mongoose');

const MentorSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  bio: {
    type: String,
    required: [true, 'Bio is required'],
    trim: true,
  },
  company: {
    type: String,
    required: [true, 'Company/Organization name is required'],
    trim: true,
  },
  role: {
    type: String,
    required: [true, 'Professional role/title is required'],
    trim: true,
  },
  specialties: [{
    type: String,
    trim: true,
  }],
  experience: {
    type: Number,
    required: [true, 'Years of experience is required'],
  },
  pricing: {
    type: Number,
    required: [true, 'Session pricing (INR per hour) is required'],
    default: 99,
  },
  rating: {
    type: Number,
    default: 5.0,
  },
  reviewsCount: {
    type: Number,
    default: 0,
  },
  availability: [{
    day: { type: String, required: true }, // e.g., "Monday"
    slots: [{ type: String, required: true }] // e.g., ["14:00 - 15:00", "18:00 - 19:00"]
  }],
  status: {
    type: String,
    enum: ['pending', 'approved', 'suspended'],
    default: 'pending',
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('Mentor', MentorSchema);

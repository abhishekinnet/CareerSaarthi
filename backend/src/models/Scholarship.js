const mongoose = require('mongoose');

const ScholarshipSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Scholarship title is required'],
    trim: true,
  },
  provider: {
    type: String,
    required: [true, 'Provider is required'],
    trim: true,
  },
  amount: {
    type: String, // e.g., "₹50,000 / Year" or "Full Tuition"
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  eligibility: [{
    type: String,
    trim: true,
  }],
  category: {
    type: String,
    enum: ['Government', 'Private', 'International', 'EWS', 'Women Merit', 'Merit-Based'],
    required: true,
  },
  deadline: {
    type: Date,
    required: true,
  },
  applicationLink: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('Scholarship', ScholarshipSchema);

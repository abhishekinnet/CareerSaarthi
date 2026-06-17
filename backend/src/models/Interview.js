const mongoose = require('mongoose');

const InterviewSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  role: {
    type: String,
    required: true, // e.g. "Frontend Engineer"
  },
  status: {
    type: String,
    enum: ['in-progress', 'completed'],
    default: 'in-progress',
  },
  history: [{
    question: { type: String, required: true },
    answer: { type: String, default: '' },
    feedback: { type: String, default: '' },
    score: { type: Number, default: 0 },
    timestamp: { type: Date, default: Date.now },
  }],
  overallScore: {
    type: Number,
    default: 0,
  },
  communicationFeedback: {
    clarity: { type: String, default: '' },
    pacing: { type: String, default: '' },
    suggestions: [{ type: String }],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('Interview', InterviewSchema);

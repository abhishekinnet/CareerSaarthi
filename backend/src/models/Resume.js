const mongoose = require('mongoose');

const ResumeSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  filename: {
    type: String,
    required: true,
  },
  fileUrl: {
    type: String,
    required: true,
  },
  targetRole: {
    type: String,
    default: 'Software Engineer',
  },
  atsScore: {
    type: Number,
    required: true,
    default: 0,
  },
  analysis: {
    formattingScore: { type: Number, default: 0 },
    keywordsFound: [{ type: String }],
    missingKeywords: [{ type: String }],
    suggestions: [{ type: String }],
    impactStatements: [{ type: String }],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('Resume', ResumeSchema);

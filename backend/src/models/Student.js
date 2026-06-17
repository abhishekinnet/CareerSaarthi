const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  interests: [{
    type: String,
    trim: true,
  }],
  skills: [{
    type: String,
    trim: true,
  }],
  academicPerformance: {
    gradeLevel: { type: String, default: '' }, // e.g., "10th", "12th", "Undergraduate"
    stream: { type: String, default: '' },      // e.g., "Science", "Commerce", "Arts"
    percentageOrGpa: { type: Number, default: 0 },
    favoriteSubjects: [{ type: String }],
  },
  careerGoals: [{
    type: String,
    trim: true,
  }],
  financialGoals: {
    targetSalaryRange: { type: String, default: '' }, // e.g., "5-10 LPA"
    maxHigherEducationBudget: { type: Number, default: 0 },
  },
  resumeUrl: {
    type: String,
    default: '',
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('Student', StudentSchema);

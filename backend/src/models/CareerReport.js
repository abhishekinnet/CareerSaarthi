const mongoose = require('mongoose');

const CareerReportSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  inputs: {
    interests: [String],
    skills: [String],
    academicPerformance: {
      gradeLevel: String,
      stream: String,
      percentageOrGpa: Number,
      favoriteSubjects: [String],
    },
    careerGoals: [String],
    financialGoals: {
      targetSalaryRange: String,
      maxHigherEducationBudget: Number,
    }
  },
  recommendedCareers: [{
    title: { type: String, required: true },
    description: { type: String, required: true },
    matchPercentage: { type: Number, required: true },
    roadmap: [{
      phase: String,
      description: String,
      estimatedTime: String,
      skillsToAcquire: [String],
      recommendedCourses: [String],
    }],
    skillsRequired: [String],
    colleges: [String],
    scholarships: [String],
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('CareerReport', CareerReportSchema);

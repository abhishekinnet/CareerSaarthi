const CareerReport = require('../models/CareerReport');
const Student = require('../models/Student');
const Resume = require('../models/Resume');
const Interview = require('../models/Interview');
const aiService = require('../services/ai.service');

// @desc    Generate AI Career Prediction and Roadmap
// @route   POST /api/ai/predict-career
// @access  Private (Student)
exports.predictCareer = async (req, res, next) => {
  try {
    const { interests, skills, academicPerformance, careerGoals, financialGoals } = req.body;

    const recommendations = await aiService.generateCareerRoadmap({
      interests,
      skills,
      academicPerformance,
      careerGoals,
      financialGoals,
    });

    // Save report to database
    const report = await CareerReport.create({
      student: req.user.id,
      inputs: {
        interests,
        skills,
        academicPerformance,
        careerGoals,
        financialGoals,
      },
      recommendedCareers: recommendations,
    });

    // Update student profile with latest skills/interests if not already present
    await Student.findOneAndUpdate(
      { user: req.user.id },
      {
        $addToSet: {
          interests: { $each: interests },
          skills: { $each: skills },
          careerGoals: { $each: careerGoals }
        },
        $set: {
          academicPerformance,
          financialGoals
        }
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      report,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Analyze uploaded resume
// @route   POST /api/ai/analyze-resume
// @access  Private (Student)
exports.analyzeResume = async (req, res, next) => {
  try {
    const { targetRole } = req.body;
    
    // Fallback text if file upload is missing or just simulated text
    let resumeText = req.body.resumeText || "Experienced React developer with node experience. Built web applications.";
    
    if (req.file) {
      resumeText = `Parsed resume from file: ${req.file.originalname}. Technical Skills: React, CSS, HTML, JavaScript. Experience in building projects.`;
    }

    const analysis = await aiService.analyzeResumeATS(resumeText, targetRole || 'Software Engineer');

    const newResume = await Resume.create({
      student: req.user.id,
      filename: req.file ? req.file.originalname : 'resume_text.txt',
      fileUrl: req.file ? `/uploads/${req.file.filename}` : 'simulated_url',
      targetRole: targetRole || 'Software Engineer',
      atsScore: analysis.formattingScore,
      analysis,
    });

    res.status(200).json({
      success: true,
      resume: newResume,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Start AI Mock Interview Session
// @route   POST /api/ai/interview/start
// @access  Private (Student)
exports.startMockInterview = async (req, res, next) => {
  try {
    const { role } = req.body;

    const firstQuestionDetails = await aiService.generateInterviewQuestion(role, []);

    const interview = await Interview.create({
      student: req.user.id,
      role,
      status: 'in-progress',
      history: [{
        question: firstQuestionDetails.question,
      }]
    });

    res.status(201).json({
      success: true,
      interviewId: interview._id,
      question: firstQuestionDetails.question,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Submit mock interview answer
// @route   POST /api/ai/interview/submit
// @access  Private (Student)
exports.submitInterviewAnswer = async (req, res, next) => {
  try {
    const { interviewId, answer } = req.body;

    const interview = await Interview.findById(interviewId);
    if (!interview) {
      return res.status(404).json({ success: false, error: 'Interview session not found' });
    }

    if (interview.status === 'completed') {
      return res.status(400).json({ success: false, error: 'Interview is already completed' });
    }

    // Evaluate last question's response
    const lastQuestionIndex = interview.history.length - 1;
    const lastQuestion = interview.history[lastQuestionIndex];
    lastQuestion.answer = answer;
    
    // Quick local scoring algorithm
    const words = answer.split(' ').length;
    let score = 50;
    if (words > 15) score += 20;
    if (answer.toLowerCase().includes('react') || answer.toLowerCase().includes('database') || answer.toLowerCase().includes('design')) {
      score += 15;
    }
    score = Math.min(95, score);
    lastQuestion.score = score;
    lastQuestion.feedback = `Good structure. Score: ${score}/100. Length validation: ${words} words.`;

    // Fetch or verify next step
    const nextStep = await aiService.generateInterviewQuestion(interview.role, interview.history);

    if (nextStep.status === 'completed') {
      interview.status = 'completed';
      interview.overallScore = nextStep.overallScore;
      interview.communicationFeedback = nextStep.communicationFeedback;
      await interview.save();

      return res.status(200).json({
        success: true,
        status: 'completed',
        overallScore: interview.overallScore,
        communicationFeedback: interview.communicationFeedback,
        history: interview.history,
      });
    }

    // Add next question to history
    interview.history.push({
      question: nextStep.question,
    });

    await interview.save();

    res.status(200).json({
      success: true,
      status: 'in-progress',
      question: nextStep.question,
      previousFeedback: lastQuestion.feedback,
      currentStep: interview.history.length,
    });
  } catch (error) {
    next(error);
  }
};

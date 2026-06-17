const express = require('express');
const multer = require('multer');
const path = require('path');
const { predictCareer, analyzeResume, startMockInterview, submitInterviewAnswer } = require('../controllers/ai.controller');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Multer Config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../../uploads/'));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  fileFilter: (req, file, cb) => {
    const filetypes = /pdf|doc|docx|txt/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    if (extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only PDF, DOC, DOCX, and TXT files are allowed.'));
    }
  }
});

router.post('/predict-career', protect, predictCareer);
router.post('/analyze-resume', protect, upload.single('resume'), analyzeResume);
router.post('/interview/start', protect, startMockInterview);
router.post('/interview/submit', protect, submitInterviewAnswer);

module.exports = router;

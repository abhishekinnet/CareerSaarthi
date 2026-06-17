const User = require('../models/User');
const Student = require('../models/Student');
const Mentor = require('../models/Mentor');
const jwt = require('jsonwebtoken');
const emailService = require('../services/email.service');

// Helper to generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'fallback_secret_for_development_purposes', {
    expiresIn: process.env.JWT_EXPIRE || '30d',
  });
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ success: false, error: 'User already exists with this email' });
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 mins

    const user = await User.create({
      name,
      email,
      password,
      role: role || 'student',
      otp,
      otpExpires,
    });

    // Create corresponding Profile
    if (user.role === 'student') {
      await Student.create({ user: user._id });
    } else if (user.role === 'mentor') {
      await Mentor.create({
        user: user._id,
        bio: 'Please edit your bio.',
        company: 'Edit company',
        role: 'Edit role',
        experience: 1,
      });
    }

    // Send OTP email
    await emailService.sendOtpEmail(user.email, user.name, otp);

    res.status(201).json({
      success: true,
      message: 'Registration successful. Verification OTP sent to your email.',
      userId: user._id,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Verify OTP
// @route   POST /api/auth/verify-otp
// @access  Public
exports.verifyOtp = async (req, res, next) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({
      email,
      otp,
      otpExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ success: false, error: 'Invalid or expired OTP' });
    }

    user.isVerified = true;
    user.otp = null;
    user.otpExpires = null;
    await user.save();

    res.status(200).json({
      success: true,
      token: generateToken(user._id),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isVerified: user.isVerified,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }

    if (!user.isVerified) {
      // Re-trigger OTP
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      user.otp = otp;
      user.otpExpires = new Date(Date.now() + 10 * 60 * 1000);
      await user.save();
      await emailService.sendOtpEmail(user.email, user.name, otp);

      return res.status(403).json({
        success: false,
        error: 'Account not verified. A new OTP has been sent to your email.',
        requiresVerification: true,
      });
    }

    res.status(200).json({
      success: true,
      token: generateToken(user._id),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get current logged in user profile
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res, next) => {
  try {
    let profile = null;
    if (req.user.role === 'student') {
      profile = await Student.findOne({ user: req.user.id });
    } else if (req.user.role === 'mentor') {
      profile = await Mentor.findOne({ user: req.user.id });
    }

    res.status(200).json({
      success: true,
      user: req.user,
      profile,
    });
  } catch (error) {
    next(error);
  }
};

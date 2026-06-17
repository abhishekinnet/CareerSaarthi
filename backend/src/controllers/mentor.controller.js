const Mentor = require('../models/Mentor');
const Booking = require('../models/Booking');
const User = require('../models/User');
const paymentService = require('../services/payment.service');
const emailService = require('../services/email.service');

// @desc    Get all approved mentors
// @route   GET /api/mentors
// @access  Public
exports.getMentors = async (req, res, next) => {
  try {
    const { search, specialty } = req.query;
    let query = { status: 'approved' };

    if (specialty) {
      query.specialties = { $in: [new RegExp(specialty, 'i')] };
    }

    let mentors = await Mentor.find(query).populate('user', 'name email avatar');

    if (search) {
      mentors = mentors.filter(mentor => 
        mentor.user.name.toLowerCase().includes(search.toLowerCase()) ||
        mentor.role.toLowerCase().includes(search.toLowerCase()) ||
        mentor.company.toLowerCase().includes(search.toLowerCase())
      );
    }

    res.status(200).json({ success: true, count: mentors.length, mentors });
  } catch (error) {
    next(error);
  }
};

// @desc    Get mentor by ID
// @route   GET /api/mentors/:id
// @access  Public
exports.getMentorById = async (req, res, next) => {
  try {
    const mentor = await Mentor.findById(req.params.id).populate('user', 'name email avatar');
    if (!mentor) {
      return res.status(404).json({ success: false, error: 'Mentor profile not found' });
    }
    res.status(200).json({ success: true, mentor });
  } catch (error) {
    next(error);
  }
};

// @desc    Update mentor profile details
// @route   PUT /api/mentors/profile
// @access  Private (Mentor only)
exports.updateProfile = async (req, res, next) => {
  try {
    const { bio, company, role, specialties, experience, pricing, availability } = req.body;

    const mentor = await Mentor.findOneAndUpdate(
      { user: req.user.id },
      {
        bio,
        company,
        role,
        specialties,
        experience,
        pricing,
        availability,
        updatedAt: Date.now()
      },
      { new: true, runValidators: true }
    );

    if (!mentor) {
      return res.status(404).json({ success: false, error: 'Mentor profile not found' });
    }

    res.status(200).json({ success: true, mentor });
  } catch (error) {
    next(error);
  }
};

// @desc    Book a mentorship session (Includes mock checkout)
// @route   POST /api/mentors/book
// @access  Private (Student only)
exports.bookSession = async (req, res, next) => {
  try {
    const { mentorId, slot, notes } = req.body;

    const mentorProfile = await Mentor.findById(mentorId).populate('user', 'name email');
    if (!mentorProfile) {
      return res.status(404).json({ success: false, error: 'Mentor profile not found' });
    }

    // Create Booking
    const booking = await Booking.create({
      student: req.user.id,
      mentor: mentorProfile.user._id,
      slot,
      notes,
      status: 'pending',
      paymentStatus: 'pending',
    });

    // Process payment (Simulated auto checkout)
    await paymentService.processMockPayment({
      userId: req.user.id,
      bookingId: booking._id,
      amount: mentorProfile.pricing,
    });

    // Send emails
    await emailService.sendBookingConfirmation(
      req.user.email,
      req.user.name,
      mentorProfile.user.name,
      slot,
      `https://meet.jit.si/careersaathi_${booking._id}`
    );

    res.status(201).json({
      success: true,
      message: 'Mentorship session booked and payment processed successfully.',
      bookingId: booking._id,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get bookings/sessions list
// @route   GET /api/mentors/bookings
// @access  Private
exports.getBookings = async (req, res, next) => {
  try {
    let bookings;
    if (req.user.role === 'student') {
      bookings = await Booking.find({ student: req.user.id })
        .populate('mentor', 'name email avatar')
        .sort('-createdAt');
    } else if (req.user.role === 'mentor') {
      bookings = await Booking.find({ mentor: req.user.id })
        .populate('student', 'name email avatar')
        .sort('-createdAt');
    } else {
      bookings = await Booking.find()
        .populate('student', 'name email')
        .populate('mentor', 'name email')
        .sort('-createdAt');
    }

    res.status(200).json({ success: true, count: bookings.length, bookings });
  } catch (error) {
    next(error);
  }
};

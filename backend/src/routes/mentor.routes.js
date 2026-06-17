const express = require('express');
const { getMentors, getMentorById, updateProfile, bookSession, getBookings } = require('../controllers/mentor.controller');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/', getMentors);
router.get('/bookings', protect, getBookings);
router.get('/:id', getMentorById);
router.put('/profile', protect, authorize('mentor'), updateProfile);
router.post('/book', protect, authorize('student'), bookSession);

module.exports = router;

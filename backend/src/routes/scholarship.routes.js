const express = require('express');
const { getScholarships, getScholarshipById, createScholarship, deleteScholarship } = require('../controllers/scholarship.controller');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/', getScholarships);
router.get('/:id', getScholarshipById);
router.post('/', protect, authorize('admin', 'superadmin'), createScholarship);
router.delete('/:id', protect, authorize('admin', 'superadmin'), deleteScholarship);

module.exports = router;

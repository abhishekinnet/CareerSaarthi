const Scholarship = require('../models/Scholarship');

// @desc    Get all scholarships
// @route   GET /api/scholarships
// @access  Public
exports.getScholarships = async (req, res, next) => {
  try {
    const { search, category } = req.query;
    let query = {};

    if (category) {
      query.category = category;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { provider: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    const scholarships = await Scholarship.find(query).sort('-createdAt');
    res.status(200).json({ success: true, count: scholarships.length, scholarships });
  } catch (error) {
    next(error);
  }
};

// @desc    Get scholarship by ID
// @route   GET /api/scholarships/:id
// @access  Public
exports.getScholarshipById = async (req, res, next) => {
  try {
    const scholarship = await Scholarship.findById(req.params.id);
    if (!scholarship) {
      return res.status(404).json({ success: false, error: 'Scholarship not found' });
    }
    res.status(200).json({ success: true, scholarship });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a scholarship
// @route   POST /api/scholarships
// @access  Private (Admin/Superadmin only)
exports.createScholarship = async (req, res, next) => {
  try {
    const scholarship = await Scholarship.create(req.body);
    res.status(201).json({ success: true, scholarship });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a scholarship
// @route   DELETE /api/scholarships/:id
// @access  Private (Admin/Superadmin only)
exports.deleteScholarship = async (req, res, next) => {
  try {
    const scholarship = await Scholarship.findByIdAndDelete(req.params.id);
    if (!scholarship) {
      return res.status(404).json({ success: false, error: 'Scholarship not found' });
    }
    res.status(200).json({ success: true, message: 'Scholarship deleted successfully' });
  } catch (error) {
    next(error);
  }
};

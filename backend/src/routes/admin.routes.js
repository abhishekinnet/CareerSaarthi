const express = require('express');
const { getUsers, updateUserRole, getSystemStats, getLogs } = require('../controllers/admin.controller');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/users', protect, authorize('admin', 'superadmin'), getUsers);
router.put('/users/:id/role', protect, authorize('superadmin'), updateUserRole);
router.get('/stats', protect, authorize('admin', 'superadmin'), getSystemStats);
router.get('/logs', protect, authorize('superadmin'), getLogs);

module.exports = router;

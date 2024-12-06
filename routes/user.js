const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const { registerUser, loginUser, logoutUser, getUserProfile } = require('../controllers/userController');
const { authenticateToken, authorizeRoles } = require('../middleware/authMiddleware');

// Rate limiting middleware
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 login requests per windowMs
  message: 'Too many login attempts from this IP, please try again after 15 minutes'
});

// User registration endpoint
router.post('/register', registerUser);

// User login endpoint
router.post('/login', loginLimiter, loginUser);

// User logout endpoint
router.post('/logout', authenticateToken, logoutUser);

// Get user profile endpoint
router.get('/profile', authenticateToken, getUserProfile);

// Example of an admin-only endpoint
router.get('/admin', authenticateToken, authorizeRoles('admin'), (req, res) => {
  res.status(200).json({ message: 'Welcome, admin!' });
});

module.exports = {
  router,
  authenticateToken,
  authorizeRoles,
};
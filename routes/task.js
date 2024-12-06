const express = require('express');
const router = express.Router();
const { createTask, getTasks, updateTask, deleteTask, assignTask, getAssignedTasks } = require('../controllers/taskController');
const { authenticateToken, authorizeRoles } = require('../middleware/authMiddleware');

// Create Task
router.post('/', authenticateToken, createTask);

// Read Tasks
router.get('/', authenticateToken, getTasks);

// Update Task
router.put('/:id', authenticateToken, updateTask);

// Delete Task
router.delete('/:id', authenticateToken, deleteTask);

// Assign Task
router.post('/assign', authenticateToken, authorizeRoles('manager', 'admin'), assignTask);

// View Assigned Tasks
router.get('/assigned', authenticateToken, getAssignedTasks);

module.exports = router;
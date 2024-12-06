const Task = require('../models/Task.model');
const User = require('../models/User.model');

const createTask = async (req, res) => {
  const { title, description, dueDate, priority, status } = req.body;
  const task = new Task({ title, description, dueDate, priority, status, user: req.user.userId });

  try {
    await task.save();
    res.status(201).json({ message: 'Task created successfully', task });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create task' });
  }
};

const getTasks = async (req, res) => {
  const { sortBy, filterBy } = req.query;
  const filter = filterBy ? { user: req.user.userId, ...JSON.parse(filterBy) } : { user: req.user.userId };
  const sort = sortBy ? JSON.parse(sortBy) : {};

  try {
    const tasks = await Task.find(filter).sort(sort);
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve tasks' });
  }
};

const updateTask = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const task = await Task.findOneAndUpdate({ _id: id, user: req.user.userId }, updates, { new: true });
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.status(200).json({ message: 'Task updated successfully', task });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update task' });
  }
};

const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findOneAndDelete({ _id: id, user: req.user.userId });
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete task' });
  }
};

const assignTask = async (req, res) => {
  const { taskId, userId } = req.body;

  try {
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    task.user = userId;
    await task.save();
    res.status(200).json({ message: 'Task assigned successfully', task });
  } catch (error) {
    res.status(500).json({ error: 'Failed to assign task' });
  }
};

const getAssignedTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.userId });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve assigned tasks' });
  }
};

module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  assignTask,
  getAssignedTasks,
};
const Task = require('../models/Task');
const User = require('../models/User');

// Get all tasks assigned by manager
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ assignedBy: req.user.id })
      .populate('assignedTo', 'name email')
      .sort({ createdAt: -1 });
    
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new task
const createTask = async (req, res) => {
  try {
    const { title, description, assignedTo, dueDate } = req.body;

    const task = await Task.create({
      title,
      description,
      assignedTo,
      assignedBy: req.user.id,
      dueDate
    });

    const populatedTask = await Task.findById(task._id)
      .populate('assignedTo', 'name email')
      .populate('assignedBy', 'name');

    res.status(201).json(populatedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update task progress
const updateTaskProgress = async (req, res) => {
  try {
    const { progress } = req.body;
    
    const task = await Task.findById(req.params.id);
    
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    
    if (task.assignedBy.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized to update this task' });
    }
    
    task.progress = progress;
    
    if (progress === 100) {
      task.status = 'completed';
    } else if (progress > 0) {
      task.status = 'in progress';
    }
    
    const updatedTask = await task.save();
    
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all employees
const getEmployees = async (req, res) => {
  try {
    const employees = await User.find({ role: 'employee' }).select('name email');
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getTasks,
  createTask,
  updateTaskProgress,
  getEmployees
};
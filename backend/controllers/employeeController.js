const Task = require('../models/Task');

// Get all tasks assigned to employee
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ assignedTo: req.user.id })
      .populate('assignedBy', 'name')
      .sort({ createdAt: -1 });
    
    res.json(tasks);
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
    
    if (task.assignedTo.toString() !== req.user.id) {
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

module.exports = {
  getTasks,
  updateTaskProgress
};
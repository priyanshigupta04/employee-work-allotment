const express = require('express');
const { getTasks, createTask, updateTaskProgress, getEmployees } = require('../controllers/managerController');
const { protect } = require('../middleware/auth');
const { authorize } = require('../middleware/role');

const router = express.Router();

router.use(protect);
router.use(authorize('manager'));

router.route('/tasks')
  .get(getTasks)
  .post(createTask);

router.route('/tasks/:id/progress')
  .put(updateTaskProgress);

router.get('/employees', getEmployees);

module.exports = router; 
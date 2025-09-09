const express = require('express');
const { getTasks, updateTaskProgress } = require('../controllers/employeeController');
const { protect } = require('../middleware/auth');
const { authorize } = require('../middleware/role');

const router = express.Router();

router.use(protect);
router.use(authorize('employee'));

router.route('/tasks')
  .get(getTasks);

router.route('/tasks/:id/progress')
  .put(updateTaskProgress);

module.exports = router;
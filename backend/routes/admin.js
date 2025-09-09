const express = require('express');
const { getUsers, createUser, deleteUser } = require('../controllers/adminController');
const { protect } = require('../middleware/auth');
const { authorize } = require('../middleware/role');

const router = express.Router();

router.use(protect);
router.use(authorize('admin'));

router.route('/users')
  .get(getUsers)
  .post(createUser);

router.route('/users/:id')
  .delete(deleteUser);

module.exports = router;
const express = require('express');
const { getUsers, getUser, createUser, updateUser, deleteUser } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');
const router = express.Router();

router.route('/')
    .get(protect, authorize(['admin']), getUsers)
    .post(protect, authorize(['admin']), createUser);

router.route('/:id')
    .get(protect, authorize(['admin']), getUser)
    .put(protect, authorize(['admin']), updateUser)
    .delete(protect, authorize(['admin']), deleteUser);

module.exports = router;

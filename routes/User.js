const express = require('express');
const UserController = require('../controllers/usercontroller');
const router = express.Router();

router.get('/users', UserController.getAllUser);
router.post('/users/add', UserController.adduser);
router.delete('/users/:id', UserController.deleteUser);

module.exports = router;
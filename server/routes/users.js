
const User = require('../controllers/users');
const express = require('express');
const router = express.Router();
const { 
  login,
  register } = require('../controllers/users');

router.post('/login', login);
router.post('/register', register);
router.get('/:id', User.authMiddleware, User.getUser);


module.exports = router;

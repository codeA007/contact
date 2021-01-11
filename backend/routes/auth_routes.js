const express = require('express')

const router = express.Router();

const authControllers = require('../controllers/auth_controllers');

router.post('/create-account', authControllers.saveUser);
router.post('/login-user', authControllers.loginUser);

module.exports = router;
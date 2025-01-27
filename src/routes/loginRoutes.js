const express = require('express');
const loginController = require('../controllers/loginController');
const router = express.Router();

router
  .route('/')
  .post(loginController.loginUser);

module.exports = router;
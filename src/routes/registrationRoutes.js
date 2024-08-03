const express = require('express');
const registrationController = require('../controllers/registrationController');
const router = express.Router();

router
  .route('/')
  .post(registrationController.registerUser);
router
  .route('/:id')
  .get(registrationController.getUser)
  .put(registrationController.updateUser)
  .delete(registrationController.deleteUser);

module.exports = router;
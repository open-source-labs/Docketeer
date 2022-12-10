/**
 * @module AccountRouter
 * @description Routes all requests to change user information
 */
const express = require('express');
const configController = require('../controllers/configController');
const userController = require('../controllers/userController');
const bcryptController = require('../controllers/bcryptController');
const { useControlled } = require('@mui/material');

const router = express.Router();

// Route handler: updates user's contact preference 
router.post('/contact', 
  configController.updateContactPref,
  (req, res) => {
    return res.status(200).json(res.locals.user);
  }
);

router.post('/password', 
  userController.verifyUser,
  bcryptController.hashNewPassword,
  userController.updatePassword,
  (req, res) => {
    if (res.locals.error) return res.status(200).json(res.locals);
    return res.status(200).json('Successfully updated your password.');
  }
);

router.post('/phone', 
  userController.updatePhone,
  (req, res) => {
    return res.status(200).json(res.locals.user);
  }
);

router.post('/email',
  userController.updateEmail,
  (req, res) => {
    return res.status(200).json(res.locals.user);
  }
);

router.post('/cpu', 
  configController.updateCPUThreshold,
  (req, res) => {
    return res.status(200).json(res.locals.user);
  }
);

// Route handler: updates user's memory threshold
router.post('/memory', 
  configController.updateMemThreshold,
  (req, res) => {
    return res.status(200).json(res.locals.user);
  }
);

// Route handler: updates user's preference to receive notifications for container stops
router.post('/stops',
  configController.updateStopPref,
  (req, res) => {
    return res.status(200).json(res.locals.user);
  }
);

module.exports = router;
/**
 * ************************************
 *
 * @module AccountRouter
 * @author Catherine Larcheveque, Lorenzo Guevara, Charles Ryu, Griffin Silver, Alex Smith
 * @date 6/14/2021
 * @description Routes all requests to change user information
 *
 * ************************************
 */

const express = require('express');
const configController = require('../controllers/configController');

const router = express.Router();

// Route handler: updates user's contact preference 
router.post('/contact', 
  configController.updateContactPref,
  (req, res) => {
    return res.status(200).json(res.locals.user);
  }
);

// Route handler: updates user's CPU threshold
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
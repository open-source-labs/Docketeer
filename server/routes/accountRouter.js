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

router.post('/thresholds', 
  configController.configureThresholds,
  (req, res) => {
    return res.status(200).json('succesfully configured thresholds');
  }
);
 
router.post('/contact', 
  configController.updateContactPref,
  (req, res) => {
    return res.status(200).json('successfully configured contact preferences');
  }
);

router.post('/cpu', 
  configController.updateCPUThreshold,
  (req, res) => {
    return res.status(200).json('successfully configured CPU threshold');
  }
);

router.post('/memory', 
  configController.updateMemThreshold,
  (req, res) => {
    return res.status(200).json('successfully configured memory threshold');
  }
);

router.post('/stops',
  configController.updateStopPref,
  (req, res) => {
    return res.status(200).json('successfully configured container stops preference');
  }
);

module.exports = router;
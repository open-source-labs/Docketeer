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
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/thresholds', 
  userController.configureThresholds,
  (req, res) => {
    return res.status(200).json('succesfully configured thresholds');
  }
);
 
module.exports = router;
/**
 * ************************************
 *
 * @module Login Router
 * @author Catherine Larcheveque, Lorenzo Guevara, Charles Ryu, Griffin Silver, Alex Smith
 * @date 6/14/2021
 * @description Routes all requests to login endpoint 
 *
 * ************************************
 */

const express = require('express');
const signupController = require('../controllers/signupController');
const userController = require('../controllers/userController');
const bcryptController = require('../controllers/bcryptController');
const cookieController = require('../controllers/cookieController');

const router = express.Router();

router.post('/',
  signupController.completedFormCheck,
  userController.verifyUser,
  bcryptController.comparePassword,
  cookieController.setSSIDCookie,
  cookieController.setAdminCookie,
  (req, res) => {
    if (res.locals.error) return res.status(200).json(res.locals);
    return res.status(200).json(res.locals.user);
  }
);

module.exports = router;
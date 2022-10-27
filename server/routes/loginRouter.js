/**
 * @module Login Router
 * @description Routes all requests to login endpoint
 */

const express = require('express');
const signupController = require('../controllers/signupController');
const userController = require('../controllers/userController');
const bcryptController = require('../controllers/bcryptController');
const cookieController = require('../controllers/cookieController');

const router = express.Router();

router.post(
  '/',
  signupController.completedFormCheck,
  userController.verifyUser,
  bcryptController.comparePassword,
  cookieController.setSSIDCookie,
  cookieController.setAdminCookie,
  bcryptController.hashCookie,
  (req, res) => {
    if (res.locals.error) return res.status(200).json(res.locals);
    return res.status(200).json(res.locals.user);
  }
);

module.exports = router;

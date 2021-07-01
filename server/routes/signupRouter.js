/**
 * ************************************
 *
 * @module SignupRouter
 * @author Catherine Larcheveque, Lorenzo Guevara, Charles Ryu, Griffin Silver, Alex Smith
 * @date 6/14/2021
 * @description Routes all requests to signup endpoint 
 *
 * ************************************
 */

const express = require('express');
const signupController = require('../controllers/signupController');
const bcryptController = require('../controllers/bcryptController');
const userController = require('../controllers/userController');
const cookieController = require('../controllers/cookieController');
const apiController = require('../controllers/apiController');

const router = express.Router();

// may move to login router
// only call middleware when system admin logs in
router.get('/', 
  userController.getAllUsers, 
  (req, res) => {
    return res.status(200).json(res.locals.users);
  }
);

router.post('/', 
  signupController.usernameCheck,
  signupController.passwordCheck,
  bcryptController.hashPassword,
  userController.createUser,
  apiController.signupEmail,
  cookieController.setSSIDCookie,
  cookieController.setAdminCookie,
  (req, res) => {
    if (res.locals.error) return res.status(200).json(res.locals);
    return res.status(200).json('successfully added new user to database');
  }
);

module.exports = router;
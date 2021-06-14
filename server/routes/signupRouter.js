/**
 * ************************************
 *
 * @module Signup Router
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

const router = express.Router();

// may move to login router
// only call middleware when system admin logs in
router.get('/', 
  userController.getAllUsers, 
  (req, res) => {
    console.log('made it back to signup router');
    return res.status(200).json(res.locals.users);
  }
);

router.post('/', 
  signupController.usernameCheck,
  signupController.passwordCheck,
  bcryptController.hashPassword,
  userController.createUser,
  cookieController.setCookie,
  cookieController.setSSIDCookie,
  cookieController.setAdminCookie,
  (req, res) => {
    console.log('made it back to signup router');
    if (res.locals.error) return res.status(200).json(res.locals.error);
    return res.status(200).json('successfully added new user to database');
  }
);

module.exports = router;
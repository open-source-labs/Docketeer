/**
 * @module SignupRouter
 * @description Routes all requests to signup endpoint 
 */
const express = require('express');
// grab username, verify that it is unique
// hash and set cookies
// hash and salt the password
// store username, password, role_id, and cookie in database
const signupController = require('../controllers/signupController');
const bcryptController = require('../controllers/bcryptController');
const userController = require('../controllers/userController');
 
const router = express.Router();

router.post('/', 
  signupController.usernameCheck,
  bcryptController.hashNewPassword,
  userController.createUser,
  (req, res) => res.status(200).json('successfully added new sysadmin account'));
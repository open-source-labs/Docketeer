/**
 * ************************************
 *
 * @module AdminRouter
 * @author Catherine Larcheveque, Lorenzo Guevara, Charles Ryu, Griffin Silver, Alex Smith
 * @date 6/14/2021
 * @description Routes all requests to admin endpoint 
 *
 * ************************************
 */

const express = require('express');
const signupController = require('../controllers/signupController');
const bcryptController = require('../controllers/bcryptController');
const userController = require('../controllers/userController');
const cookieController = require('../controllers/cookieController');

const router = express.Router();

// note: should we move these middleware functions to a separate controller, i.e. AdminController? 

// Route Handler: Get all users from users table and send back to client (system admin)
router.get('/', 
  userController.getAllUsers, 
  (req, res) => {
    return res.status(200).json(res.locals.users);
  }
);

// Route Handler: Switch user role from 'user' to 'admin' and vice-versa.
router.post('/switch', 
  userController.switchUserRole, 
  (req, res) => {
    return res.status(200).json(res.locals.user);
  }
);

module.exports = router;
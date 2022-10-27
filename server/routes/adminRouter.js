/**
 * @module AdminRouter
 * @description Routes all requests to admin endpoint
 */
const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

// note: should we move these middleware functions to a separate controller, i.e. AdminController?

// Route Handler: Checks if client has sysadmin privilege. Get all users from users table and send back to client (system admin)
router.post('/', 
  // userController.verifySysadmin,
  userController.getAllUsers, 
  (req, res) => {
    if (res.locals.error) return res.status(200).json(res.locals.error);
    return res.status(200).json(res.locals.users);
  }
);

// Route Handler: Checks if client has sysadmin privilege. Switch user role from 'user' to 'admin' and vice-versa.
router.post(
  '/switch',
  userController.verifySysadmin,
  userController.switchUserRole,
  (req, res) => {
    return res.status(200).json(res.locals.user);
  }
);

module.exports = router;

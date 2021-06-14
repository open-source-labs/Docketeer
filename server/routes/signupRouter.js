const express = require('express');
const signupController = require('../controllers/signupController');
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
  userController.bcrypt,
  userController.createUser,
  cookieController.setCookie,
  cookieController.setSSIDCookie,
  (req, res) => {
    console.log('made it back to signup router');
    if (res.locals.error) return res.status(200).json(res.locals.error);
    return res.status(200).json('successfully added new user to database');
  }
);

module.exports = router;
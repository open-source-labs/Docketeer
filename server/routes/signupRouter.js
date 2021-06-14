const express = require('express');
const userController = require('../controllers/userController');
const cookieController = require('../controllers/cookieController');

const router = express.Router();

router.get('/', 
  userController.getAllUsers, 
  (req, res) => {
    console.log('made it back to signup router');
    return res.status(200).json(res.locals.users);
  }
);

router.post('/', 
  userController.createUser,
  cookieController.setCookie,
  cookieController.setSSIDCookie,
  (req, res) => {
    console.log('made it back to signup router');
    return res.status(200).json('successfully added new user to database');
  }
);

module.exports = router;
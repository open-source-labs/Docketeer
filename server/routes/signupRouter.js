const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/', userController.getUsers, (req, res) => {
  console.log('made it back to signup router');
  return res.status(200).json(res.locals.users);
});

router.post('/', userController.newUser, (req, res) => {
  console.log('made it back to signup router');
  return res.status(200).json('user added');
});


module.exports = router;
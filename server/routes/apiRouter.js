/**
 * ************************************
 *
 * @module API Router
 * @author Catherine Larcheveque, Lorenzo Guevara, Charles Ryu, Griffin Silver, Alex Smith
 * @date 6/14/2021
 * @description Routes all requests to APIs 
 *
 * ************************************
 */

const express = require('express');
const userController = require('../controllers/userController');
const apiController = require('../controllers/apiController');


const router = express.Router();

// Route Handler: Send email notification to user
// send fetch request from frontend when event emitter finds container issue
router.post('/', 
  userController.getOneUser, 
  apiController.issueEmail,
  (req, res) => {
    return res.status(200).json(res.locals.users);
  }
);

module.exports = router;
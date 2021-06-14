/**
 * ************************************
 *
 * @module Login Router
 * @author Catherine Larcheveque, Lorenzo Guevara, Charles Ryu, Griffin Silver, Alex Smith
 * @date 6/14/2021
 * @description Routes all requests to login endpoint 
 *
 * ************************************
 */

const express = require('express');
const userController = require('../controllers/userController');
const cookieController = require('../controllers/cookieController');

const router = express.Router();

router.post('/',
  userController.verifyUser,
  cookieController.setCookie,
  cookieController.setSSIDCookie,
  (req, res) => {
    console.log('made it back to login router');
    if (res.locals.error) return res.status(200).json(res.locals);
    return res.status(200).json(res.locals.id);
  }
);

module.exports = router;
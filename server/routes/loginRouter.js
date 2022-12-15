/**
 * @module Login Router
 * @description Routes all requests to login endpoint 
 */

const express = require('express');
const userController = require('../controllers/userController');
// the below are unnecessary until Docketeer can run in the browser
// const bcryptController = require('../controllers/bcryptController');
// const cookieController = require('../controllers/cookieController');

const router = express.Router();

router.post('/',
  userController.verifyUser,
  // the below are inapplicable at the moment as Docketeer will not run in the browser, therefore cookies are not possible at this time
  // cookieController.setSSIDCookie,
  // cookieController.setAdminCookie,
  // bcryptController.hashCookie,
  (req, res) => {
    console.log(res.locals);
    if (res.locals.error) return res.status(200).json(res.locals);
    return res.status(200).json(res.locals.user);
  }
);

module.exports = router;
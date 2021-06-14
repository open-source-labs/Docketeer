const db = require('../models/cloudModel');

const cookieController = {};

// set a cookie with a random number
cookieController.setCookie = (req, res, next) => {
  if (res.locals.error) return next();
  
  res.cookie('secret', Math.floor(Math.random() * 100))
  next();
}

// store the user id in a cookie
cookieController.setSSIDCookie = (req, res, next) => {
  if (res.locals.error) return next();
 
  res.cookie('ssid', res.locals.id, { httpOnly: true });
  next();
}

module.exports = cookieController;
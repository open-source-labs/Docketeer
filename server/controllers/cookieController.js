/**
 * ************************************
 *
 * @module Cookie Controller
 * @author Catherine Larcheveque, Lorenzo Guevara, Charles Ryu, Griffin Silver, Alex Smith
 * @date 6/14/2021
 * @description Contains middleware that sets cookie upon login/signup, stores the user id in a HTTP-only cookie, and sets HTTP-only cookie specifically for admins
 *
 * ************************************
 */

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
  
  res.cookie('ssid', res.locals.user._id, { httpOnly: true });
  next();
}

// admin secret cookie
cookieController.setAdminCookie = (req, res, next) => {
  if (res.locals.error) return next();

  const { role } = res.locals.user;
  
  if (role === 'admin') res.cookie('adminType', role, { httpOnly: true });
  if (role === 'system admin') res.cookie('adminType', role, { httpOnly: true });

  return next();
}

module.exports = cookieController;
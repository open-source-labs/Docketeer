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
  
  res.cookie('secret', Math.floor(Math.random() * 100));
  return next();
};

// store the user id in a cookie
cookieController.setSSIDCookie = (req, res, next) => {
  if (res.locals.error) return next();
  
  res.cookie('ssid', res.locals.user._id, { httpOnly: true });
  return next();
};

// set admin cookie for users with admin privileges
cookieController.setAdminCookie = (req, res, next) => {
  if (res.locals.error) return next();

  const { role_id } = res.locals.user;
  
  if (role_id === 1) res.cookie('adminType', 'system admin', { httpOnly: true });
  if (role_id === 2) res.cookie('adminType', 'admin', { httpOnly: true });

  return next();
};

module.exports = cookieController;
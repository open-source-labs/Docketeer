/**
 * ************************************
 *
 * @module UserController
 * @author Catherine Larcheveque, Lorenzo Guevara, Charles Ryu, Griffin Silver, Alex Smith
 * @date 6/14/2021
 * @description Contains middleware that creates new user in database, gets all users from database for system admin, and verifies user exists before sending back user data to login component
 *
 * ************************************
 */

const db = require('../models/cloudModel');

const configController = {};

// update configuration thresholds
configController.configureThresholds = (req, res, next) => {
  if (res.locals.error) return next();

  const { contact_pref, mem_threshold, cpu_threshold, container_stops, _id } = req.body;
  
  const inputThresholds = 'UPDATE users SET contact_pref = $1, mem_threshold = $2, cpu_threshold = $3, container_stops = $4 WHERE _id = $5 RETURNING *;';
  const thresholdDetails = [contact_pref, mem_threshold, cpu_threshold, container_stops, _id];

  db.query(inputThresholds, thresholdDetails)
    .then((data) => {
      console.log('raw data:', data);
      res.locals.user = data.rows[0];
      console.log(res.locals.user);
      console.log('user added');
      return next();
    })
    .catch((err) => {
      return next({
        log: `Error in userController newUser: ${err}`,
        message: { err: 'An error occured creating new user in database. See userController.newUser.' },
      });
    });

};

module.exports = configController;
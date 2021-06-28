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

const userController = {};

// create new user
userController.createUser = (req, res, next) => {
  if (res.locals.error) return next();

  const { username, email, phone } = req.body;
  const { hash } = res.locals;
  
  const createUser = 'INSERT INTO users (username, email, password, phone) VALUES ($1, $2, $3, $4) RETURNING *;';
  const userDetails = [username, email, hash, phone];

  if (username && hash) {
    db.query(createUser, userDetails)
      .then((data) => {
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
  }
};

// get all users (system admin)
userController.getAllUsers = (req, res, next) => {
  console.log('made it to userController.getUsers');
  const allUsers = 'SELECT * FROM users ORDER BY _id ASC;';

  db.query(allUsers)
    .then((response) => {
      res.locals.users = response.rows;
      console.log('retrieved all users from database');
      return next();
    })
    .catch((err) => {
      return next({
        log: `Error in userController getAllUsers: ${err}`,
        message: { err: 'An error occured retrieving all users from database. See userController.getAllUsers.' },
      });
    });
};

// get information for one user
userController.getOneUser = (req, res, next) => {
  const { _id } = req.body;
  
  const oneUser = `SELECT * FROM users WHERE _id = ${_id};`;

  db.query(oneUser)
    .then((response) => {
      res.locals.users = response.rows;
      console.log(res.locals.users);
      console.log('retrieved user from database');
      return next();
    })
    .catch((err) => {
      return next({
        log: `Error in userController getOneUser: ${err}`,
        message: { err: 'An error occured retrieving user from database. See userController.getOneUser.' },
      });
    });
};

// verify user exists and send back user info
userController.verifyUser = (req, res, next) => {
  if (res.locals.error) return next();

  const { username } = req.body;

  const getUser = `SELECT * FROM users WHERE username='${username}';`;

  db.query(getUser)
    .then((data) => {
      if (data.rows[0]) res.locals.user = data.rows[0]; else res.locals.error = 'Incorrect username or password.';
      return next();
    })
    .catch((err) => {
      return next({
        log: `Error in userController checkUserExists: ${err}`,
        message: { err: 'An error occured while checking if username exists. See userController.checkUserExists.' },
      });
    });
};

userController.switchUserRole = (req, res, next) => {

  const roleMap = {
    sysadmin: 1,
    admin: 2,
    user: 3,
  };

  const { _id, changeToAdmin } = req.body;

  const query = 'UPDATE users SET role = $1, role_id = $2 WHERE _id = $3 RETURNING *;';

  // Array destructuring assignment and ternary operator
  const [ newRole, newRoleId ] = changeToAdmin ? [ 'admin', roleMap.admin ] : [ 'user', roleMap.user ];

  // const newRoleId = changeToAdmin ? roleMap.admin : roleMap.user;
  console.log('NEW ROLE: ', newRole);
  console.log('ROLE ID: ', newRoleId);
  console.log(req.body);
  const parameters = [ newRole, newRoleId, _id ];
  db.query(query, parameters)
    .then((data) => {
      console.log('successfully switched user role');
      res.locals.user = data.rows[0];
      return next();
    })
    .catch((err) => {
      return next({
        log: `Error in userController switchUserRole: ${err}`,
        message: { err: 'An error occured while checking if username exists. See userController.switchUserRole.' },
      });
    });
};

// update configuration thresholds
// userController.configureThresholds = (req, res, next) => {
//   if (res.locals.error) return next();

//   const { contact_pref, mem_threshold, cpu_threshold, container_stops, _id } = req.body;
  
//   const inputThresholds = 'UPDATE users SET contact_pref = $1, mem_threshold = $2, cpu_threshold = $3, container_stops = $4 WHERE _id = $5 RETURNING *;';
//   const thresholdDetails = [contact_pref, mem_threshold, cpu_threshold, container_stops, _id];

//   db.query(inputThresholds, thresholdDetails)
//     .then((data) => {
//       console.log('raw data:', data);
//       res.locals.user = data.rows[0];
//       console.log(res.locals.user);
//       console.log('user added');
//       return next();
//     })
//     .catch((err) => {
//       return next({
//         log: `Error in userController newUser: ${err}`,
//         message: { err: 'An error occured creating new user in database. See userController.newUser.' },
//       });
//     });

// };

module.exports = userController;
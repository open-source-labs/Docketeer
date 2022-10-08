/**
 * @module UserController
 * @description Contains middleware that creates new user in database, gets all users from database for system admin, and verifies user exists before sending back user data to login component
 */
const db = require('../models/cloudModel');

const userController = {};

// create new user
userController.createUser = (req, res, next) => {
  if (res.locals.error) return next();

  const { username, email, phone } = req.body;
  const { hash } = res.locals;

  const createUser =
    "INSERT INTO users (username, email, password, phone, role) VALUES ($1, $2, $3, $4, 'user') RETURNING *;";
  const userDetails = [username, email, hash, phone];

  if (username && hash) {
    db.query(createUser, userDetails)
      .then((data) => {
        res.locals.user = data.rows[0];
        return next();
      })
      .catch((err) => {
        return next({
          log: `Error in userController newUser: ${err}`,
          message: {
            err: 'An error occured creating new user in database. See userController.newUser.'
          }
        });
      });
  }
};

// get all users (system admin)
userController.getAllUsers = (req, res, next) => {
  if (Object.prototype.hasOwnProperty.call(res.locals, 'error')) {
    return next();
  } else {
    const allUsers = 'SELECT * FROM users ORDER BY _id ASC;';
    db.query(allUsers)
      .then((response) => {
        res.locals.users = response.rows;
        return next();
      })
      .catch((err) => {
        return next({
          log: `Error in userController getAllUsers: ${err}`,
          message: {
            err: 'An error occured retrieving all users from database. See userController.getAllUsers.'
          }
        });
      });
  }
};

// get information for one user
userController.getOneUser = (req, res, next) => {
  const { _id } = req.body;

  const oneUser = `SELECT * FROM users WHERE _id = ${_id};`;

  db.query(oneUser)
    .then((response) => {
      res.locals.users = response.rows;
      return next();
    })
    .catch((err) => {
      return next({
        log: `Error in userController getOneUser: ${err}`,
        message: {
          err: 'An error occured retrieving user from database. See userController.getOneUser.'
        }
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
      if (data.rows[0]) res.locals.user = data.rows[0];
      else res.locals.error = 'Incorrect username or password.';
      return next();
    })
    .catch((err) => {
      return next({
        log: `Error in userController checkUserExists: ${err}`,
        message: {
          err: 'An error occured while checking if username exists. See userController.checkUserExists.'
        }
      });
    });
};

// switches role of user upon designation by system admin
userController.switchUserRole = (req, res, next) => {
  const roleMap = {
    sysadmin: 1,
    admin: 2,
    user: 3
  };

  const { _id, changeToAdmin } = req.body;

  const query =
    'UPDATE users SET role = $1, role_id = $2 WHERE _id = $3 RETURNING *;';

  // Array destructuring assignment and ternary operator
  const [newRole, newRoleId] = changeToAdmin
    ? ['admin', roleMap.admin]
    : ['user', roleMap.user];

  // const newRoleId = changeToAdmin ? roleMap.admin : roleMap.user;
  const parameters = [newRole, newRoleId, _id];
  db.query(query, parameters)
    .then((data) => {
      res.locals.user = data.rows[0];
      return next();
    })
    .catch((err) => {
      return next({
        log: `Error in userController switchUserRole: ${err}`,
        message: {
          err: 'An error occured while checking if username exists. See userController.switchUserRole.'
        }
      });
    });
};

userController.updatePassword = (req, res, next) => {
  // if there is an error property on res.locals, return next(). i.e., incorrect password entered
  if (Object.prototype.hasOwnProperty.call(res.locals, 'error')) {
    res.locals.error =
      'Incorrect password. Please enter the correct password to update it.';
    return next();
  }
  const { hash } = res.locals;
  const { username } = req.body;

  // Note: for future, have the query return every column but the password column. Might be a security concern to be sending the user's hashed password to the client.

  const query =
    'UPDATE users SET password = $1 WHERE username = $2 RETURNING *;';
  const parameters = [hash, username];

  db.query(query, parameters)
    .then((data) => {
      res.locals.user = data.rows[0];
      return next();
    })
    .catch((err) => {
      return next({
        log: `Error in userController updatePassword: ${err}`,
        message: {
          err: 'An error occured while checking if username exists. See userController.updatePassword.'
        }
      });
    });
};

userController.updatePhone = (req, res, next) => {
  const { username, phone } = req.body;

  const query = 'UPDATE users SET phone = $1 WHERE username = $2 RETURNING *;';
  const parameters = [phone, username];

  db.query(query, parameters)
    .then((data) => {
      res.locals.user = data.rows[0];
      return next();
    })
    .catch((err) => {
      return next({
        log: `Error in userController updatePhone: ${err}`,
        message: {
          err: 'An error occured while checking if username exists. See userController.updatePhone.'
        }
      });
    });
};

userController.updateEmail = (req, res, next) => {
  const { username, email } = req.body;

  const query = 'UPDATE users SET email = $1 WHERE username = $2 RETURNING *;';
  const parameters = [email, username];

  db.query(query, parameters)
    .then((data) => {
      res.locals.user = data.rows[0];
      return next();
    })
    .catch((err) => {
      return next({
        log: `Error in userController updateEmail: ${err}`,
        message: {
          err: 'An error occured while checking if username exists. See userController.updateEmail.'
        }
      });
    });
};

/**
 * @description verifies clients hash token that matches databases token
 */
userController.verifySysadmin = (req, res, next) => {
  const { username, token } = req.body;

  const query = `SELECT * FROM users WHERE username='${username}' AND token='${token}';`;
  db.query(query)
    .then((data) => {
      if (!data.rows[0]) res.locals.error = 'Access Denied';
      return next();
    })
    .catch((err) => {
      return next({
        log: `Error in userController verifySysadmin: ${err}`,
        message: {
          err: 'An error occured while checking if token exists. See userController.verifySysadmin.'
        }
      });
    });
};
module.exports = userController;

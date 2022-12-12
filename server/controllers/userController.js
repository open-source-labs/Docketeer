/**
 * @module UserController
 * @description Contains middleware that creates new user in database, gets all users from database for system admin, and verifies user exists before sending back user data to login component
 */
const db = require('../models/cloudModel');
const bcrypt = require('bcryptjs');
const { ConnectingAirportsOutlined } = require('@mui/icons-material');
const userController = {};

// create new user
userController.createUser = (req, res, next) => {
  if (res.locals.error) return next();

  const { username, email, phone, role_id} = req.body;
  const { hash } = res.locals;
  let role;

  switch(role_id) {
  case '1':
    role = 'system admin';
    break;
  case '2':
    role = 'admin';
    break;
  case '3':
    role = 'user';
    break;
  }
  
  const createUser = 'INSERT INTO users (username, email, password, phone, role, role_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;';
  const userDetails = [username, email, hash, phone, role, role_id];
  console.log('USERDETAILS:', userDetails);
  if (username && hash) {
    db.query(createUser, userDetails)
      .then((data) => {
        res.locals.user = data.rows[0];
        return next();
      })
      .catch((err) => {
        return next({
          log: `Error in userController newUser: ${err}`,
          message: { err: 'An error occurred creating new user in database. See userController.newUser.' },
        });
      });
  }
};

// get all users (system admin)
userController.getAllUsers = (req, res, next) => {
  if (Object.prototype.hasOwnProperty.call(res.locals, 'error')){
    return next();
  }else{
    const allUsers = 'SELECT * FROM users ORDER BY _id ASC;';
    db.query(allUsers)
      .then((response) => {
        res.locals.users = response.rows;
        return next();
      })
      .catch((err) => {
        return next({
          log: `Error in userController getAllUsers: ${err}`,
          message: { err: 'An error occurred retrieving all users from database. See userController.getAllUsers.' },
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
        message: { err: 'An error occurred retrieving user from database. See userController.getOneUser.' },
      });
    });
};

// verify user exists and send back user info
userController.verifyUser =  (req, res, next) => {
  if (res.locals.error) return next();

  const { username, password } = req.body;

  const getUser = `SELECT * FROM users WHERE username='${username}';`;

  db.query(getUser)
    .then(async (data) => {  
      const match = await bcrypt.compare(password, data.rows[0].password); 
      if (data.rows[0] && match) {
        res.locals.user = data.rows[0]; 
        return next();
      } else {
        res.locals.error = 'Incorrect username or password.';
        delete res.locals.user;
      }
      
    })
    .catch((err) => {
      return next({
        log: `Error in userController checkUserExists: ${err}`,
        message: { err: 'An error occurred while checking if username exists. See userController.checkUserExists.' },
      });
    });
};

// Checks database to ensure at least one person is SysAdmin - there should never be 0 sysAdmins.
userController.checkSysAdmin = (req, res, next) => {

  const query = 'SELECT * FROM users WHERE role_id = 1';

  db.query(query)
    .then((data) => {
      res.locals.sysAdmins = data.rowCount;
      res.locals.id = data.rows[0]._id;
      return next();
    })
    .catch((err) => {
      return next({
        log: `Error in userController switchUserRole: ${err}`,
        message: { err: 'An error occurred while checking number of SysAdmins. See userController.checkSysAdmins.' },
      });
    });
};

// switches role of user upon designation by system admin
userController.switchUserRole = (req, res, next) => {

  const roleMap = {
    'system admin': 1,
    admin: 2,
    user: 3
  };

  const { _id, role } = req.body;

  if(res.locals.sysAdmins === 1 && _id == res.locals.id){
    res.locals.hasError = true;
    next();
  }  else {

    const query = 'UPDATE users SET role = $1, role_id = $2 WHERE _id = $3 RETURNING *;';
 
    const parameters = [role, roleMap[role], _id];
 
    db.query(query, parameters)
      .then((data) => {
        res.locals.role = data.rows[0].role;
        res.locals.hasError = false;
        return next();
      })
      .catch((err) => {
        return next({
          log: `Error in userController switchUserRole: ${err}`,
          message: { err: 'An error occurred while switching roles. See userController.switchUserRole.' },
        });
      });
  }
};

userController.updatePassword = (req, res, next) => {
  // if there is an error property on res.locals, return next(). i.e., incorrect password entered
  if (Object.prototype.hasOwnProperty.call(res.locals, 'error')){
    res.locals.error = 'Incorrect password. Please enter the correct password to update it.';
    return next();
  }
  const { hash } = res.locals;
  const { username } = req.body;

  // Note: for future, have the query return every column but the password column. Might be a security concern to be sending the user's hashed password to the client.

  const query = 'UPDATE users SET password = $1 WHERE username = $2 RETURNING *;';
  const parameters = [ hash, username ];

  db.query(query, parameters)
    .then((data) => {
      res.locals.user = data.rows[0];
      return next();
    })
    .catch((err) => {
      return next({
        log: `Error in userController updatePassword: ${err}`,
        message: { err: 'An error occurred while checking if username exists. See userController.updatePassword.' },
      });
    });
};

userController.updatePhone = (req, res, next) => {

  const { username, phone } = req.body;

  const query = 'UPDATE users SET phone = $1 WHERE username = $2 RETURNING *;';
  const parameters = [ phone, username ];

  db.query(query, parameters)
    .then((data) => {
      res.locals.user = data.rows[0];
      return next();
    })
    .catch((err) => {
      return next({
        log: `Error in userController updatePhone: ${err}`,
        message: { err: 'An error occurred while checking if username exists. See userController.updatePhone.' },
      });
    });
};

userController.updateEmail = (req, res, next) => {
  const { username, email } = req.body;

  const query = 'UPDATE users SET email = $1 WHERE username = $2 RETURNING *;';
  const parameters = [ email, username ];

  db.query(query, parameters)
    .then((data) => {
      res.locals.user = data.rows[0];
      return next();
    })
    .catch((err) => {
      return next({
        log: `Error in userController updateEmail: ${err}`,
        message: { err: 'An error occurred while checking if username exists. See userController.updateEmail.' },
      });
    });
};

module.exports = userController;

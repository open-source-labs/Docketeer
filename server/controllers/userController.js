/**
 * ************************************
 *
 * @module User Controller
 * @author Catherine Larcheveque, Lorenzo Guevara, Charles Ryu, Griffin Silver, Alex Smith
 * @date 6/14/2021
 * @description Contains middleware that creates new user in database, gets all users from database for system admin, and verifies username/password upon login or signup
 *
 * ************************************
 */

const db = require('../models/cloudModel');
const bcrypt = require('bcryptjs');

const userController = {};

// hash user password with bcrypt
userController.bcrypt = (req, res, next) => {
  const { password } = req.body;
  const saltRounds = 10;

  bcrypt.hash(password, saltRounds)
    .then((hash) => {
      res.locals.hash = hash;
      return next();
    })
    .catch((err) => {
      return next({
        log: `Error in userController bcrypt: ${err}`,
        message: { err: 'An error occured creating hash with bcrypt. See userController.bcrypt.' },
      });
    })
}

// create new user
userController.createUser = (req, res, next) => {
  if (res.locals.error) return next();

  const { username, email, phone } = req.body;
  const { hash } = res.locals;
  
  const createUser = `INSERT INTO users (username, email, password, phone) VALUES ($1, $2, $3, $4) RETURNING _id;`;
  const userDetails = [username, email, hash, phone];

  if (username && hash) {
    db.query(createUser, userDetails)
    .then((data) => {
      res.locals.id = data.rows[0]._id;
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
}

// get all users (system admin)
userController.getAllUsers = (req, res, next) => {
  console.log('made it to userController.getUsers');
  const allUsers = `SELECT * FROM users;`;

  db.query(allUsers)
    .then((response) => {
      res.locals.users = response.rows;
      console.log('retrieved all users from database');
      return next();
    })
    .catch((err) => {
      return next({
        log: `Error in userController getUsers: ${err}`,
        message: { err: 'An error occured retrieving all users from database. See userController.getUsers.' },
      });
    });
}

// verify user's information is complete and check if entered password is correct
userController.verifyUser = (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.locals.error = 'Missing username or password.';
    return next();
  }

  const checkUser = `SELECT * FROM users WHERE username='${username}';`;

  db.query(checkUser)
    .then((data) => {
      if (data.rows[0].password === password) {
        res.locals.id = data.rows[0]._id;
        return next();
      } else {
        res.locals.error = 'Incorrect username or password.';
        return next();
      }
    })
    .catch((err) => {
      res.locals.error = err;
      return next({
        log: `Error in userController verifyUser: ${err}`,
        message: { err: 'An error occured verifying user. See userController.verifyUser.' },
      });
    });
};

// update user

// get one user



module.exports = userController;
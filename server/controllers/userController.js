const db = require('../models/cloudModel');

const userController = {};

// create new user
userController.newUser = (req, res, next) => {
  const { username, email, password } = req.body;
  console.log(username, email, password);
  const userDetails = [username, email, password];

  const createUser = `INSERT INTO users (username, email, password) VALUES ($1, $2, $3);`;

  db.query(createUser, userDetails)
    .then((response) => {
      console.log(response);
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

// get all users (system admin)
userController.getUsers = (req, res, next) => {
  console.log('made it to userController.getUsers');
  const allUsers = `SELECT * FROM users`;

  db.query(allUsers)
    .then((response) => {
      res.locals.users = response;
      console.log(res.locals.users);
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

// update user

// get one user

// delete user

module.exports = userController;
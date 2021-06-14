const db = require('../models/cloudModel');

const signupController = {};

// verify username is unique
signupController.usernameCheck = (req, res, next) => {
  const { username } = req.body;

  const checkUsernameExists = `SELECT * FROM users WHERE username='${username}';`;

  db.query(checkUsernameExists)
    .then((data) => {
      console.log(data.rows[0]);
      if (data.rows[0]) {
        res.locals.error = 'Username already exists.';
        return next();
      } else {
        console.log('Username checked for uniqueness.');
        return next();
      }
    })
    .catch((err) => {
      return next({
        log: `Error in signupController usernameCheck: ${err}`,
        message: { err: 'An error occured while checking if username exists. See signupController.usernameCheck.' },
      });
    })
}

// verify password meets requirements
signupController.passwordCheck = (req, res, next) => {
  if (res.locals.error) return next();

  const { password } = req.body;

  if (password.length >= 6) {
    console.log('Password meets requirements.');
    return next();
  } else {
    res.locals.error = 'Password must be at least 6 characters.';
    return next();
  }
}

// verify admin role

module.exports = signupController;
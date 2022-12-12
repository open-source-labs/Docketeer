/**
 * @module Bcrypt Controller
 * @description Contains middleware that encrypts password before storing in database and compares a user's inputted password to their stored password
 */
const db = require("../models/cloudModel");
const bcrypt = require("bcryptjs");

const bcryptController = {};

// Hash user password with bCrypt
bcryptController.hashPassword = (req, res, next) => {
  const { password } = req.body;
  const saltRounds = 10;

  bcrypt
    .hash(password, saltRounds)
    .then((hash) => {
      res.locals.hash = hash;
      return next();
    })
    .catch((err) => {
      return next({
        log: `Error in bcryptController hashPassword: ${err}`,
        message: {
          err: "An error occured creating hash with bcrypt. See bcryptController.hashPassword.",
        },
      });
    });
};

// Hash new user password with bCrypt - User updated password
bcryptController.hashNewPassword = async (req, res, next) => {
  // if there is an error property on res.locals, return next(). i.e., incorrect password entered
  if (Object.prototype.hasOwnProperty.call(res.locals, "error")) {
    return next();
  }
  // else bCrypt the new password and move to next middleware
  const { newPassword } = req.body;
  const saltRounds = 10;

  await bcrypt
    .hash(newPassword, saltRounds)
    .then((hash) => {
      res.locals.hash = hash;
      return next();
    })
    .catch((err) => {
      return next({
        log: `Error in bcryptController hashNewPassword: ${err}`,
        message: {
          err: "An error occured creating hash with bcrypt. See bcryptController.hashNewPassword.",
        },
      });
    });
};

/**
 * @description hashes the locals property cookie. Creates a column in the database to store the hashed cookie
 */

bcryptController.hashCookie = (req, res, next) => {
  const { role_id, username } = res.locals.user;
  const saltRounds = 10;
  if (role_id === 1) {
    bcrypt
      .hash(res.locals.cookie, saltRounds)
      .then((hash) => {
        res.locals.user.token = hash;
        db.query(
          "ALTER TABLE users ADD COLUMN IF NOT EXISTS token varchar(250)"
        );
        db.query("UPDATE users SET token=$1 WHERE username=$2", [
          res.locals.user.token,
          username,
        ]);
        return next();
      })
      .catch((err) => {
        return next({
          log: `Error in bcryptController hashCookeis: ${err}`,
          message: {
            err: "An error occured creating hash with bcrypt. See bcryptController.hashCookies.",
          },
        });
      });
  } else {
    return next();
  }
};

module.exports = bcryptController;

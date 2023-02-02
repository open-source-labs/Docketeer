/**
 * @module Signup Controller
 * @description Contains middleware that checks if username exists, if password meets requirements upon signup, and if the login form is missing a username or password
 */

import { type Request, type Response, type NextFunction } from 'express';
import db from '../models/cloudModel';
import { type SignupController, type ServerError } from '../../types';

const signupController: SignupController = {
  // verify username is unique
  usernameCheck: (req: Request, res: Response, next: NextFunction) => {
    const { username } = req.body;

    const checkUsernameExists = `SELECT * FROM users WHERE username='${username}';`;

    db.query(checkUsernameExists)
      .then((data: any) => {
        if (data.rows[0]) {
          res.locals.error = 'Username already exists.';
          next();
        } else {
          next();
        }
      })
      .catch((err: ServerError) => {
        next({
          log: `Error in signupController usernameCheck: ${err}`,
          message: {
            err:
              'An error occured while checking if username exists. See signupController.usernameCheck.'
          }
        });
      });
  },

  // verify password meets requirements
  passwordCheck: (req: Request, res: Response, next: NextFunction) => {
    if (res.locals.error) { next(); return; }

    const { password } = req.body;

    if (password.length >= 6) {
      next();
    } else {
      res.locals.error = 'Password must be at least 6 characters.';
      next();
    }
  }
};

export default signupController;

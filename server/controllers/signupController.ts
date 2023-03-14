/**
 * @module | signupController.ts
 * @description | Contains middleware that checks if username exists, if password meets requirements upon signup, and if the login form is missing a username or password
 **/

import { Request, Response, NextFunction } from 'express';
import db from '../database/cloudModel';
import { SignupController, ServerError } from '../../types';

const signupController: SignupController = {
  // ==========================================================
  // Middleware: signupController
  // Purpose: Verifies fields during sign up process are correct/checked against criteria - fields CANNOT be empty. Username must be unique.
  // ==========================================================

  usernameCheck: (req: Request, res: Response, next: NextFunction) => {
    const { username }: { username: string } = req.body;

    // SQL query to check if username already exists in datebase, not unique.
    const checkUsernameExists = `SELECT * FROM users WHERE username='${username}';`;

    // TODO data is any typed; schema has unique constraint on username, does this code make sense?
    db.query(checkUsernameExists)
      .then((data: any) => {
        // if row 0 or username already exists, throw error

        if (data.rows[0]) {
          res.locals.error = 'Username already exists.';
          return next();
        } else {
          return next();
        }
      })
      .catch((err: ServerError) => {
        return next({
          log: `Error in signupController usernameCheck: ${err}`,
          message: {
            err: 'An error occured while checking if username exists. See signupController.usernameCheck.',
          },
        });
      });
  },
  // TODO change it, unnecessarily difficult and too many alerts presently; this alert prompts unreasonably

  // ==========================================================
  // Middleware: passwordCheck
  // Purpose: Verifies password meets requirements
  // ==========================================================

  passwordCheck: (req: Request, res: Response, next: NextFunction) => {
    if (res.locals.error) return next();

    const { password }: { password: string } = req.body;

    if (password.length >= 6) {
      return next();
    } else {
      res.locals.error = 'Password must be at least 6 characters.';
      return next();
    }
  },
};

export default signupController;

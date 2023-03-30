/**
 * @module | signupController.ts
 * @description | Contains middleware that checks if username exists, if password meets requirements upon signup, and if the login form is missing a username or password
 **/

import { Request, Response, NextFunction } from 'express';
import db from '../database/cloudModel';
import { SignupController, ServerError } from '../../types';

const signupController: SignupController = {
  // verify username is unique
  usernameCheck: (req: Request, res: Response, next: NextFunction) => {
    const { username } = req.body;
    const params = [username];
    const checkUsernameExists = 'SELECT * FROM users WHERE username = $1;';

    db.query(checkUsernameExists, params)
      .then((data: any) => {
        if (data.rows[0]) {
          return next({
            log: 'Error in checkUsername',
            status: 409,
            message: 'Username already exists',
          });
        } else {
          return next();
        }
      })
      .catch((err: ServerError) => {
        return next({
          log: `Error in signupController usernameCheck: ${err}`,
          status: 409,
          message: {
            err: 'An error occured while checking if username exists. See signupController.usernameCheck.',
          },
        });
      });
  },

  // verify password meets requirements
  passwordCheck: (req: Request, res: Response, next: NextFunction) => {
    const { password } = req.body;
    if (!(password.length >= 6)) {
      return next({
        status: 400,
        message: 'Password length too short',
      });
    } else {
      return next();
    }
  },
};

export default signupController;

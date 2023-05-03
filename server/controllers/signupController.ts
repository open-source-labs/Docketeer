import { Request, Response, NextFunction } from 'express';
import db from '../database/cloudModel';
import { SignupController, ServerError, UserInfo } from '../../types';

/**
 * @description Contains middleware that checks if username exists, if password meets requirements upon signup, and if the login form is missing a username or password
 */
const signupController: SignupController = {
  usernameCheck: (req: Request, res: Response, next: NextFunction): void => {
    const { username }: { username: string } = req.body;
    // SQL query to check if username already exists in datebase, not unique.
    console.log('username -> ab to query', username);
    const checkUsernameExists = 'SELECT * FROM users WHERE username=$1;';

    db.query(checkUsernameExists, [username])
      .then((data: { rows: UserInfo[] }): void => {
        // if row 0 or username already exists, throw error
        console.log('data.rows: ', data.rows);
        console.log('data.rows[0]: ', data.rows[0]);
        if (data.rows[0]) {
          throw { message: 'Username already exists.' };
        } else {
          return next();
        }
      })
      .catch((err: ServerError): void => {
        return next({
          log: `Error in signupController usernameCheck: ${err}`,
          status: 409,
          message: {
            err: `An error occured while checking if username exists. See signupController.usernameCheck., ${err.message}`,
          },
        });
      });
  },

  // verify password meets requirements
  passwordCheck: (req: Request, res: Response, next: NextFunction) => {
    const { password }: { password: string } = req.body;
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

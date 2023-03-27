/**
 * @module | signupController.ts
 * @description | Contains middleware that checks if username exists, if password meets requirements upon signup, and if the login form is missing a username or password
 **/
import { Request, Response, NextFunction } from 'express';
import db from '../database/cloudModel';
import { SignupController, ServerError, User } from '../../types';

interface signupControllerMethods {
  /**
   * @description Checks if username already exists in the database
   * @note If user exists, error handler will return an error object with the relevant middleware passing from next()
   */
  usernameCheck,

  /**
    * @description Checks if password is at least 6 characters long
    * @note Only performed if usernameCheck is successful with NO errors
    */
  passwordCheck
}

/**
 * @description Contains middleware that checks if username exists, if password meets requirements upon signup, and if the login form is missing a username or password
 */
const signupController: SignupController & signupControllerMethods = {
  usernameCheck: (req: Request, res: Response, next: NextFunction): void => {
    const { username }: { username: string } = req.body;
    // SQL query to check if username already exists in datebase, not unique.
    const checkUsernameExists = `SELECT * FROM users WHERE username='${username}';`;
    db.query(checkUsernameExists)
      .then((data: { rows: User[] }): void => {
        // if row 0 or username already exists, throw error
        if (data.rows[0]) {
          res.locals.error = 'Username already exists.';
          return next();
        } else {
          return next();
        }
      })
      .catch((err: ServerError): void => {
        return next({
          log: `Error in signupController usernameCheck: ${err}`,
          message: {
            err: 'An error occured while checking if username exists. See signupController.usernameCheck.',
          },
        });
      });
  },
  passwordCheck: (req: Request, res: Response, next: NextFunction): void => {
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
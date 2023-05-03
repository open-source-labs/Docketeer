import { Request, Response, NextFunction } from 'express';
import db from '../database/cloudModel';
import bcrypt from 'bcryptjs';
import { UserController, ServerError, UserInfo } from '../../types';

/**
 * @description Contains middleware that creates new user in database, gets all users from database verifies if user exists before sending back user data to login component
 * v12.0 implemented cookies for user sessions and deleted all system admin implementaion since it was nonfunctional
 */

const userController: UserController = {
  createUser: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {

    try {
      const {
        username,
        password,
      }: { username: string; password: string; } = req.body;
      // hash password
      const hashedPassword = await bcrypt.hash(password, 10);


      const createUser =
        'INSERT INTO users (username, password ) VALUES ($1, $2) RETURNING *;';
      const userDetails: string[] = [username, hashedPassword];
      const createdUser = await db.query(createUser, userDetails);
      res.locals.user = createdUser.rows[0];
      return next();
    } catch (err: unknown) {
      return next({
        log: `Error in userController newUser: ${err}`,
        message: {
          err: 'An error occurred creating new user in database. See userController.newUser.',
        },
      });
    }
  },

  getAllUsers: (req: Request, res: Response, next: NextFunction) => {
    if ('error' in res.locals) {
      return next();
    } else {
      const allUsers = 'SELECT * FROM users ORDER BY username ASC;';
      db.query(allUsers)
        .then((response: { rows: UserInfo[] }): void => {
          res.locals.users = response.rows;
          return next();
        })
        .catch((err: ServerError): void => {
          return next({
            log: `Error in userController getAllUsers: ${err}`,
            message: {
              err: 'An error occurred retrieving all users from database. See userController.getAllUsers.',
            },
          });
        });
    }
  },

  getOneUser: (req: Request, res: Response, next: NextFunction): void => {
    const { _id }: { _id: string } = req.body;
    const oneUser = 'SELECT * FROM users WHERE _id = $1;';
    db.query(oneUser, [_id])
      .then((response: { rows: UserInfo[] }): void => {
        res.locals.users = response.rows;
        return next();
      })
      .catch((err: ServerError): void => {
        return next({
          log: `Error in userController getOneUser: ${err}`,
          message: {
            err: 'An error occurred retrieving user from database. See userController.getOneUser.',
          },
        });
      });
  },

  verifyUser: (req: Request, res: Response, next: NextFunction): void => {
    const { username, password }: { username: string; password: string } =
      req.body;
    // using username we create a query string to grab that user
    const getUser = 'SELECT * FROM users WHERE username=$1;';
    // using bcrypt we check if client's password input matches the password of that username in the db; we then add to locals accordingly
    db.query(getUser, [username])
      .then(async (data: any) => {
        const match = await bcrypt.compare(password, data.rows[0].password);
        if (!data.rows[0] || !match) {
          return next({
            log: 'Error in userController\'s verifyUser method',
            status: 400,
            message: {
              err: 'Unable to verify user credentials.',
            },
          });
        }
        const verifiedUser = data.rows[0];
        res.locals.user = verifiedUser;
        return next();
      })
      .catch((err: ServerError) => {
        return next({
          log: `Error in userController checkUserExists: ${err}`,
          message: {
            err: 'An error occurred while checking if username exists. See userController.checkUserExists.',
          },
        });
      });
  },

  // adding cookie  
  addCookie: (req: Request, res: Response, next: NextFunction): void => {
    res.cookie('loggedIn', true);
    return next();
  },

  // verify cookie on refresh
  checkCookie: (req: Request, res: Response, next: NextFunction): void => {
    if (req.cookies.loggedIn) res.locals.signedIn = true;
    else res.locals.signedIn = false;
    return next();
  },

  // remove cookie on logout
  removeCookie: (req: Request, res: Response, next: NextFunction): void => {
    res.clearCookie('loggedIn');
    res.locals.loggedOut = true;
    return next();
  },
};

export default userController;
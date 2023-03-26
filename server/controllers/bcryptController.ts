/**
 * @module | bcryptController.ts
 * @description | Contains middleware that encrypts password before storing in database and compares a user's inputted password to their stored password
 **/

import db from '../database/cloudModel';
import bcrypt from 'bcryptjs';
import { Request, Response, NextFunction } from 'express';
import { BcryptController } from '../../types';

interface bcryptMethods {
  /**
   * @description destructures password from req.body then hashes it and adds it to locals under 'hash'
   */
  hashPassword,

  /**
   * @description destructures new password from req.body then hashes it and adds it to locals under 'newHashedPassword'
   */
  hashNewPassword,

  /**
   * @description uses roleID and username from users in locals to update user's token with cookie(after being hashed) adds token to user prop in locals
   */
  hashCookie
}

/**
 * @description A controller to handle hashing of passwords and cookies
 */
const bcryptController: BcryptController & bcryptMethods = {
  
  hashPassword: (req: Request, res: Response, next: NextFunction): void => {
    const { password }: { password: string } = req.body;
    const saltRounds = 10;

    bcrypt
      .hash(password, saltRounds)

      .then((hash: string): void => {
        // change hash parameter within our anonymous method to something more relevant, AKA hashPassword
        res.locals.hash = hash;
        return next();
      })
      .catch((err: Error): void => {
        return next({
          log: `Error in bcryptController hashPassword: ${err}`,
          message: {
            err: 'An error occured creating hash with bcrypt. See bcryptController.hashPassword.',
          },
        });
      });
  },

  // ==========================================================
  // Middleware: hashNewPassword
  // Purpose: checks if locals has an error prop; if not, hashes new user password with bCrypt and adds it to locals
  // ==========================================================
  // return type is Promise<void> signifying we return a promise w a void value; in this case the invocation of next()
  hashNewPassword: (
    req: Request,
    res: Response,
    next: NextFunction
  ): void => {
    // TODO check if new password works changed: Object.prototype.hasOwnProperty.call(res.locals, "error") to what is now on ln 51
    // if there is an error property on res.locals, return next(). i.e., incorrect password entered
    if (res.locals.error) {
      return next();
    }
    // else bCrypt the new password and move to next middleware
    const { newPassword }: { newPassword: string } = req.body;
    const saltRounds = 10;
    bcrypt
      .hash(newPassword, saltRounds)
      .then((hash: string): void => {
        res.locals.newHashedPassword = hash;
        return next();
      })
      .catch((err: Error): void => {
        return next({
          log: `Error in bcryptController hashNewPassword: ${err}`,
          message: {
            err: 'An error occured creating hash with bcrypt. See bcryptController.hashNewPassword.',
          },
        });
      });
  },

  hashCookie: (req: Request, res: Response, next: NextFunction): void => {
    const { role_id, username }: { role_id: number; username: string } =
      res.locals.user;
    const saltRounds = 10;
    if (role_id === 1) {
      bcrypt
        .hash(res.locals.cookie, saltRounds)
        .then((hash: string): void => {
          res.locals.user.token = hash;
          db.query(
            'ALTER TABLE users ADD COLUMN IF NOT EXISTS token varchar(250)'
          );
          db.query('UPDATE users SET token=$1 WHERE username=$2', [
            res.locals.user.token,
            username,
          ]);
          return next();
        })
        .catch((err: Error): void => {
          return next({
            log: `Error in bcryptController hashCookeis: ${err}`,
            message: {
              err: 'An error occured creating hash with bcrypt. See bcryptController.hashCookies.',
            },
          });
        });
    } else {
      return next();
    }
  },
};

export default bcryptController;

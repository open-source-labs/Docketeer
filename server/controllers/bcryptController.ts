import db from '../database/cloudModel';
import bcrypt from 'bcryptjs';
import { Request, Response, NextFunction } from 'express';
import { BcryptController } from '../../types';

/**
 * @description A controller to handle hashing of passwords and cookies
 */

const bcryptController: BcryptController = {
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

  hashNewPassword: (req: Request, res: Response, next: NextFunction): void => {
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
    const { username }: { username: string } = res.locals.user;
    const saltRounds = 10;
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
    return next();
  },
};

export default bcryptController;

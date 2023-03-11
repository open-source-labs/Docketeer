/**
 * @module | bcryptController.ts
 * @description | Contains middleware that encrypts password before storing in database and compares a user's inputted password to their stored password
 **/

import db from "../database/cloudModel";
import bcrypt from "bcryptjs";
import { Request, Response, NextFunction } from "express";
import { BcryptController } from "../../types";

const bcryptController: BcryptController = {
  // ==========================================================
  // Middleware: hashPassword
  // Purpose: hashes user password with bCrypt into SQL database input
  // ==========================================================

  hashPassword: (req: Request, res: Response, next: NextFunction): void => {
    const { password }: { password: string } = req.body;
    const saltRounds: number = 10;

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
            err: "An error occured creating hash with bcrypt. See bcryptController.hashPassword.",
          },
        });
      });
  },

  // ==========================================================
  // Middleware: hashNewPassword
  // Purpose: checks if locals has an error prop; if not, hashes new user password with bCrypt and adds it to locals
  // ==========================================================
  // return type is Promise<void> signifying we return a promise w a void value; in this case the invocation of next()
  hashNewPassword: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // TODO is Object.prototype necessary?
    // if there is an error property on res.locals, return next(). i.e., incorrect password entered
    if (Object.prototype.hasOwnProperty.call(res.locals, "error")) {
      return next();
    }
    // else bCrypt the new password and move to next middleware
    const { newPassword } = req.body;
    const saltRounds: number = 10;
    // TODO rename hash to newHashedPassword
    await bcrypt
      .hash(newPassword, saltRounds)
      .then((hash: string): void => {
        res.locals.hash = hash;
        return next();
      })
      .catch((err: Error): void => {
        return next({
          log: `Error in bcryptController hashNewPassword: ${err}`,
          message: {
            err: "An error occured creating hash with bcrypt. See bcryptController.hashNewPassword.",
          },
        });
      });
  },

  /**
   * @description hashes the locals property cookie. Creates a column in the database to store the hashed cookie
   */

  hashCookie: (req: Request, res: Response, next: NextFunction): void => {
    const { role_id, username }: { role_id: number, username: string } = res.locals.user;
    const saltRounds: number = 10;
    if (role_id === 1) {
      bcrypt
        .hash(res.locals.cookie, saltRounds)
        .then((hash: string): void => {
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
        .catch((err: Error): void => {
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
  },
};

export default bcryptController;

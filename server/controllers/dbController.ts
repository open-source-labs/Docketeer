import { Request, Response, NextFunction } from 'express';
import db from '../database/cloudModel';
import bcrypt from 'bcryptjs';
// import sysadmin from "../../security/sysadmin"; // only used in insertAdmin which is not currently used
import { DbController, ServerError } from '../../types';

/**
 * @description handles middleware functions that manipulate our database; contains middleware that checks if the database has a user table and creates one if it doesn't
 */
const dbController: DbController = {
  insertAdmin: (req: Request, res: Response, next: NextFunction) => {
    const { password } = res.locals;
    const email =
      sysadmin.email === null || sysadmin.email === ''
        ? 'sysadmin@email.com'
        : sysadmin.email;
    const phone =
      sysadmin.phone === null || sysadmin.phone === ''
        ? '+15013456789'
        : sysadmin.email;

  //   const parameters: (string | number)[] = [email, password, phone];

    db.query(
      "INSERT INTO users (username, email, password, phone, role, role_id) VALUES ('sysadmin', $1, $2, $3, 'system admin', '1') ON CONFLICT DO NOTHING;",
      parameters,
    )
      .then(() => {
        return next();
      })
      .catch((err: ServerError) => {
        if (err) return next(err);
      });
  },

  createAdminPassword: (req: Request, res: Response, next: NextFunction) => {
    const saltRounds = 10;

    // make a file called systemAdmin.js, make it have admin details such as password, email, phone number, and add to gitignore
    bcrypt
      .hash('belugas', saltRounds)
      .then((hash: string) => {
        res.locals.password = hash;
        return next();
      })
      .catch((err: ServerError): void => {
        return next({
          log: `Error in bcryptController hashPassword: ${err}`,
          message: {
            err: 'An error occured creating hash with bcrypt. See bcryptController.hashPassword.',
          },
        });
      });
  },
};
export default dbController;

/**
 * @description removes token from database
 */

//not being used but can be if you decide to store jwt in database in the future
//   removeToken: (req: Request, res: Response, next: NextFunction) => {
//     const { username } = req.body;

//     db.query('UPDATE users SET token = null WHERE username=$1', [username])
//       .then(() => {
//         res.locals.logout = 'Successfully logged out.';
//         res.clearCookie('admin');
//         return next();
//       })
//       .catch((err: ServerError) => {
//         if (err) return next(err);
//       });
//   },
// };

/**
 * @module | dbController.ts
 * @description | contains middleware that checks if the database has a user table and creates one if it doesn't
 **/
import { Request, Response, NextFunction } from 'express';
import db from '../database/cloudModel';
import bcrypt from 'bcryptjs';
// TODO import sysadmin from "../../security/sysadmin"; // only used in insertAdmin which is not used
import { DbController, ServerError } from '../../types';

interface dbControllerMethods {
  /**
  * @description creates a database table called "roles" if it doesn't exist. db.query executes SQL query.
  * @note OIDS is optional for this middleware
   */
  createRolesTable,

  /**
  * @description inserts 3 rows into databse for "roles": "system admin" (1), "admin" (2), "user" (3)
  * @note uses single SQl query for all 3 rows in terms of string query
   */
  insertRoles,

  /**
  * @description Creates a table in database called "users" with user and container info
  */
  createUsersTable,

  /**
   * @description Creates a hashed password for the system admin user with 10 salt rounds (decrease for faster processing)
   * @note adds the password as a string for the res.locals object
   */
  createAdminPassword,

  /**
   * @description Updates user token in the database
   * @note Destructures username and token from request body
   */
  addToken,

  /**
   * @description Removes token (sets token to null) after user logs out.
   * @note Destructures username from request body. Logout propery is created if SQL query is able to update users token to null.
   */
  removeToken

}

/**
 * @description handles middleware functions that manipulate our database; contains middleware that checks if the database has a user table and creates one if it doesn't
 */
const dbController: DbController & dbControllerMethods = {
  createRolesTable: (req: Request, res: Response, next: NextFunction): void => {
    db.query(
      'CREATE TABLE IF NOT EXISTS roles (_id SERIAL NOT NULL, role VARCHAR (255) NOT NULL, PRIMARY KEY (_id)) WITH (OIDS = FALSE);'
    )
      .then(() => {
        return next();
      })
      .catch((err: ServerError) => {
        if (err) return next(err);
      });
  },
  insertRoles: (req: Request, res: Response, next: NextFunction): void => {
    db.query(
      'INSERT INTO roles (role) VALUES (\'system admin\'); INSERT INTO roles (role) VALUES (\'admin\'); INSERT INTO roles (role) VALUES (\'user\');'
    )
      .then(() => {
        return next();
      })
      .catch((err: ServerError) => {
        if (err) return next(err);
      });
  },
  createUsersTable: (req: Request, res: Response, next: NextFunction): void => {
    db.query(
      'CREATE TABLE IF NOT EXISTS users (_id SERIAL NOT NULL, username VARCHAR (255) UNIQUE NOT NULL, email VARCHAR (255) NOT NULL, password VARCHAR (255) NOT NULL, phone VARCHAR (255), role VARCHAR (255) DEFAULT user, role_id INTEGER DEFAULT 3, contact_pref VARCHAR (255), mem_threshold INTEGER DEFAULT 80, cpu_threshold INTEGER DEFAULT 80, container_stops BOOLEAN DEFAULT true, PRIMARY KEY (_id), FOREIGN KEY (role_id) REFERENCES Roles(_id)) WITH (OIDS = FALSE);'
    ).catch((err: ServerError) => {
      return next(err);
    });
  },
  // TODO what is this used for
  // insertAdmin: (req: Request, res: Response, next: NextFunction) => {
  //   const { password }: { password: string } = res.locals;
  //   const email: string =
  //     sysadmin.email === null || sysadmin.email === ""
  //       ? "sysadmin@email.com"
  //       : sysadmin.email;
  //   const phone: string | number =
  //     sysadmin.phone === null || sysadmin.phone === ""
  //       ? "+15013456789"
  //       : sysadmin.email;

  //   const parameters: (string | number)[] = [email, password, phone];

  //   db.query(
  //     "INSERT INTO users (username, email, password, phone, role, role_id) VALUES ('sysadmin', $1, $2, $3, 'system admin', '1') ON CONFLICT DO NOTHING;",
  //     parameters
  //   )
  //     .then(() => {
  //       return next();
  //     })
  //     .catch((err: ServerError) => {
  //       if (err) return next(err);
  //     });
  // },
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
  addToken: (req: Request, res: Response, next: NextFunction) => {
    const { username, token }: { username: string, token: string } = req.body;
    db.query('UPDATE users SET token=$1 WHERE username=$2', [token, username])
      .then(() => {
        res.locals.login = 'Successfully logged in.';
        return next();
      })
      .catch((err: ServerError) => {
        if (err) return next(err);
      });
  },
  removeToken: (req: Request, res: Response, next: NextFunction) => {
    const { username }: { username: string } = req.body;

    db.query('UPDATE users SET token = null WHERE username=$1', [username])
      .then(() => {
        res.locals.logout = 'Successfully logged out.';
        return next();
      })
      .catch((err: ServerError) => {
        if (err) return next(err);
      });
  },
};
export default dbController;
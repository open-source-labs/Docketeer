/**
 * @module | dbController.ts
 * @description | contains middleware that checks if the database has a user table and creates one if it doesn't
 **/

import { Request, Response, NextFunction } from 'express';
import db from '../database/cloudModel';
import bcrypt from 'bcryptjs';
// TODO import sysadmin from "../../security/sysadmin"; // only used in insertAdmin which is not used
import { DbController, ServerError } from '../../types';
// TODO seems to have the exact functionality of schema2 in the database folder
const dbController: DbController = {
  // ==========================================================
  // Middleware: createRoles
  // Purpose: creates a table, roles, and gives it 2 columns: _id and role, _id is the primary key, oids false to optimize performance
  // ==========================================================

  createRoles: (req: Request, res: Response, next: NextFunction): void => {
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

  // ==========================================================
  // Middleware: insertRoles
  // Purpose: inserts 3 rows to roles: sys admin, admin, user; they have unique ids 1,2,3
  // ==========================================================

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

  // ==========================================================
  // Middleware: createTable
  // Purpose: creates a NEW table with user and container info
  // ==========================================================

  createTable: (req: Request, res: Response, next: NextFunction): void => {
    db.query(
      'CREATE TABLE IF NOT EXISTS users (_id SERIAL NOT NULL, username VARCHAR (255) UNIQUE NOT NULL, email VARCHAR (255) NOT NULL, password VARCHAR (255) NOT NULL, phone VARCHAR (255), role VARCHAR (255) DEFAULT \'user\', role_id INTEGER DEFAULT 3, contact_pref VARCHAR (255), mem_threshold INTEGER DEFAULT 80, cpu_threshold INTEGER DEFAULT 80, container_stops BOOLEAN DEFAULT true, PRIMARY KEY (_id), FOREIGN KEY (role_id) REFERENCES Roles(_id)) WITH (OIDS = FALSE);'
    )
      // TODO is this then necessary?
      .then(() => {
        return next();
      })
      .catch((err: ServerError) => {
        if (err) return next(err);
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

  /**
   * @description removes token from database
   */
  // TODO when was token given?

  // ==========================================================
  // Middleware: removeToken
  // Purpose: Removes token (sets token to null) after user logs out.
  // TODO: No addToken/initiation of token to user exists.
  // ==========================================================

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

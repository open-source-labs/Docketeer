/**
 * @module | dbController.ts
 * @description | contains middleware that checks if the database has a user table and creates one if it doesn't
 **/

import { Request, Response, NextFunction } from 'express';
import db from '../database/cloudModel';
import bcrypt from 'bcryptjs';
import sysadmin from '../../security/sysadmin';
import { DbController, ServerError } from '../../types';

const dbController: DbController = {
  createRoles: (req: Request, res: Response, next: NextFunction) => {
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

  insertRoles: (req: Request, res: Response, next: NextFunction) => {
    db.query(
      "INSERT INTO roles (role) VALUES ('system admin'); INSERT INTO roles (role) VALUES ('admin'); INSERT INTO roles (role) VALUES ('user');"
    )
      .then(() => {
        return next();
      })
      .catch((err: ServerError) => {
        if (err) return next(err);
      });
  },

  createTable: (req: Request, res: Response, next: NextFunction) => {
    db.query(
      "CREATE TABLE IF NOT EXISTS users (_id SERIAL NOT NULL, username VARCHAR (255) UNIQUE NOT NULL, email VARCHAR (255) NOT NULL, password VARCHAR (255) NOT NULL, phone VARCHAR (255), role VARCHAR (255) DEFAULT 'user', role_id INTEGER DEFAULT 3, contact_pref VARCHAR (255), mem_threshold INTEGER DEFAULT 80, cpu_threshold INTEGER DEFAULT 80, container_stops BOOLEAN DEFAULT true, PRIMARY KEY (_id), FOREIGN KEY (role_id) REFERENCES Roles(_id)) WITH (OIDS = FALSE);"
    )
      .then(() => {
        return next();
      })
      .catch((err: ServerError) => {
        if (err) return next(err);
      });
  },

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

    const parameters = [email, password, phone];

    db.query(
      "INSERT INTO users (username, email, password, phone, role, role_id) VALUES ('sysadmin', $1, $2, $3, 'system admin', '1') ON CONFLICT DO NOTHING;",
      parameters
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
      .then((hash) => {
        res.locals.password = hash;
        return next();
      })
      .catch((err: ServerError) => {
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

  removeToken: (req: Request, res: Response, next: NextFunction) => {
    const { username } = req.body;

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

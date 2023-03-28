import { Request, Response, NextFunction } from 'express';
import db from '../database/cloudModel';
import bcrypt from 'bcryptjs';
// only used in insertAdmin which is not used
// import sysadmin from "../../security/sysadmin";
import { DbController, ServerError } from '../../types';

/**
 * @description handles middleware functions that manipulate our database; contains middleware that checks if the database has a user table and creates one if it doesn't
 */
const dbController: DbController = {
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
  
  // below is insert admin

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
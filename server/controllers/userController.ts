import { Request, Response, NextFunction } from 'express';
import db from '../database/cloudModel';
import bcrypt from 'bcryptjs';
import { UserController, ServerError, UserInfo } from '../../types';

/**
 * @description Contains middleware that creates new user in database, gets all users from database for system admin, and verifies user exists before sending back user data to login component
 */
const userController: UserController = {
const userController: UserController = {
  createUser: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {

    console.log('in userController.createUser');

    try {
      const {
        username,
        password,
        role_id,
      }: { username: string; password: string; role_id: string } = req.body;
      // hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      let role: string;
      switch (role_id) {
        case '1':
          role = 'system admin';
          break;
        case '2':
          role = 'admin';
          break;
        case '3':
          role = 'user';
          break;
        default:
          role = '';
        case '1':
          role = 'system admin';
          break;
        case '2':
          role = 'admin';
          break;
        case '3':
          role = 'user';
          break;
        default:
          role = '';
      }

      console.log('ab to query to create user');

      const createUser =
        'INSERT INTO users (username, password, role, role_id) VALUES ($1, $2, $3, $4) RETURNING *;';
      // create an array, userDetails, to hold values from our createUser SQL query placeholders.
      const userDetails: string[] = [username, hashedPassword, role, role_id];
      const createdUser = await db.query(createUser, userDetails);

      console.log('createdUser: ', createdUser.rows[0]);

      // ? new user is added to res.locals, but all users are grabbed from res.locals.users in getAllUsers
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
    const oneUser = `SELECT * FROM users WHERE _id = ${_id};`;
    db.query(oneUser)
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
    const getUser = `SELECT * FROM users WHERE username='${username}';`;
    //   using bcrypt we check if client's password input matches the password of that username in the db; we then add to locals accordingly
    db.query(getUser)
      .then(async (data: { rows: UserInfo[] }): Promise<void> => {
        const match = await bcrypt.compare(password, data.rows[0].password);
        if (data.rows[0] && match) {
          res.locals.user = data.rows[0];
          return next();
        } else {
          res.locals.error = 'Incorrect username or password.';
        }
      })
      .catch((err: ServerError): void => {
        return next({
          log: `Error in userController checkUserExists: ${err}`,
          message: {
            err: 'An error occurred while checking if username exists. See userController.checkUserExists.',
          },
        });
      });
  },
  checkSysAdmin: (req: Request, res: Response, next: NextFunction): void => {
    const query = 'SELECT * FROM users WHERE role_id = 1';
    db.query(query)
      .then((data: any) => {
        res.locals.sysAdmins = data.rowCount;
        res.locals.id = data.rows[0]._id;
        return next();
      })
      .catch((err: ServerError) => {
        return next({
          log: `Error in userController switchUserRole: ${err}`,
          message: {
            err: 'An error occurred while checking number of SysAdmins. See userController.checkSysAdmins.',
          },
        });
      });
  },
  switchUserRole: (req: Request, res: Response, next: NextFunction): void => {
    // ? creates an object that contains roles is this necessary?
    const roleMap: { [k: string]: number } = {
      'system admin': 1,
      admin: 2,
      user: 3,
    };
    const { _id, role }: { _id: string; role: string } = req.body;
    // checks if there is only 1 sysAdmin and if their _id is equal to id sent in body; adds hasError prop to locals if so
    if (res.locals.sysAdmins === 1 && _id === res.locals.id) {
      res.locals.hasError = true;
      return next();
      // otherwise we update the users role (found user from id given in body) to role sent in body; we
    } else {
      const query =
        'UPDATE users SET role = $1, role_id = $2 WHERE _id = $3 RETURNING *;';
      const parameters = [role, roleMap[role], _id];
      // we will return the role that the user was updated to
      db.query(query, parameters)
        .then((data: { rows: UserInfo[] }): void => {
          res.locals.role = data.rows[0].role;
          res.locals.hasError = false;
          return next();
        })
        .catch((err: ServerError): void => {
          return next({
            log: `Error in userController switchUserRole: ${err}`,
            message: {
              err: 'An error occurred while switching roles. See userController.switchUserRole.',
            },
          });
        });
    }
  },

  updatePassword: (req: Request, res: Response, next: NextFunction): void => {
    // if there is an error property on res.locals, return next(). i.e., incorrect password entered
    if (res.locals.error) {
      res.locals.error =
        'Incorrect password. Please enter the correct password to update it.';
      return next();
    }
    const { newHashedPassword }: { newHashedPassword: string } = res.locals as {
      newHashedPassword: string;
    };
    const { username }: { username: string } = req.body;
    // from v10: have the query return every column but the password column. Might be a security concern to be sending the user's hashed password to the client.
    // from v10: have the query return every column but the password column. Might be a security concern to be sending the user's hashed password to the client.
    // define a querystring to update password of our user and return the affected columns
    const query =
      'UPDATE users SET password = $1 WHERE username = $2 RETURNING *;';
    const parameters: string[] = [newHashedPassword, username];
    db.query(query, parameters)
      .then((data: { rows: UserInfo[] }): void => {
        res.locals.user = data.rows[0];
        return next();
      })
      .catch((err: ServerError): void => {
        return next({
          log: `Error in userController updatePassword: ${err}`,
          message: {
            err: 'An error occurred while checking if username exists. See userController.updatePassword.',
          },
        });
      });
  },
  updatePhone: (req: Request, res: Response, next: NextFunction): void => {
    const { username, phone }: { username: string; phone: number } = req.body;
    const query =
      'UPDATE users SET phone = $1 WHERE username = $2 RETURNING *;';
    const parameters: (string | number)[] = [phone, username];
    db.query(query, parameters)
      .then((data: { rows: UserInfo[] }): void => {
        res.locals.user = data.rows[0];
        return next();
      })
      .catch((err: ServerError): void => {
        return next({
          log: `Error in userController updatePhone: ${err}`,
          message: {
            err: 'An error occurred while checking if username exists. See userController.updatePhone.',
          },
        });
      });
  },
  updateEmail: (req: Request, res: Response, next: NextFunction): void => {
    const { username, email }: { username: string; email: string } = req.body;
    const query =
      'UPDATE users SET email = $1 WHERE username = $2 RETURNING *;';
    const parameters: string[] = [email, username];
    db.query(query, parameters)
      .then((data: { rows: UserInfo[] }): void => {
        res.locals.user = data.rows[0];
        return next();
      })
      .catch((err: ServerError): void => {
        return next({
          log: `Error in userController updateEmail: ${err}`,
          message: {
            err: 'An error occurred while checking if username exists. See userController.updateEmail.',
          },
        });
      });
  },

  addCookie: (req: Request, res: Response, next: NextFunction): void => {
    res.cookie('loggedIn', true);
    return next();
  },

  checkCookie: (req: Request, res: Response, next: NextFunction): void => {
    if (!req.cookies.loggedIn) res.locals.notSignedIn = true;
    return next();
  },

  removeCookie: (req: Request, res: Response, next: NextFunction): void => {
    console.log('abt to rmv cookie');
    res.clearCookie('loggedIn');
    console.log('cookied rmvd');
    res.locals.loggedOut = true;
    return next();
  },

  addCookie: (req: Request, res: Response, next: NextFunction): void => {
    res.cookie('loggedIn', true);
    return next();
  },

  checkCookie: (req: Request, res: Response, next: NextFunction): void => {
    if (!req.cookies.loggedIn) res.locals.notSignedIn = true;
    return next();
  },

  removeCookie: (req: Request, res: Response, next: NextFunction): void => {
    console.log('abt to rmv cookie');
    res.clearCookie('loggedIn');
    console.log('cookied rmvd');
    res.locals.loggedOut = true;
    return next();
  },
};
export default userController;

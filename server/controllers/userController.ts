/**
 * @module | userController.ts
 * @description | Contains middleware that creates new user in database, gets all users from database for system admin, and verifies user exists before sending back user data to login component
 **/
// TODO ANY types throughout this file; use ctrl + f
import { Request, Response, NextFunction } from "express";
import db from "../database/cloudModel";
import bcrypt from "bcryptjs";
import { UserController, ServerError } from "../../types";

const userController: UserController = {
  // ==========================================================
  // Middleware: createUser
  // Purpose:  Checks for error, and creates a user based on switch statement to check against role_id for system admin, admin, user
  // ==========================================================

  createUser: (req: Request, res: Response, next: NextFunction) => {
    if (res.locals.error) return next();

    const { username, email, phone, role_id } = req.body;
    //retrieve hashed password from res locals

    const { hash } = res.locals;
    let role;

    switch (role_id) {
      case "1":
        role = "system admin";
        break;
      case "2":
        role = "admin";
        break;
      case "3":
        role = "user";
        break;
    }
    // ==========================================================
    // Function: createUser
    // Purpose:  Performs SQL query to insert a new record into "users" table and then RETURNS those values.
    // ==========================================================
    const createUser =
      "INSERT INTO users (username, email, password, phone, role, role_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;";

    //create an array, userDetails, to hold values from our createUser SQL query placeholders.
    const userDetails = [username, email, hash, phone, role, role_id];
    console.log("USERDETAILS:", userDetails);

    //check if username and hashed password exist
    if (username && hash) {
      db.query(createUser, userDetails)
        .then((data: any) => {
          //data.rows[0] is the newly inserted record from our createUser SQL query
          res.locals.user = data.rows[0];
          return next();
        })
        .catch((err: ServerError) => {
          return next({
            log: `Error in userController newUser: ${err}`,
            message: {
              err: "An error occurred creating new user in database. See userController.newUser.",
            },
          });
        });
    }
  },
  // ==========================================================
  // Middleware: getAllUsers
  // Purpose: gets all users; returned in an array
  // ==========================================================
  getAllUsers: (req: Request, res: Response, next: NextFunction) => {
    // TODO is Object.prototype necessary here?
    if (Object.prototype.hasOwnProperty.call(res.locals, "error")) {
      return next();
    } else {
      // TODO should this be returned ORDER'ed by name instead?
      const allUsers = "SELECT * FROM users ORDER BY _id ASC;";
      // TODO any
      db.query(allUsers)
        .then((response: any) => {
          res.locals.users = response.rows;
          return next();
        })
        .catch((err: ServerError) => {
          return next({
            log: `Error in userController getAllUsers: ${err}`,
            message: {
              err: "An error occurred retrieving all users from database. See userController.getAllUsers.",
            },
          });
        });
    }
  },

  // get information for one user
  getOneUser: (req: Request, res: Response, next: NextFunction) => {
    const { _id } = req.body;

    const oneUser = `SELECT * FROM users WHERE _id = ${_id};`;

    db.query(oneUser)
      .then((response: any) => {
        res.locals.users = response.rows;
        return next();
      })
      .catch((err: ServerError) => {
        return next({
          log: `Error in userController getOneUser: ${err}`,
          message: {
            err: "An error occurred retrieving user from database. See userController.getOneUser.",
          },
        });
      });
  },

  // ==========================================================
  // Middleware: verifyUser
  // Purpose: verifies username/password are correct and sends back that user info; otherwise sends an error message
  // ==========================================================
  verifyUser: (req: Request, res: Response, next: NextFunction) => {
    // TODO checks if locals has error; is this necessary?
    if (res.locals.error) return next();

    const { username, password } = req.body;

    // using username we create a query string to grab that user
    const getUser = `SELECT * FROM users WHERE username='${username}';`;

    // TODO Don't use async with then chaining; also data is any typed
    // using bcrypt we check if client's password input matches the password of that username in the db; we then add to locals accordingly
    db.query(getUser)
      .then(async (data: any) => {
        const match = await bcrypt.compare(password, data.rows[0].password);
        if (data.rows[0] && match) {
          res.locals.user = data.rows[0];
          return next();
        } else {
          res.locals.error = "Incorrect username or password.";
          // TODO do we need to delete user here?
          delete res.locals.user;
        }
      })
      // TODO determine what this catches, in mongoDB it would catch when the schema is broken
      .catch((err: ServerError) => {
        return next({
          log: `Error in userController checkUserExists: ${err}`,
          message: {
            err: "An error occurred while checking if username exists. See userController.checkUserExists.",
          },
        });
      });
  },

  // ==========================================================
  // Middleware: checkSysAdmin
  // Purpose: grabs all users that have a role of system admin and adds rowCount and id of the users to locals
  // ==========================================================
  // TODO named checkSysAdmin but does NOT check if you are a sysAdmin; simply gives rowCount of systemAdmins to locals
  checkSysAdmin: (req: Request, res: Response, next: NextFunction) => {
    const query = "SELECT * FROM users WHERE role_id = 1";

    db.query(query)
      // TODO any
      .then((data: any) => {
        // TODO misleading name; sending rowCount yet named sysAdmins??
        res.locals.sysAdmins = data.rowCount;
        res.locals.id = data.rows[0]._id;
        return next();
      })
      .catch((err: ServerError) => {
        return next({
          log: `Error in userController switchUserRole: ${err}`,
          message: {
            err: "An error occurred while checking number of SysAdmins. See userController.checkSysAdmins.",
          },
        });
      });
  },
  // TODO review below mw and above mw
  // ==========================================================
  // Middleware: switchUserRole
  // Purpose: switches role of user upon designation by system admin; must be provided id of user and role
  // ==========================================================
  switchUserRole: (req: Request, res: Response, next: NextFunction) => {
    // ? creates an object that contains roles is this necessary?
    const roleMap: { [k: string]: number } = {
      "system admin": 1,
      admin: 2,
      user: 3,
    };

    const { _id, role } = req.body;
    // checks if there is only 1 sysAdmin and if their _id is equal to id sent in body; adds hasError prop to locals if so
    // TODO loosely equal? isnt best practice to return the invocation of next
    // TODO also this is faulty logic, determines if number of sysAdmins is 1 and if body given in id is equal to that sysAdmins id; why does this result in adding an error prop?
    if (res.locals.sysAdmins === 1 && _id == res.locals.id) {
      res.locals.hasError = true;
      next();
      // otherwise we update the users role (found user from id given in body) to role sent in body; we
    } else {
      const query =
        "UPDATE users SET role = $1, role_id = $2 WHERE _id = $3 RETURNING *;";

      const parameters = [role, roleMap[role], _id];
      // we will return the role user got updated to
      db.query(query, parameters)
        // TODO any
        .then((data: any) => {
          res.locals.role = data.rows[0].role;
          res.locals.hasError = false;
          return next();
        })
        .catch((err: ServerError) => {
          return next({
            log: `Error in userController switchUserRole: ${err}`,
            message: {
              err: "An error occurred while switching roles. See userController.switchUserRole.",
            },
          });
        });
    }
  },
  // TODO is this used?
  // ==========================================================
  // Middleware: updatePassword
  // Purpose: checks for error prop in locals; if none, updates password and adds user with updated pw to locals
  // ==========================================================
  updatePassword: (req: Request, res: Response, next: NextFunction) => {
    // TODO is Object.prototype necessary?
    // if there is an error property on res.locals, return next(). i.e., incorrect password entered
    if (Object.prototype.hasOwnProperty.call(res.locals, "error")) {
      res.locals.error =
        "Incorrect password. Please enter the correct password to update it.";
      return next();
    }
    const { hash } = res.locals;
    const { username } = req.body;

    // TODO: for future, have the query return every column but the password column. Might be a security concern to be sending the user's hashed password to the client.
    // define a querystring to update password of our user and return the affected columns
    const query =
      "UPDATE users SET password = $1 WHERE username = $2 RETURNING *;";
    const parameters = [hash, username];
    // TODO any
    db.query(query, parameters)
      .then((data: any) => {
        res.locals.user = data.rows[0];
        return next();
      })
      .catch((err: ServerError) => {
        return next({
          log: `Error in userController updatePassword: ${err}`,
          message: {
            err: "An error occurred while checking if username exists. See userController.updatePassword.",
          },
        });
      });
  },

  //TODO is this working?
  // ==========================================================
  // Middleware: updatePhone
  // Purpose: updates the phone number of a user; column is 'phone'
  // ==========================================================
  updatePhone: (req: Request, res: Response, next: NextFunction) => {
    const { username, phone } = req.body;

    const query =
      "UPDATE users SET phone = $1 WHERE username = $2 RETURNING *;";
    const parameters = [phone, username];
    // TODO any
    db.query(query, parameters)
      .then((data: any) => {
        res.locals.user = data.rows[0];
        return next();
      })
      .catch((err: ServerError) => {
        return next({
          log: `Error in userController updatePhone: ${err}`,
          message: {
            err: "An error occurred while checking if username exists. See userController.updatePhone.",
          },
        });
      });
  },

  // TODO is this used?
  // ==========================================================
  // Middleware: updateEmail
  // Purpose: updates the email of a user
  // ==========================================================
  updateEmail: (req: Request, res: Response, next: NextFunction) => {
    const { username, email } = req.body;

    const query =
      "UPDATE users SET email = $1 WHERE username = $2 RETURNING *;";
    const parameters = [email, username];
    // TODO any
    db.query(query, parameters)
      .then((data: any) => {
        res.locals.user = data.rows[0];
        return next();
      })
      .catch((err: ServerError) => {
        return next({
          log: `Error in userController updateEmail: ${err}`,
          message: {
            err: "An error occurred while checking if username exists. See userController.updateEmail.",
          },
        });
      });
  },
};

export default userController;

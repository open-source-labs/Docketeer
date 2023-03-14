/**
 * @module | signupRouter.ts
 * @description | Routes all requests to signup endpoint
 **/

import { Router, Request, Response } from 'express';
import signupController from '../controllers/signupController';
import bcryptController from '../controllers/bcryptController';
import userController from '../controllers/userController';
import apiController from '../controllers/apiController';
// TODO combine with other sign-up login
const router = Router();

// Only trigger this endpoint when sysAdmin logs in; gets all users
router.get(
  '/',
  userController.getAllUsers,
  (req: Request, res: Response): Response => {
    return res.status(200).json(res.locals.users);
  }
);

// TODO could we combine username and password checks?

// ==========================================================
// Route: /
// Purpose: Verifies fields during sign up process are correct/checked against criteria
// ==========================================================
// TODO is usernameCheck necessary?
router.post(
  '/',
  signupController.usernameCheck,
  signupController.passwordCheck,
  bcryptController.hashPassword,
  userController.createUser,
  apiController.signupEmail,
  (req: Request, res: Response): Response => {
    if (res.locals.error) return res.status(201).json(res.locals);
    return res.status(201).json('successfully added new user to database');
  }
);

export default router;

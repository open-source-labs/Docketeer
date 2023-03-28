/**
 * @module | signupRouter.ts
 * @description | Routes all requests to signup endpoint
 **/

import { Router, Request, Response } from 'express';
// import signupController from '../controllers/signupController';
import bcryptController from '../controllers/bcryptController';
import userController from '../controllers/userController';
import apiController from '../controllers/apiController';
const router = Router();

// Only trigger this endpoint when sysAdmin logs in; gets all users
router.get(
  '/',
  userController.getAllUsers,
  (req: Request, res: Response): Response => {
    return res.status(200).json(res.locals.users);
  }
);

// ==========================================================
// Route: /
// Purpose: Hashes password and inserts user to db
// ==========================================================

router.post(
  '/',
  // createUser will have functionality that hashes the password before we add user to the db
  userController.createUser,
  (req: Request, res: Response): Response => {
    if (res.locals.error) return res.status(201).json(res.locals);
    return res.status(201).json('successfully added new user to database');
  }
);

export default router;

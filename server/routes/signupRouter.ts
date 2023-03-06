/**
 * @module | signupRouter.ts
 * @description | Routes all requests to signup endpoint
 **/

import { Router, Request, Response } from 'express';
import signupController from '../controllers/signupController';
import bcryptController from '../controllers/bcryptController';
import userController from '../controllers/userController';

const router = Router();

// Only trigger this endpoint when sysAdmin logs in
router.get('/', userController.getAllUsers, (req: Request, res: Response) => {
  return res.status(200).json(res.locals.users);
});

router.post(
  '/',
  signupController.usernameCheck,
  signupController.passwordCheck,
  bcryptController.hashPassword,
  userController.createUser,
  (req: Request, res: Response) => {
    if (res.locals.token) {
      res.cookie('admin', res.locals.token, { httpOnly: true });
      return res.status(201).json(res.locals.newUser);
    } else {
      return res.status(200).json(res.locals.newUser);
    }
  },
);

export default router;

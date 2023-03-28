/**
 * @module AdminRouter
 * @description Routes all requests to admin endpoint
 */
// TODO is this file used?
import { Router, Request, Response } from 'express';
import userController from '../controllers/userController';

const router = Router();

// Checks if client has sysadmin privilege. Get all users from users table and send back to client (system admin); sends an arr of the users
router.post(
  '/',
  userController.getAllUsers,
  (req: Request, res: Response): Response => {
    if (res.locals.error) return res.status(201).json(res.locals.error);
    console.log('sending users to client');
    return res.status(201).json(res.locals.users);
  }
);

// Checks if client has sysadmin privilege. Switch user role from 'user' to 'admin' and vice-versa.
router.post(
  '/switch',
  userController.checkSysAdmin,
  userController.switchUserRole,
  (req: Request, res: Response): Response => {
    return res.status(201).json(res.locals.hasError);
  }
);

export default router;

/**
 * @module AdminRouter
 * @description Routes all requests to admin endpoint
 */
import { Router, type Request, type Response } from 'express';
import userController from '../controllers/userController';

const router = Router();

// Route Handler: Checks if client has sysadmin privilege. Get all users from users table and send back to client (system admin)
router.post('/',
  userController.getAllUsers,
  (req: Request, res: Response) => {
    if (res.locals.error) return res.status(201).json(res.locals.error);
    return res.status(201).json(res.locals.users);
  }
);

// Route Handler: Checks if client has sysadmin privilege. Switch user role from 'user' to 'admin' and vice-versa.
router.post('/switch',
  userController.checkSysAdmin,
  userController.switchUserRole,
  (req: Request, res: Response) => {
    return res.status(201).json(res.locals.hasError);
  }
);

export default router;

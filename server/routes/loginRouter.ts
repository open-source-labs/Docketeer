/**
 * @module Login Router
 * @description Routes all requests to login endpoint
 */
import { Request, Response, Router } from 'express';
import userController from '../controllers/userController';

const router = Router();

// ==========================================================
// Route: /
// Purpose: verify username and password
// ==========================================================

router.post(
  '/',
  userController.verifyUser,
  (req: Request, res: Response): Response => {
    if (res.locals.error) return res.status(201).json(res.locals);
    return res.status(201).json(res.locals.user);
  }
);

export default router;

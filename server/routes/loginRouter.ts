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
  userController.addCookie,
  (req: Request, res: Response): Response => {
    return res.status(201).json(res.locals.user);
  });

router.get('/checkCookie', userController.checkCookie, (req: Request, res: Response): Response => {
  return res.status(200).json(res.locals.signedIn);
});

export default router;

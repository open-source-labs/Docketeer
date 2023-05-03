/**
 * @module Logout Router
 * @description Routes all requests to logout endpoint
 */
import { Router, Request, Response } from 'express';
import userController from '../controllers/userController';
const router = Router();

// ==========================================================
// Route: /
// Purpose: Removes token (sets token to null) after user logs out.
// ==========================================================
router.post(
  '/',
  userController.removeCookie,
  (req: Request, res: Response): Response => {
    return res.status(201).json({ loggedOut: 'true' });
  }
);

export default router;

/**
 * @module Logout Router
 * @description Routes all requests to logout endpoint
 */
import { Router, Request, Response } from 'express';
import dbController from '../controllers/dbController';
const router = Router();
// Note: we remove a token, though tokens are added in bcryptController.hashCookie and hashCookie mw is never used in any of our routes

// ==========================================================
// Route: /
// Purpose: Removes token (sets token to null) after user logs out.
// Note: 
// ==========================================================
router.post(
  '/',
  dbController.removeToken,
  (req: Request, res: Response): Response => {
    return res.status(201).json(res.locals.logout);
  }
);

export default router;

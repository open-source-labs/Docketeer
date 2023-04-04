/**
 * @module Logout Router
 * @description Routes all requests to logout endpoint
 */
import { Router, Request, Response } from 'express';
const router = Router();

// ==========================================================
// Route: /
// Purpose: Removes jwt after user clicks log out. Should implement sessions in the future.
// ==========================================================
router.post('/', (req: Request, res: Response): Response => {
  res.clearCookie('admin', { httpOnly: true });
  return res.status(201).json({ loggedOut: 'true' });
});

export default router;

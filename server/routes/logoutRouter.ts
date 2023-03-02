/**
 * @module Logout Router
 * @description Routes all requests to logout endpoint
 */
import { Router, Request, Response } from 'express';
// import dbController from '../controllers/dbController';
// import userController from '../controllers/userController';
const router = Router();
// Note: we remove a token, though tokens are added in bcryptController.hashCookie and hashCookie mw is never used in any of our routes

router.post('/', (req: Request, res: Response) => {
  res.clearCookie('admin', { httpOnly: true });
  return res.status(201).json({ loggedOut: 'true' });
});

export default router;

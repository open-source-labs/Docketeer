/**
 * @module Logout Router
 * @description Routes all requests to logout endpoint
 */
import { Router, Request, Response } from 'express';
import dbController from '../controllers/dbController';

const router = Router();

router.post('/', (req: Request, res: Response) => {
  res.clearCookie('admin', { httpOnly: true });
  return res.status(201).json({ loggedOut: 'true' });
});

export default router;

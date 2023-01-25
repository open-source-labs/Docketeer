/**
 * @module Logout Router
 * @description Routes all requests to logout endpoint
 */
import { Router, Request, Response } from 'express';
import dbController from '../controllers/dbController';

const router = Router();

router.post('/', 
  dbController.removeToken, 
  (req: Request, res: Response) => {
    return res.status(201).json(res.locals.logout)
  }
);

export default router;

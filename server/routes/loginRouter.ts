/**
 * @module Login Router
 * @description Routes all requests to login endpoint
 */

import { Request, Response, Router } from 'express';
import userController from '../controllers/userController';

const router = Router();

router.post('/', userController.verifyUser, (req: Request, res: Response) => {
  if (res.locals.error) return res.status(201).json(res.locals);
  return res.status(201).json(res.locals.user);
});

export default router;

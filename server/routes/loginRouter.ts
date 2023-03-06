/**
 * @module Login Router
 * @description Routes all requests to login endpoint
 */
import { Request, Response, Router } from 'express';
import userController from '../controllers/userController';

const router = Router();

router.post('/', userController.verifyUser, (req: Request, res: Response) => {
  if (res.locals.token) {
    res.cookie('admin', res.locals.token, { httpOnly: true });
    return res.status(201).json(res.locals.verifiedUser);
  }
  return res.status(201).json(res.locals.verifiedUser);
});

export default router;

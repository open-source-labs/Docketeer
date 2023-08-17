/**
 * @module | Signup router
 * @description | Routes all requests to signup endpoint
 **/

import { Router, Request, Response } from 'express';
import userController from '../controllers/userController';


const router = Router();

router.get(
  '/',
  userController.getAllUsers,
  (req: Request, res: Response): Response => {
    return res.status(200).json(res.locals.users);
  }
);

// Hashes password and inserts user to db
router.post(
  '/',
  userController.createUser,
  (req: Request, res: Response): Response => {
    return res.status(201).json('successfully added new user to database');
  }
);

export default router;

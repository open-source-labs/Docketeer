/**
 * @module API Router
 * @description Routes all requests to APIs
 */
// TODO does not seem to send an email
import { Router, Request, Response } from 'express';
import apiController from '../controllers/apiController';

const router = Router();

// Sends email notification to user/Sends fetch request from frontend when event emitter finds container issue
router.post(
  '/',
  // TODO
  // ? may need depending on what info is sent over in request body
  // userController.getOneUser,
  apiController.sendEmailAlert,
  (req: Request, res: Response) => {
    return res.status(201).json('alert email sent to user');
  }
);

export default router;

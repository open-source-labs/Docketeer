/**
 * @module settingsRouter Router
 * @description Performs all of the settings functionality for adding/removing containers and notifications.
 */
import { Router, Request, Response } from 'express';
import settingsController from '../controllers/settingsController';

const router = Router();

router.post(
  '/phone',
  settingsController.addPhoneNumber,
  (req: Request, res: Response) => {
    return res.status(201).json({});
  }
);

export default router;

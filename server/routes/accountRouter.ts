/**
 * @module AccountRouter
 * @description Routes all requests to change user information
 */
import { Router, Request, Response } from 'express';
import configController from '../controllers/configController';
import userController from '../controllers/userController';
import bcryptController from '../controllers/bcryptController';
import { useControlled } from '@mui/material';

const router = Router();

// Route handler: updates user's contact preference
router.post(
  '/contact',
  configController.updateContactPref,
  (req: Request, res: Response) => {
    return res.status(201).json(res.locals.user);
  },
);

router.post(
  '/password',
  userController.verifyUser,
  bcryptController.hashNewPassword,
  userController.updatePassword,
  (req: Request, res: Response) => {
    if (res.locals.error) return res.status(200).json(res.locals);
    return res.status(201).json('Successfully updated your password.');
  },
);

router.post(
  '/phone',
  userController.updatePhone,
  (req: Request, res: Response) => {
    return res.status(201).json(res.locals.user);
  },
);

router.post(
  '/email',
  userController.updateEmail,
  (req: Request, res: Response) => {
    return res.status(201).json(res.locals.user);
  },
);

router.post(
  '/cpu',
  configController.updateCPUThreshold,
  (req: Request, res: Response) => {
    return res.status(201).json(res.locals.user);
  },
);

// Route handler: updates user's memory threshold
router.post(
  '/memory',
  configController.updateMemThreshold,
  (req: Request, res: Response) => {
    return res.status(201).json(res.locals.user);
  },
);

// Route handler: updates user's preference to receive notifications for container stops
router.post(
  '/stops',
  configController.updateStopPref,
  (req: Request, res: Response) => {
    return res.status(201).json(res.locals.user);
  },
);

export default router;

/**
 * @module settingsRouter Router
 * @description Performs all of the settings functionality for adding/removing containers and notifications.
 */
import { Router, Request, Response } from 'express';
import settingsController from '../controllers/settingsController';

const router = Router();

router.get(
  '/',
  settingsController.notificationSettings,
  (req: Request, res: Response) => {
    return res.status(200).json(res.locals);
  },
);

// insert container and settings
router.post(
  '/insert',
  settingsController.addContainer,
  settingsController.addContainerSettings,
  (req: Request, res: Response) => {
    return res.status(201).json(res.locals);
  },
);

router.post(
  '/delete',
  settingsController.deleteContainerSettings,
  (req: Request, res: Response) => {
    return res.status(201).json({});
  },
);

router.post(
  '/phone',
  settingsController.addPhoneNumber,
  (req: Request, res: Response) => {
    return res.status(201).json({});
  },
);

router.post(
  '/notification',
  settingsController.notificationFrequency,
  (req: Request, res: Response) => {
    return res.status(201).json({});
  },
);

router.post(
  '/monitoring',
  settingsController.monitoringFrequency,
  (req: Request, res: Response) => {
    return res.status(201).json({});
  },
);

router.post(
  '/gitLinks',
  settingsController.addGitLinks,
  (req: Request, res: Response) => {
    return res.status(201).json({});
  },
);

export default router;

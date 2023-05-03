/**
 * @module initRouter Router
 * @description Initializes the Docketeer local database
 */

import { Router, Request, Response } from 'express';
import initController from '../controllers/initController';

const router = Router();

// ==========================================================
// Route: /github
// Purpose: Grabs url of specified container
// ==========================================================
router.post(
  '/github',
  initController.gitUrl,
  (req: Request, res: Response): Response => {
    return res.status(201).json(res.locals.url);
  }
);

// ==========================================================
// Route: /addMetrics
// Purpose: adds metrics to our metrics table of each individual container
// ==========================================================
router.post(
  '/addMetrics',
  initController.addMetrics,
  (req: Request, res: Response): Response => {
    return res.status(201).json({});
  }
);

// ==========================================================
// Route: /getMetrics
// Purpose: retrieves metrics from our metrics table of each individual container
// ==========================================================
router.post(
  '/getMetrics',
  initController.getMetrics,
  (req: Request, res: Response): Response => {
    return res.status(201).json(res.locals.metrics);
  }
);

export default router;

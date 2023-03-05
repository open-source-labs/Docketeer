/**
 * @module initRouter Router
 * @description Initializes the Docketeer local database
 */
import { Router, Request, Response } from 'express';
import initController from '../controllers/initController';

const router = Router();

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

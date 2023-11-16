import { Router, Request, Response, NextFunction } from 'express';
const router = Router();
import db from '../../db/model'
import { MetricsDB } from '../../../types';
import saveMetricsController from '../../controllers/docker/saveMetricsController';

/**
 * @abstract
 * @todo
 * @param
 * @returns
 */

// creating the metrics in postgresql
router.post('/', saveMetricsController.createMetrics, (req: Request, res: Response) => {
  return res.sendStatus(200)
});

// getting date from backend
router.get('/date', saveMetricsController.getDate, (req: Request, res: Response) => {
  return res.status(200).json(res.locals.datesrows);
});

export default router;

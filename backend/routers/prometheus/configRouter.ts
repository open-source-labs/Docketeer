import { Router, Request, Response, NextFunction } from 'express';
import configController from '../../controllers/prometheus/configController';
const router = Router();

/**
 * @abstract
 * @todo
 * @param
 * @returns
 */
router.get('/', configController.getDataSources, (req: Request, res: Response) => {
  return res.status(200).json(res.locals.datasources);
});

export default router;
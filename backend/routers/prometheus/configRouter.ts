import { Router, Request, Response, NextFunction } from 'express';
import configController from '../../controllers/prometheus/configController';
import { EndpointType, PromDataSource } from '../../../types';
const router = Router();

/**
 * @abstract
 * @todo
 * @param
 * @returns {PromDataSource[]}
 */
router.get('/', configController.getDataSources, (req: Request, res: Response) => {
  return res.status(200).json(res.locals.datasources);
});

/**
 * @abstract
 * @returns {EndpointType[]}
 */
router.get('/types', configController.getTypeOptions, (req: Request, res: Response) => {
  return res.status(200).json(res.locals.types);
})

/**
 * @abstract
 * @returns {string}
 */
router.post('/', configController.createDataSource, (req: Request, res: Response) => {
  return res.status(201).json(res.locals.id);
})

export default router;
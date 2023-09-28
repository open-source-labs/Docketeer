import { Router, Request, Response, NextFunction } from 'express';
import containerController from '../../controllers/dockerControllers/containersController';
const router = Router();

/**
 * @abstract 
 * @todo 
 * @param 
 * @returns
 */
router.get('/running', containerController.getContainers, (req, res) => {
  return res.status(200).json(res.locals.containers);
});

/**
 * @abstract 
 * @todo 
 * @param 
 * @returns
 */
router.get('/stopped');

/**
 * @abstract 
 * @todo 
 * @param 
 * @returns
 */
router.get('/:id/inspect');

/**
 * @abstract 
 * @todo 
 * @param 
 * @returns
 */
router.post('/start');

/**
 * @abstract 
 * @todo 
 * @param 
 * @returns
 */
router.post('/stop');

/**
 * @abstract 
 * @todo 
 * @param 
 * @returns
 */
router.delete('/:id');

export default router;
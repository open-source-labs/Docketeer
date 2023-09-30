import { Router, Request, Response, NextFunction } from 'express';
import networkController from '../../controllers/docker/networksController';
const router = Router();

/**
 * @abstract
 * @todo
 * @param
 * @returns
 */
router.get('/', networkController.getNetworks, (req, res) => {
  return res.status(200).json(res.locals.containers);
});

/**
 * 
 */
router.get('/container', networkController.getContainersOnNetwork, (req, res) => {
  return res.status(200).json(res.locals.containers);
})
/**
 * @abstract network prune
 * @todo
 * @param
 * @returns
 */
router.delete('/prune', networkController.prune, (req, res) => {
  return res.sendStatus(204);
});

/**
 * @abstract 
 * @todo 
 * @param 
 * @returns
 */
router.post('/');

/**
 * @abstract 
 * @todo 
 * @param 
 * @returns
 */
router.delete('/:id');

/**
 * @abstract 
 * @todo 
 * @param 
 * @returns
 */
router.post('/container');

/**
 * @abstract 
 * @todo 
 * @param 
 * @returns
 */
router.delete('/:id/container/:containerId');

export default router;
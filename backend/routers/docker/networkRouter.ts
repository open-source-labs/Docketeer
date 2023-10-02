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
  return res.status(200).json(res.locals.networks);
});

/**
 * 
 */
router.get('/container', networkController.getNetworks, networkController.getContainersOnNetwork, (req, res) => {
  return res.status(200).json(res.locals.networksAndContainers);
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
router.post('/', networkController.createNetwork, (req, res)=>{
  return res.sendStatus(201);
});

/**
 * @abstract 
 * @todo 
 * @param 
 * @returns
 */
router.delete('/:id', networkController.removeNetwork, (req, res) => {
  return res.sendStatus(204);
});

/**
 * @abstract 
 * @todo 
 * @param 
 * @returns
 */
router.post('/container', networkController.connectContainerToNetwork, (req, res) => {
  return res.sendStatus(201);
});

/**
 * @abstract 
 * @todo 
 * @param 
 * @returns
 */
router.delete('/:id/container/:containerId', networkController.disconnectContainerFromNetwork, (req, res) => {
  return res.sendStatus(204);
});

export default router;
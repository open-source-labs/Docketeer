import { Router, Request, Response, NextFunction } from 'express';
import volumeController from '../../controllers/docker/volumesController';
const router = Router();

/**
 * @abstract
 * @todo
 * @param
 * @returns
 */
router.get('/', volumeController.getVolumes, (req, res) => {
  return res.status(200).json(res.locals.volumes);
});

/**
 * @abstract
 * @todo
 * @param
 * @returns
 */
router.get('/:id/containers', volumeController.getContainersOnVolume, (req, res) => {
  return res.status(200).json(res.locals.containers);
});

/**
 * @abstract 
 * @todo 
 * @param 
 * @returns
 */
router.post('/remove');


router.delete('/:id', volumeController.removeVolume, (req, res) => {
  return res.sendStatus(204);
})

export default router;
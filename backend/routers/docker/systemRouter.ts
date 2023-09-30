import { Router, Request, Response, NextFunction } from 'express';
import systemController from '../../controllers/docker/systemController';
const router = Router();

/**
 * @abstract
 * @todo
 * @param
 * @returns
 */
router.delete('/prune', systemController.prune, (req, res) => {
  return res.sendStatus(204);
});

export default router;
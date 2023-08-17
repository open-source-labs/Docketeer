/**
 * @module Setup Router
 * @description Routes all requests to set up cluster
 */
import { Router, Request, Response } from 'express';
import setupController from '../controllers/setupController';

const router = Router();

router.get('/promInstall', setupController.promInstall,
  (req: Request, res: Response): Response => {
    return res.sendStatus(200);
  });

router.get('/applyGraf', setupController.applyGraf,
  (req: Request, res: Response): Response => {
    return res.sendStatus(200);
  });

router.get('/portForward', setupController.portForward,
  (req: Request, res: Response): Response => {
    return res.sendStatus(200);
  });


export default router;
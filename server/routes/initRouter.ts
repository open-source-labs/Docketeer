/**
 * @module initRouter Router
 * @description Initializes the Docketeer local database
 */
import { Router, Request, Response } from 'express';
import initController from '../controllers/initController';

const router = Router();

router.post('/github', initController.gitUrl, (req: Request, res: Response) => {
  return res.status(201).json(res.locals.url);
});

router.post(
  '/addMetrics',
  initController.addMetrics,
  (req: Request, res: Response) => {
    return res.status(201).json({});
  },
);

router.post(
  '/getMetrics',
  initController.getMetrics,
  (req: Request, res: Response) => {
    return res.status(201).json(res.locals.metrics);
  },
);

export default router;

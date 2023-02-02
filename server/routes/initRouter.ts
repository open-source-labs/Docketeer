/**
 * @module initRouter Router
 * @description Initializes the Docketeer local database
 */
import { Router, type Request, type Response } from 'express';
import initController from '../controllers/initController';

const router = Router();

// Route handler: initializes the metrics database
router.get('/', initController.initDatabase, (req: Request, res: Response) => {
  return res.status(200).json(res.locals);
});

router.post('/timezone', initController.timeZone, (req: Request, res: Response) => {
  return res.sendStatus(201);
});

router.post('/github', initController.gitUrl, (req: Request, res: Response) => {
  return res.status(201).json(res.locals.url);
});

router.post('/addMetrics', initController.addMetrics, (req: Request, res: Response) => {
  return res.status(201).json({});
});

router.post('/getMetrics', initController.getMetrics, (req: Request, res: Response) => {
  return res.status(201).json(res.locals.metrics);
});

export default router;

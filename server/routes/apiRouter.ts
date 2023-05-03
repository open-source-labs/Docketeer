/**
 * @module API Router
 * @description Routes all requests to APIs
 */
import { Router, Request, Response } from 'express';
import grafanaApiController from '../controllers/grafanaApiController';

const router = Router();

router.get(
  '/key',
  grafanaApiController.getApi,
  (req: Request, res: Response): Response => {
    return res.status(200).json(res.locals.key);
  }
);

router.post(
  '/uidkey',
  grafanaApiController.getUid,
  (req: Request, res: Response): Response => {
    
    return res.status(200).json(res.locals.uid);
  }
);

// for testing
router.get('/test', (req: Request, res: Response) => {
  res.setHeader('Cache-Control', 'no-cache');
  return res.status(200).json({ data: 'this tests for false positives' });
});

export default router;

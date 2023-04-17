/**
 * @module API Router
 * @description Routes all requests to APIs
 */
import { Router, Request, Response } from 'express';
import apiController from '../controllers/apiController';
import grafanaApiController from '../controllers/grafanaApiController';

const router = Router();

// Sends email notification to user/Sends fetch request from frontend when event emitter finds container issue
router.post(
  '/',
  // from v10: may need depending on what info is sent over in request body
  // userController.getOneUser,
  apiController.sendEmailAlert,
  (req: Request, res: Response): Response => {
    return res.status(201).json('alert email sent to user');
  }
);
///
router.get(
  '/key',
  grafanaApiController.getApi,
  (req: Request, res: Response): any => {
    console.log('RETURNED NEXT');
    return res.status(200).json(res.locals.key);
  }
);
///
router.post(
  '/uidkey',
  grafanaApiController.getUid,
  (req: Request, res: Response): any => {
    return res.status(200).json(res.locals.uid);
  }
);

router.get('/testing', apiController.testing, (req: Request, res: Response) => {
  res.status(200).json(res.locals.testingData);
});

router.get('/hello', (req: Request, res: Response) => {
  console.log('hey bitch');
  res.setHeader('Cache-Control', 'no-cache');
  return res.status(200).json({ data: 'in hello testing' });
});

export default router;

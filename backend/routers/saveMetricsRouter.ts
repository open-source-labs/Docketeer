import { Router, Request, Response, NextFunction } from 'express';
const router = Router();

/**
 * @abstract
 * @todo
 * @param
 * @returns
 */
router.post(
  '/',
  async (req: Request, res: Response) => {
    const body = await req.body
    console.log('in the backend, req.body', body)
    return res.status(200).json({'req': body});
  }
);

export default router;

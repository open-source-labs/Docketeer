import { Router, Request, Response, NextFunction } from 'express';
const router = Router();
import db from '../db/model'

/**
 * @abstract
 * @todo
 * @param
 * @returns
 */
router.post(
  '/',
  async (req: Request, res: Response) => {
    const {date, metricsResult} = await req.body
    
    console.log('in the backend, req.body', date)
    const inputs = [date, metricsResult]
    const queryStr = 'INSERT INTO snapshots ( metric_date, metric_result) VALUES($1,$2)';
    db.query(queryStr, inputs)
    return res.status(200).json({'req': req.body});
  }
);

export default router;

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
    const inputs = [date, metricsResult]
    const queryStr = 'INSERT INTO snapshots ( metric_date, metric_result) VALUES($1,$2)';
    db.query(queryStr, inputs)

    return res.status(200).json({'req': req.body});
  }
);

router.get('/date', async (req: Request, res: Response) => {
  const queryStr = 'SELECT metric_date FROM snapshots';
  const dates = await db.query(queryStr);
  console.log('sending back query, here are the dates', dates.rows)
  return res.status(200).json(dates.rows);
});

export default router;

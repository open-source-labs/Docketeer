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
    console.log('in the post request')
    console.log(req.body)
    
    const { date, diskSpace, memory, swap, CPU_usage, available_Memory } = await req.body;
    const inputs = [
      date,
      diskSpace,
      memory,
      swap,
      CPU_usage,
      available_Memory,
    ];
    const queryStr = 'INSERT INTO snapshots ( metric_date, diskSpace, memory, swap, CPU_usage, available_memory) VALUES($1,$2,$3,$4,$5,$6)';
    db.query(queryStr, inputs);

    return res.status(200).json({'req': 'hi'});
  }
);

router.get('/date', async (req: Request, res: Response) => {
  const queryStr = 'SELECT metric_date FROM snapshots';
  const dates = await db.query(queryStr);
  console.log('sending back query, here are the dates', dates.rows)
  return res.status(200).json(dates.rows);
});

export default router;

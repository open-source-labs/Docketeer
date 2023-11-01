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
  (req: Request, res: Response) => {
    console.log('in the post request')
    console.log(req.body)
    
    const { date, diskSpace, memory, swap, CPU_usage, available_Memory } = await req.body;
    const inputs = [
      date,
      diskSpace.result[0].value[1],
      memory.result[0].value[1],
      swap.result[0].value[1],
      CPU_usage.result[0].value[1],
      available_Memory.result[0].value[1],
    ];
    const queryStr = 'INSERT INTO snapshots ( metric_date, diskSpace, memory, swap, CPU_usage, available_memory) VALUES($1,$2,$3,$4,$5,$6)';
   db.query(queryStr, inputs);

    return res.status(200).json({});
  }
);

router.get('/date', async (req: Request, res: Response) => {
  const queryStr = 'SELECT metric_date FROM snapshots';
  const dates = await db.query(queryStr);
  return res.status(200).json(dates.rows);
});


router.get('/snapshot/:id', async (req: Request, res: Response) => {
  const { id } = req.params
  const queryStr = `SELECT metric_date, diskSpace, memory, swap, CPU_usage, available_memory FROM snapshots WHERE metric_date='${id}'`
  const result = await db.query(queryStr)
  return res.status(200).json(result.rows[0]);
})

export default router;

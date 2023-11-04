import { Router, Request, Response, NextFunction } from 'express';
const router = Router();
import db from '../../db/model'
import { MetricsDB } from '../../../types';

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
    
    const { date, diskSpace, memory, swap, CPU_usage, available_Memory } = req.body;
    const inputs:string[] = [
      date,
      diskSpace.result[0].value[1],
      memory.result[0].value[1],
      swap.result[0].value[1],
      CPU_usage.result[0].value[1],
      available_Memory.result[0].value[1],
    ];
    const queryStr: string  = 'INSERT INTO snapshots ( metric_date, diskspace, memory, swap, cpu_usage, available_memory) VALUES($1,$2,$3,$4,$5,$6)';
   db.query(queryStr, inputs);

    return res.status(200).json({});
  }
);

router.get('/date', async (req: Request, res: Response) => {
  const queryStr:string = 'SELECT metric_date FROM snapshots';
  const dates = await db.query(queryStr);
  return res.status(200).json(dates.rows);
});


router.get('/snapshot/:id', async (req: Request, res: Response) => {
  const { id } = req.params
  const queryStr:string = `SELECT metric_date, diskspace, memory, swap, cpu_usage, available_memory FROM snapshots WHERE metric_date='${id}'`
  const result = await db.query(queryStr)
  
  const dateFormat:string = result.rows[0].metric_date;
  const diskSpaceFormat:string = `${Number(result.rows[0].diskspace * 100).toFixed(1)}%`
  const memoryFormat:string = `${Number(result.rows[0].memory * 100).toFixed(1)}%`
  const CPUFormat:string = `${Number(result.rows[0].cpu_usage).toFixed(1)}%`
  const swapFormat:string = `${Number(result.rows[0].swap * 100).toFixed(1)}%`
  const availableMemoryFormat:string = `${Number(result.rows[0].available_memory/1000000000).toFixed(2)}GB` 
  
  const metrics: MetricsDB = {
    'Date': dateFormat,
    'Disk Space': diskSpaceFormat,
    'Memory': memoryFormat,
    'Swap': swapFormat,
    'CPU Usage': CPUFormat,
    'Available Memory': availableMemoryFormat,
  }
  
  console.log(metrics)

  return res.status(200).json(metrics);
})

export default router;

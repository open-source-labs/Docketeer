import { Request, Response, NextFunction } from 'express';
import { ContainerPS, ImageType } from '../../../types';
import { execAsync } from '../helper';
import { ServerError } from '../../backend-types';
import db from '../../db/model'

interface MetricsController {
  /**
   * @method
   * @returns 
   */
  createMetrics: (req: Request, res: Response, next: NextFunction) => Promise<void>;

  /**
   * @method
   * @abstract Gets dates 
   * @returns {void}
   */
  getDate: (req: Request, res: Response, next: NextFunction) => Promise<void>;

}

const MetricsController: MetricsController = {} as MetricsController;

MetricsController.createMetrics = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
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
    return next();
  } catch (error) {
    const errObj: ServerError = {
      log: JSON.stringify({ 'MetricsController.createMetrics Error: ': error }),
      status: 500,
      message: { err: 'MetricsController.createMetric error' }
    }
    return next(errObj);
  }
}


MetricsController.getDate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const queryStr:string = 'SELECT metric_date FROM snapshots';
    const dates = await db.query(queryStr);
    res.locals.datesrow = dates.rows;
    return next();
  } catch (error) {
    const errObj: ServerError = {
      log: JSON.stringify({ 'MetricsController.getDate Error: ': error }),
      status: 500,
      message: { err: 'MetricsController.getDate error' }
    }
    return next(errObj);
  }
}

export default MetricsController;
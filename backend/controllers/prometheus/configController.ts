// Types
import { Request, Response, NextFunction } from 'express';
import { execAsync } from '../helper';
import { ServerError } from '../../backend-types';
import { PromDataSource } from '../../../types';
import pool from '../../db/model';

interface ConfigController {
  /**
   * @method
   * @abstract
   * @returns @param {PromDataSource[]} res.locals.datasources
   */
  getDataSources: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}

const configController: ConfigController = {} as ConfigController;

configController.getDataSources = async (req: Request, res: Response, next: NextFunction): Promise<void> =>  {
  try {
    const text = `
    SELECT * 
    FROM datasource;`;
    const result = await pool.query(text, []);
    const data: PromDataSource[] = result.rows;
    res.locals.datasources = data;
    return next();
  } catch (error) {
    const errObj: ServerError = {
      log: JSON.stringify({ 'configController.getDataSources Error: ': error }),
      status: 500,
      message: { err: 'configController.getDataSources error' }
    };
    return next(errObj);
  }
}

export default configController;
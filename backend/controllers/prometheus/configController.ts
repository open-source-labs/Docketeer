// Types
import { Request, Response, NextFunction } from 'express';
import { execAsync } from '../helper';
import { ServerError } from '../../backend-types';
import { EndpointType, PromDataSource } from '../../../types';
import pool from '../../db/model';

interface ConfigController {
  /**
   * @method
   * @abstract
   * @returns @param {PromDataSource[]} res.locals.datasources
   */
  getDataSources: (req: Request, res: Response, next: NextFunction) => Promise<void>;

  /**
   * @method
   * @returns @param {EndpointType[]} res.locals.types
   */
  getTypeOptions: (req: Request, res: Response, next: NextFunction) => Promise<void>;
  /**
   * @method
   * @abstract
   * @param {PromDataSource} req.body
   * @returns @param {string} res.locals.id 
   */
  createDataSource: (req: Request, res: Response, next: NextFunction) => Promise<void>;

  /**
   * @method
   * @abstract
   * @param {PromDataSource} req.body
   * @returns {void}
   */
  updateDataSource: (req: Request, res: Response, next: NextFunction) => Promise<void>;

  /**
   * @method
   * @abstract
   * @param {string} req.params.id
   * @returns {void}
   */
  deleteDataSource: (req: Request, res: Response, next: NextFunction) => Promise<void>;
  
}

const configController: ConfigController = {} as ConfigController;

configController.getTypeOptions = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const text = `
    SELECT * 
    FROM endpoint_type;`;
    const results = await pool.query(text, []);
    const data: EndpointType[] = results.rows;
    res.locals.types = data;
    return next();

  } catch (error) {
    const errObj: ServerError = {
      log: JSON.stringify({ 'configController.getTypeOptions Error: ': error }),
      status: 500,
      message: { err: 'configController.getTypeOptions error' }
    };
    return next(errObj); 
  }
} 

configController.getDataSources = async (req: Request, res: Response, next: NextFunction): Promise<void> =>  {
  try {
    const text = `
    SELECT b.type_of, b.id AS "type_of_id", a.id, a.url, a.endpoint, a.match, a.jobname
    FROM datasource a
    LEFT JOIN endpoint_type b on a.type_of=b.id;`;
    
    const result = await pool.query(text, []);
    const data: PromDataSource[] = result.rows;
    console.log(data);
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

configController.createDataSource = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const text = `
    INSERT INTO datasource (type_of, url, endpoint, ssh_key, match, jobname)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING id;`;
    const { type_of_id, url, endpoint, ssh_key, match, jobname } = req.body;
    const values = [type_of_id, url, endpoint, ssh_key, match, jobname];
    const result = await pool.query(text, values);
    const data: { [key: string]: string } = await result.rows[0];
    res.locals.id = data.id;
    return next();
  } catch (error) {
    const errObj: ServerError = {
      log: JSON.stringify({ 'configController.createDataSource Error: ': error }),
      status: 500,
      message: { err: 'configController.createDataSource error' }
    };
    return next(errObj);
    
  }
}

configController.updateDataSource = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const text = `
    UPDATE datasource SET (type_of, url, endpoint, ssh_key, match, jobname)
    = ($1, $2, $3, $4, $5, $6)
    WHERE id=($7);`;
    const { type_of_id, url, endpoint, ssh_key, match, jobname, id } = req.body;
    const values = [type_of_id, url, endpoint, ssh_key, match, jobname, id];
    await pool.query(text, values);
    return next();
  } catch (error) {
    const errObj: ServerError = {
      log: JSON.stringify({ 'configController.updateDataSource Error: ': error }),
      status: 500,
      message: { err: 'configController.updateDataSource error' }
    };
    return next(errObj);

  }
}

configController.deleteDataSource = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const text = `
    DELETE FROM datasource
    WHERE id=($1);`;
    const { id } = req.params;
    await pool.query(text, [id]);
    return next();
  } catch (error) {
    const errObj: ServerError = {
      log: JSON.stringify({ 'configController.deleteDataSource Error: ': error }),
      status: 500,
      message: { err: 'configController.deleteDataSource error' }
    };
    return next(errObj);

  }
}
export default configController;
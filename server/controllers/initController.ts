import db from '../database/cloudModel';
import { Request, Response, NextFunction } from 'express';
import { InitController, ServerError } from '../../types';

/**
 * @description Contains middleware that creates and runs the local database
 */
const initController: InitController = {
  gitUrl: (req: Request, res: Response, next: NextFunction): void => {
    const parameter: string[] = [req.body.githubUrl];
    db.query('SELECT github_url FROM containers where name = $1', parameter)
      .then((data: string[]): void => {
        res.locals.url = data;
        return next();
      })
      .catch((err: ServerError): void => {
        console.log(err);
        if (err) return next(err);
      });
  },
  addMetrics: (req: Request, res: Response, next: NextFunction): void => {
    // Return an array of containers, to be used with .forEach method for grabbing ID, names, cpu, mem, memuse, net, block, pid.
    // Use these values with db.query to filter an array with SQL query string
    const containersArray: string[] = Object.keys(req.body.containers);
    const queryString =
      'INSERT INTO metrics (container_id, container_name, cpu_pct, memory_pct, memory_usage, net_io, block_io, pid) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)';
    containersArray.forEach((container: string): void => {
      const {
        ID,
        names,
        cpu,
        mem,
        memuse,
        net,
        block,
        pid,
      }: {
        ID: string;
        names: string;
        cpu: string;
        mem: string;
        memuse: string;
        net: string;
        block: string;
        pid: string;
      } = req.body.containersArray[container];
      const parameters: Array<string | number> = [
        ID,
        names,
        cpu,
        mem,
        memuse,
        net,
        block,
        pid,
      ];
      db.query(queryString, parameters).catch((err: ServerError) => {
        console.log(err);
        return next(err);
      });
    });
    return next();
  },
  getMetrics: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const timePeriod = req.body.time;
      const containerList = req.body.containers;
      let queryStringStart =
        'SELECT * FROM metrics WHERE (container_name = $1 ';
      const queryStringEnd =
        ') AND created_at >= now() - interval $2:raw ORDER BY created_at ASC';
      const params = [containerList[0], `${timePeriod} hour`];

      if (containerList.length > 1) {
        let count = 1;
        containerList.slice(1).forEach((container) => {
          queryStringStart += `OR container_name = $${count + 1} `;
          params.push(container);
          count++;
        });
        queryStringStart += queryStringEnd;
      } else {
        queryStringStart += queryStringEnd;
      }
      const { rows } = await db.query(queryStringStart, params);
      res.locals.metrics = rows;
      return next();
    } catch (error) {
      return next(error);
    }
  },
};
export default initController;

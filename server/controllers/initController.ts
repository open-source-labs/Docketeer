/**
 * @module | initController.ts
 * @description | Contains middleware that creates and runs the local database
 **/

import db from '../database/cloudModel';
import { Request, Response, NextFunction } from 'express';
import { InitController, ServerError, MetricsQuery } from '../../types';
// TODO never used: import path from 'path';

const initController: InitController = {
  // TODO any; body prop is misleading; should be name; rename parameter?

  // ==========================================================
  // Middleware: gitUrl
  // Purpose: grabs githubUrl of container given in body, and stores data under res.locals.url (gitUrl registry)
  // ==========================================================
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

  // ==========================================================
  // Middleware: addMetrics
  // Purpose: inserts the metrics pulled from individual running containers and stopped containers from Docker into the Database
  // change containers variable to containersArray
  // ==========================================================

  addMetrics: (req: Request, res: Response, next: NextFunction): void => {
    // TODO naming seems misleading; containersArr; should ID be caps(not so consequential)

    // Return an array of containers, to be used with .forEach method for grabbing ID, names, cpu, mem, memuse, net, block, pid.
    // Use these values with db.query to filter an array with SQL query string

    const containers: string[] = Object.keys(req.body.containers);
    const queryString =
      'INSERT INTO metrics (container_id, container_name, cpu_pct, memory_pct, memory_usage, net_io, block_io, pid) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)';
    containers.forEach((container: string): void => {
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
      } = req.body.containers[container];
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
      db.query(queryString, parameters)
        // TODO .then(() => {})
        .catch((err: ServerError) => {
          console.log(err);
          if (err) return next(err);
        });
    });
    return next();
  },

  // ==========================================================
  // Middleware: getMetrics
  // Purpose: Get metrics from metrics table
  // ==========================================================

  getMetrics: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const timePeriod: string = req.body.time;
    // TODO can this be const?
    let queryString = 'SELECT * FROM metrics WHERE (container_name = $1 ';
    // leave queryString open to being added to, so we exclude its last parenthesis

    type ContainerList = string[];
    const queryStringEnd = `AND created_at >= now() - interval '${timePeriod} hour' ORDER BY "created_at" ASC`;
    const containerList: ContainerList = req.body.containers;
    // TODO can this be const?
    let count = 1;

    // TODO they show the ability to display a single box, but is it utilized
    // if only one checkbox is clicked, this will run
    if (containerList.length === 1) {
      queryString += ')' + queryStringEnd;
      // TODO added MetricsQuery type alias but doesn't seem correct
      await db.query(queryString, containerList).then((data: { rows: MetricsQuery[] }): void => {
        res.locals.metrics = data;
        return next();
      });
    }

    // if there are more than one containers selected, this will activate
    // TODO: elements are never read, basically a for loop for iterating the mength of container list sliced, also ln 118-119 not efficient code
    else {
      containerList.slice(1).forEach(() => {
        let additionalParameter = `OR container_name = $${count + 1} `;
        count++;
        if (count >= containerList.length) additionalParameter += ')';
        queryString += additionalParameter;
      });
      queryString += queryStringEnd;
      await db.query(queryString, containerList).then((data: { rows: MetricsQuery[] }) => {
        res.locals.metrics = data;
        return next();
      });
    }
  },
};

export default initController;

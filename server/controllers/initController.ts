/**
 * @module | initController.ts
 * @description | Contains middleware that creates and runs the local database
 **/

import db from "../database/cloudModel";
import { Request, Response, NextFunction } from "express";
import { InitController, ServerError } from "../../types";
import path from "path";

const initController: InitController = {
  // TODO any; body prop is misleading; should be name; rename parameter?

  // ==========================================================
  // Middleware: gitUrl
  // Purpose: grabs githubUrl of container given in body, and stores data under res.locals.url (gitUrl registry)
  // ==========================================================
  gitUrl: (req: Request, res: Response, next: NextFunction) => {
    const parameter = [req.body.githubUrl];
    db.query("SELECT github_url FROM containers where name = $1", parameter)
      .then((data: any) => {
        res.locals.url = data;
        return next();
      })
      .catch((err: ServerError) => {
        console.log(err);
        if (err) return next(err);
      });
  },

  // ==========================================================
  // Middleware: addMetrics
  // Purpose: inserts the metrics pulled from individual running containers and stopped containers from Docker into the Database
  // change containers variable to containersArray
  // ==========================================================

  addMetrics: (req: Request, res: Response, next: NextFunction) => {
    // TODO naming seems misleading; containersArr; should ID be caps(not so consequential)

    // Return an array of containers, to be used with .forEach method for grabbing ID, names, cpu, mem, memuse, net, block, pid.
    // Use these values with db.query to filter an array with SQL query string

    const containers = Object.keys(req.body.containers);
    const queryString =
      "INSERT INTO metrics (container_id, container_name, cpu_pct, memory_pct, memory_usage, net_io, block_io, pid) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)";
    containers.forEach((container) => {
      const { ID, names, cpu, mem, memuse, net, block, pid } =
        req.body.containers[container];
      const parameters = [ID, names, cpu, mem, memuse, net, block, pid];
      db.query(queryString, parameters)
        .then(() => {})
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

  getMetrics: async (req: Request, res: Response, next: NextFunction) => {
    const timePeriod = req.body.time;
    let queryString = "SELECT * FROM metrics WHERE (container_name = $1 ";
    // leave queryString open to being added to, so we exclude its last parenthesis

    const queryStringEnd = `AND created_at >= now() - interval '${timePeriod} hour' ORDER BY "created_at" ASC`;
    const containerList = req.body.containers;
    let count = 1;
    // TODO they show the ability to display a single box, but is it utilized
    // if only one checkbox is clicked, this will run
    if (containerList.length === 1) {
      queryString += ")" + queryStringEnd;
      await db.query(queryString, containerList).then((data: any) => {
        res.locals.metrics = data;
        return next();
      });
    }
    // TODO any type

    // if there are more than one containers selected, this will activate
    else {
      containerList.slice(1).forEach((container: any) => {
        let additionalParameter = `OR container_name = $${count + 1} `;
        count++;
        if (count >= containerList.length) additionalParameter += ")";
        queryString += additionalParameter;
      });
      queryString += queryStringEnd;
      await db.query(queryString, containerList).then((data: any) => {
        res.locals.metrics = data;
        return next();
      });
    }
  },
};

export default initController;

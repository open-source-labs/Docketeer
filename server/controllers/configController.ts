// !
// !
// ! This controller is not currently implement, is used to set thersholds/preferences
import db from '../database/cloudModel';
import { Request, Response, NextFunction } from 'express';
import { ConfigController, ServerError } from '../../types';

/**
 * @description | Contains middleware that updates a user's contact preference, CPU threshold, memory threshold, and container stop preference in database
 **/
const configController: ConfigController = {
  // *** I don't believe any of these are currently in use ***

  // update configuration thresholds
  configureThresholds: (req: Request, res: Response, next: NextFunction) => {
    if (res.locals.error) return next();

    const { contact_pref, mem_threshold, cpu_threshold, container_stops, _id } =
      req.body;

    const inputThresholds =
      'UPDATE users SET contact_pref = $1, mem_threshold = $2, cpu_threshold = $3, container_stops = $4 WHERE _id = $5 RETURNING *;';

    const thresholdDetails = [
      contact_pref,
      mem_threshold,
      cpu_threshold,
      container_stops,
      _id,
    ];

    db.query(inputThresholds, thresholdDetails)
      .then((data: any) => {
        res.locals.user = data.rows[0];
        return next();
      })
      .catch((err: ServerError) => {
        return next({
          log: `Error in userController newUser: ${err}`,
          message: {
            err: 'An error occured creating new user in database. See userController .newUser.',
          },
        });
      });
  },

  // configure contact preference
  updateContactPref: (
    req: Request,
    res: Response,
    next: NextFunction
  ): void => {
    if (res.locals.error) return next();

    const { contact_pref, _id } = req.body;

    const inputPref =
      'UPDATE users SET contact_pref = $1 WHERE _id = $2 RETURNING *;';
    const prefDetails = [contact_pref, _id];

    db.query(inputPref, prefDetails)
      .then((data: any) => {
        res.locals.user = data.rows[0];
        return next();
      })
      .catch((err: ServerError) => {
        return next({
          log: `Error in configController updateContactPref: ${err}`,
          message: {
            err: 'An error occured updating contact preferences in database. See configController .updateContactPref.',
          },
        });
      });
  },

  // configure CPU threshold
  updateCPUThreshold: (req: Request, res: Response, next: NextFunction) => {
    if (res.locals.error) return next();

    const { cpu_threshold, _id } = req.body;

    const inputCPU =
      'UPDATE users SET cpu_threshold = $1 WHERE _id = $2 RETURNING *;';
    const CPUDetails = [cpu_threshold, _id];

    db.query(inputCPU, CPUDetails)
      .then((data: any) => {
        res.locals.user = data.rows[0];
        return next();
      })
      .catch((err: ServerError) => {
        return next({
          log: `Error in configController updateCPUThreshold: ${err}`,
          message: {
            err: 'An error occured updating CPU threshold in database. See configController .updateCPUThreshold.',
          },
        });
      });
  },

  // configure memory threshold
  updateMemThreshold: (req: Request, res: Response, next: NextFunction) => {
    if (res.locals.error) return next();

    const { mem_threshold, _id } = req.body;

    const inputMem =
      'UPDATE users SET mem_threshold = $1 WHERE _id = $2 RETURNING *;';
    const memDetails = [mem_threshold, _id];

    db.query(inputMem, memDetails)
      .then((data: any) => {
        res.locals.user = data.rows[0];
        return next();
      })
      .catch((err: ServerError) => {
        return next({
          log: `Error in configController updateMemThreshold: ${err}`,
          message: {
            err: 'An error occured updating memory threshold in database. See configController .updateMemThreshold.',
          },
        });
      });
  },

  // configure preference to receive notification when a container stops running
  updateStopPref: (req: Request, res: Response, next: NextFunction) => {
    if (res.locals.error) return next();

    const { container_stops, _id } = req.body;

    const inputStopPref =
      'UPDATE users SET container_stops = $1 WHERE _id = $2 RETURNING *;';
    const stopPrefDetails = [container_stops, _id];

    db.query(inputStopPref, stopPrefDetails)
      .then((data: any) => {
        res.locals.user = data.rows[0];
        return next();
      })
      .catch((err: ServerError) => {
        return next({
          log: `Error in configController updateStopPref: ${err}`,
          message: {
            err: 'An error occured updating container stop preference in database. See configController .updateStopPref.',
          },
        });
      });
  },
};

export default configController;

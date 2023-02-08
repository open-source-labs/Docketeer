/**
 * @module settingsController
 * @description Contains middleware that creates/deletes container settings and deals with notifications
 */

import { Request, Response, NextFunction } from 'express';
import db from '../models/psqlQuery';
import { SettingsController, ServerError } from '../../types';

const settingsController: SettingsController = {
  addContainer: async (req: Request, res: Response, next: NextFunction) => {
    const queryString =
      'INSERT INTO containers(id, name) VALUES ($1, $2) ON CONFLICT (id) DO NOTHING';
    const parameters = [req.body.container, req.body.name];
    await db
      .query(queryString, parameters)
      .then((data: any) => {
        return next();
      })
      .catch((err: ServerError) => {
        return next(err);
      });
  },

  addContainerSettings: async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const queryString = `INSERT INTO container_settings (container_id, notification_settings_id)  
      SELECT $1, id 
      FROM notification_settings 
      WHERE metric_name = $2`;
    const parameters = [req.body.container, req.body.metric];
    await db
      .query(queryString, parameters)
      .then((data: any) => {
        return next();
      })
      .catch((err: ServerError) => {
        return next(err);
      });
  },

  deleteContainerSettings: async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const queryString = `DELETE FROM container_settings
      WHERE container_id = $1 and notification_settings_id = (SELECT id FROM notification_settings where metric_name = $2)`;
    const parameters = [req.body.container, req.body.metric];
    await db
      .query(queryString, parameters)
      .then((data: any) => {
        return next();
      })
      .catch((err: ServerError) => {
        return next(err);
      });
  },

  notificationSettings: async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const queryString = `SELECT cs.container_id, metric_name, triggering_value
      FROM container_settings cs
      INNER JOIN notification_settings ns ON cs.notification_settings_id = ns.id`;
    await db
      .query(queryString)
      .then((data: any) => {
        const tempMemory: any[] = [];
        const tempCPU: any[] = [];
        const tempStopped: any[] = [];
        data.rows.forEach((container: any, i: any) => {
          if (container.metric_name === 'memory') {
            tempMemory.push(container.container_id);
          } else if (container.metric_name === 'cpu') {
            tempCPU.push(container.container_id);
          } else if (container.metric_name === 'stopped') {
            tempStopped.push(container.container_id);
          }
        });
        res.locals.memory = tempMemory;
        res.locals.cpu = tempCPU;
        res.locals.stopped = tempStopped;
        return next();
      })
      .catch((err: ServerError) => {
        console.log('getNotificationSettings: ', err);
        return next(err);
      });
  },

  addPhoneNumber: async (req: Request, res: Response, next: NextFunction) => {
    const queryString = `INSERT INTO users (username, phone_number, notification_frequency, monitoring_frequency)
      VALUES ($1, $2, $3, $4)
      ON CONFLICT ON CONSTRAINT unique_username
      DO UPDATE SET phone_number = $2`;
    const parameters = [
      req.body.admin,
      req.body.number,
      req.body.digits[0],
      req.body.digits[1],
    ];
    await db
      .query(queryString, parameters)
      .then((data: any) => {
        return next();
      })
      .catch((err: ServerError) => {
        console.log('addPhoneNumber: ', err);
        return next(err);
      });
  },

  notificationFrequency: async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const queryString = `INSERT INTO users (username, phone_number, notification_frequency, monitoring_frequency)
      VALUES ($1, $2, $3, $4)
      ON CONFLICT ON CONSTRAINT unique_username
      DO UPDATE SET notification_frequency = $3`;
    const parameters = [
      req.body.user,
      req.body.phoneNumber,
      req.body.notification,
      req.body.monitoring,
    ];
    await db
      .query(queryString, parameters)
      .then((data: any) => {
        return next();
      })
      .catch((err: ServerError) => {
        console.log('notificationFrequency: ', err);
        return next(err);
      });
  },

  monitoringFrequency: async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const queryString = `INSERT INTO users (username, phone_number, notification_frequency, monitoring_frequency)
      VALUES ($1, $2, $3, $4)
      ON CONFLICT ON CONSTRAINT unique_username
      DO UPDATE SET monitoring_frequency = $4`;
    const parameters = [
      req.body.user,
      req.body.phoneNumber,
      req.body.notification,
      req.body.monitoring,
    ];
    await db
      .query(queryString, parameters)
      .then((data: any) => {
        return next();
      })
      .catch((err: ServerError) => {
        console.log('monitoringFrequency: ', err);
        return next(err);
      });
  },

  addGitLinks: async (req: Request, res: Response, next: NextFunction) => {
    const queryString = `INSERT INTO containers (id, name, github_url)
      VALUES ($1, $2, $3)
      ON CONFLICT ON CONSTRAINT unique_id
      DO UPDATE SET github_url = $3`;
    const parameters = [req.body.id, req.body.name, req.body.url];
    await db
      .query(queryString, parameters)
      .then((data: any) => {
        return next();
      })
      .catch((err: ServerError) => {
        console.log('addGitLinks: ', err);
        return next(err);
      });
  },
};

export default settingsController;

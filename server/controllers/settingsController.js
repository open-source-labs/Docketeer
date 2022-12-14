/**
 * @module settingsController
 * @description Contains middleware that creates/deletes container settings and deals with notifications
 */

const db = require('../models/psqlQuery');

const settingsController = {};

settingsController.addContainer = async (req, res, next) => {
  const queryString = `INSERT INTO containers(id, name) VALUES ($1, $2) ON CONFLICT (id) DO NOTHING`;
  const parameters = [req.body.container, req.body.name];
  await db
    .query2(queryString, parameters)
    .then((data) => {
      return next();
    })
    .catch((err) => {
      return next(err);
    });
};

settingsController.addContainerSettings = async (req, res, next) => {
  const queryString = `INSERT INTO container_settings (container_id, notification_settings_id)  
    SELECT $1, id 
    FROM notification_settings 
    WHERE metric_name = $2`;
  const parameters = [req.body.container, req.body.metric];
  await db
    .query2(queryString, parameters)
    .then((data) => {
      return next();
    })
    .catch((err) => {
      return next(err);
    });
};

settingsController.deleteContainerSettings = async (req, res, next) => {
  const queryString = `DELETE FROM container_settings
    WHERE container_id = $1 and notification_settings_id = (SELECT id FROM notification_settings where metric_name = $2)`;
  const parameters = [req.body.container, req.body.metric];
  await db
    .query2(queryString, parameters)
    .then((data) => {
      return next();
    })
    .catch((err) => {
      return next(err);
    });
};

settingsController.notificationSettings = async (req, res, next) => {
  const queryString = `SELECT cs.container_id, metric_name, triggering_value
    FROM container_settings cs
    INNER JOIN notification_settings ns ON cs.notification_settings_id = ns.id`;
  await db
    .query2(queryString)
    .then((data) => {
      const tempMemory = [];
      const tempCPU = [];
      const tempStopped = [];
      data.rows.forEach((container, i) => {
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
    .catch((err) => {
      console.log('getNotificationSettings: ', err);
      return next(err);
    });
};

settingsController.addPhoneNumber = async (req, res, next) => {
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
    .query2(queryString, parameters)
    .then((data) => {
      return next();
    })
    .catch((err) => {
      console.log('addPhoneNumber: ', err);
      return next(err);
    });
};

settingsController.notificationFrequency = async (req, res, next) => {
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
    .query2(queryString, parameters)
    .then((data) => {
      return next();
    })
    .catch((err) => {
      console.log('notificationFrequency: ', err);
      return next(err);
    });
};

settingsController.monitoringFrequency = async (req, res, next) => {
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
    .query2(queryString, parameters)
    .then((data) => {
      return next();
    })
    .catch((err) => {
      console.log('monitoringFrequency: ', err);
      return next(err);
    });
};

settingsController.addGitLinks = async (req, res, next) => {
  const queryString = `INSERT INTO containers (id, name, github_url)
    VALUES ($1, $2, $3)
    ON CONFLICT ON CONSTRAINT unique_id
    DO UPDATE SET github_url = $3`;
  const parameters = [req.body.id, req.body.name, req.body.url];
  await db
    .query2(queryString, parameters)
    .then((data) => {
      return next();
    })
    .catch((err) => {
      console.log('addGitLinks: ', err);
      return next(err);
    });
};

module.exports = settingsController;

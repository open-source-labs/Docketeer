/**
 * @module settingsController
 * @description Contains middleware that creates/deletes container settings and deals with notifications
 */

const db = require('../models/psqlQuery');
// const path = require('path')
// const { exec } = require('child_process')


const settingsController = {};

settingsController.addContainer = async (req, res, next) => {
  const queryString = `INSERT INTO containers(id, name) VALUES ($1, $2) ON CONFLICT (id) DO NOTHING`;
  const parameters = [req.body.container, req.body.name];
  await db.query2(queryString, parameters)
    .then((data) => {
      console.log('addContainer: ', data);
      return next();
    })
    .catch((err) => {
      console.log('addContainer: ', err);
      return next(err);
    });
};

settingsController.addContainerSettings = async (req, res, next) => {
  const queryString = `INSERT INTO container_settings (container_id, notification_settings_id)  
    SELECT $1, id 
    FROM notification_settings 
    WHERE metric_name = $2`;
  const parameters = [req.body.container, req.body.metric];
  await db.query2(queryString, parameters)
    .then((data) => {
    console.log('addContainerSettings: ', data);
    return next();
  })
  .catch((err) => {
    console.log('addContainerSettings: ', err);
    return next(err);
  })
};

settingsController.deleteContainerSettings = async (req, res, next) => {
  const queryString = `DELETE FROM container_settings
    WHERE container_id = $1 and notification_settings_id = (SELECT id FROM notification_settings where metric_name = $2)`;
  const parameters = [req.body.container, req.body.metric];
  await db.query2(queryString, parameters)
    .then((data) => {
      console.log('deleteContainersettings: ', data);
      return next();
  })
    .catch((err) => {
      console.log('deleteContainerSettings: ', err)
      return next(err);
  })
};

settingsController.notificationSettings = async (req, res, next) => {
  const queryString = `SELECT cs.container_id, metric_name, triggering_value
    FROM container_settings cs
    INNER JOIN notification_settings ns ON cs.notification_settings_id = ns.id`;
  await db.query2(queryString)
    .then((data) => {
      console.log(data)
      return next();
  })
    .catch((err) => {
      console.log('getNotificationSettings: ', err);
      return next(err);
    })
}


// initController.timeZone = (req, res, next) => {
//   const parameter = [req.body.timezone.toString()]
//   console.log(parameter)
//   //!Abigail... why can't I do the $1 thing? Does it only work if you have more than one?
//   db.query2(`set time zone 7`)
//     .then((data) => {
//       return next();
//     })
//     .catch((err) => {
//       console.log(err)
//       if (err) return next(err);
//     });
// };


// //This query gets invoked on line 420 of LineChartDisplay but unsure of when it runs.
//   //Can't get it to console log and need to figure out what it needs to return. At first glance, looks like just the query response
// initController.gitURL = (req, res, next) => {
//   console.log('req.body: ', req.body)
//   const parameter = [(req.body.githubUrl)]
//   console.log('parameter: ', parameter)
//   //there is currently nothing in the table....so need to populate it first to see if queries work
//   db.query2(`SELECT * FROM containers`)
//   .then((data) => {
//     console.log(`container table data: `, data)
//     res.locals.data = data;
//     return next();
//   })
//   //pretty sure I need to use the $1 and parameters array, but can't find out how to invoke this yet
//   // db.query2(`SELECT github_url FROM containers where name = '${parameter}'`)
//   //   .then((data) => {
//   //     console.log(data)
//   //     return next();
//   //   })
//   //   .catch((err) => {
//   //     console.log(err)
//   //     if (err) return next(err);
//   //   });
// }


// //inserting the metrics pulled from the running containers and stopped containers from Docker into the Database
// initController.addMetrics = (req, res, next) => {
//   //body comes back with container names as the keys, each key is an object filled with the container data
//   const containers = Object.keys(req.body.containers);
//   //query string to insert the metric data into the table.
//   const queryString = `INSERT INTO metrics (container_id, container_name, cpu_pct, memory_pct, memory_usage, net_io, block_io, pid) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`
//   //need to run 1 query per objects on the req.body
//     //doens't need to be async because we don't return anyhting?
//   containers.forEach((container) => {
//     //object deconstructing for each of the containers to pass them in as parameters for the query
//     const { ID, names, cpu, mem, memuse, net, block, pid } = req.body.containers[container]
//     const parameters = [ ID, names, cpu, mem, memuse, net, block, pid ]
//     //querying the database with the string and parameters. Don't need to return anything
//     db.query2(queryString, parameters)
//     .then(() => {
//     })
//     .catch((err) => {
//       console.log(err)
//       if (err) return next(err);
//     });
//   })
//   return next();
// }

// initController.getMetrics = async (req, res, next) => {
//   let queryString = 'SELECT * FROM metrics WHERE (container_name = $1 ';
//   const queryStringEnd = `AND created_at >= now() - interval '4 hour' ORDER BY "created_at" ASC`
//   const containerList = req.body.containers
//   let count = 1;
//   //if only one checkbox is clicked, this will run
//   if (containerList.length === 1) {
//     queryString += ')' + queryStringEnd;
//     await db.query2(queryString, containerList)
//     .then((data) => {
//       res.locals.metrics = data;
//       return next();
//     })
//   }
//   //if there are more than one containers selected, this will activate
//   else { 
//     containerList.slice(1).forEach((container) => {
//       let additionalParameter = `OR container_name = $${count + 1} `;
//       count++;
//       if (count >= containerList.length) additionalParameter += ')';
//       queryString += additionalParameter;
//     });
//     queryString += queryStringEnd;
//     await db.query2(queryString, containerList)
//     .then((data) => {
//       res.locals.metrics = data;
//       return next();
//     })
//   }
// }

module.exports = settingsController;
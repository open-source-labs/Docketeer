/**
 * @module initDatabase Controller
 * @description Contains middleware that creates and runs the local database
 */

const db = require('../models/psqlQuery');
const path = require('path');
const { exec } = require('child_process');


const initController = {};

initController.initDatabase = (req, res, next) => {
  const directory =
    process.env.NODE_ENV === 'development'
      ? path.resolve(__dirname, '../database')
      : path.join(path.dirname(__dirname), 'database');

  exec(
    `cd ${directory} && docker compose up --no-recreate --wait -d`,
    (error, stdout, stderr) => {
      res.locals.error = error;
      res.locals.stderr = stderr;
      res.locals.stdout = stdout;
      return next();
    }
  );
};


initController.timeZone = (req, res, next) => {
  const parameter = [req.body.timezone.toString()];
  console.log(parameter);
  db.query2(`ALTER DATABASE postgres SET timezone TO ${parameter}`)
    .then((data) => {
      return next();
    })
    .catch((err) => {
      console.log(err);
      if (err) return next(err);
    });
};

initController.gitURL = (req, res, next) => {
  const parameter = [req.body.githubUrl];
  db.query2('SELECT github_url FROM containers where name = $1', parameter)
    .then((data) => {
      res.locals.url = data;
      return next();
    })
    .catch((err) => {
      console.log(err);
      if (err) return next(err);
    });
};

// inserting the metrics pulled from the running containers and stopped containers from Docker into the Database
initController.addMetrics = (req, res, next) => {
 
  const containers = Object.keys(req.body.containers);
  const queryString = 'INSERT INTO metrics (container_id, container_name, cpu_pct, memory_pct, memory_usage, net_io, block_io, pid) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)';
  containers.forEach((container) => {
    const { ID, names, cpu, mem, memuse, net, block, pid } = req.body.containers[container];
    const parameters = [ ID, names, cpu, mem, memuse, net, block, pid ];
    db.query2(queryString, parameters)
      .then(() => {
      })
      .catch((err) => {
        console.log(err);
        if (err) return next(err);
      });
  });
  return next();
};

initController.getMetrics = async (req, res, next) => {
  let queryString = 'SELECT * FROM metrics WHERE (container_name = $1 ';
  const queryStringEnd = 'AND created_at >= now() - interval \'4 hour\' ORDER BY "created_at" ASC';
  const containerList = req.body.containers;
  let count = 1;
  // if only one checkbox is clicked, this will run
  if (containerList.length === 1) {
    queryString += ')' + queryStringEnd;
    await db.query2(queryString, containerList)
      .then((data) => {
        res.locals.metrics = data;
        return next();
      });
  }
  // if there are more than one containers selected, this will activate
  else { 
    containerList.slice(1).forEach((container) => {
      let additionalParameter = `OR container_name = $${count + 1} `;
      count++;
      if (count >= containerList.length) additionalParameter += ')';
      queryString += additionalParameter;
    });
    queryString += queryStringEnd;
    await db.query2(queryString, containerList)
      .then((data) => {
        res.locals.metrics = data;
        return next();
      });
  }
};

module.exports = initController;
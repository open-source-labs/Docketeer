/**
 * @module initDatabase Controller
 * @description Contains middleware that creates and runs the local database
 */

const db = require('../models/psqlQuery');
const path = require('path')
const { exec } = require('child_process')


const initController = {};

initController.initDatabase = (req, res, next) => {
  const directory =
    process.env.NODE_ENV === 'development'
      ? path.resolve(__dirname, '../../src/database')
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
  const parameter = [req.body.timezone.toString()]
  console.log(parameter)
  //!Abigail... why can't I do the $1 thing? Does it only work if you have more than one?
  db.query2(`set time zone 7`)
    .then((data) => {
      console.log(data)
      return next();
    })
    .catch((err) => {
      console.log(err)
      if (err) return next(err);
    });
};

//This query gets invoked on line 420 of LineChartDisplay but unsure of when it runs.
  //Can't get it to console log 
initController.gitURL = (req, res, next) => {
  const parameter = req.body.gitURL
  console.log(parameter)
  db.query2(`Select github_url from containers where name = '${parameter}'`)
    .then((data) => {
      console.log(data)
      return next();
    })
    .catch((err) => {
      console.log(err)
      if (err) return next(err);
    });
}

module.exports = initController;
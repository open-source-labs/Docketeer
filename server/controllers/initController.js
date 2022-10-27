/**
 * @module initDatabase Controller
 * @description Contains middleware that creates and runs the local database
 */

//!! Need to import the new Model for the local DB??
const db = require('../models/cloudModel');
const bcrypt = require('bcryptjs');
const sysadmin = require('../../security/sysadmin');
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
      console.log('Error Message \n', error);
      console.log('STDOUT Message \n', stdout);
      console.log('STDERR Message \n', stderr);
      res.locals.error = error;
      res.locals.stderr = stderr;
      res.locals.stdout = stdout;
      return next();
    }
  );
};

module.exports = initController;
const express = require('express');
const path = require('path');
const cors = require('cors');
const colors = require('colors');

// Routers
// sign up for sysadmin to add new users to their account
const signupRouter = require('./routes/signupRouter');
// sign up for new sysadmin users
const signupSysAdminRouter = require('./routes/signupSysAdminRouter');
const loginRouter = require('./routes/loginRouter');
const adminRouter = require('./routes/adminRouter');
const accountRouter = require('./routes/accountRouter');
const apiRouter = require('./routes/apiRouter');
const dbRouter = require('./routes/dbRouter');
const initRouter = require('./routes/initRouter');
const logoutRouter = require('./routes/logoutRouter');
const settingsRouter = require('./routes/settingsRouter');

const app = express();

app.use(express.json()); // parses the request body
app.use(express.urlencoded({ extended: true })); // parses urlencoded payloads
app.use(cors()); // enables ALL cors requests

app.use('/test', (req, res) => {
  res.status(200).json({
    success: true
  });
});

app.use('/settings', settingsRouter);
app.use('/init', initRouter);
// sign up for sysadmin to add new users to their account
app.use('/signup', signupRouter);
// sign up for new sysadmin users
// app.use('/signupsysadmin', signupSysAdminRouter);
app.use('/login', loginRouter);
app.use('/admin', adminRouter);
app.use('/account', accountRouter);
app.use('/api', apiRouter);
app.use('/db', dbRouter);
app.use('/logout', logoutRouter);

// Unknown Endpoint Error Handler
app.use('/', (req, res) => {
  const url = new URL(`${req.protocol}://${req.get('host')}${req.originalUrl}`);
  console.log('1',url);
  // for development purposes, so we don't have to reopen electron everytime
  return res.status(404).redirect('/');
  // return res.status(404).json('404 Not Found')
});

// Global Error Handler
app.get('/', (req, res, next, err) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occured' }
  };
  const errorObj = Object.assign(defaultErr, err);
  return res.status(errorObj.status).json(errorObj.message);
});

module.exports = app;

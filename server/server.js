/**
 * ************************************
 *
 * @module Server
 * @author Brent Speight, Emma Czech, May Li, Ricardo Cortez
 * @date 08/02/2021
 * @description Server listens on port 3000 and routes all incoming requests, handles global middleware errors and unknown endpoint errors
 *
 * ************************************
 */

const express = require('express');
const path = require('path');
const cors = require('cors');
//const dotenv = require('dotenv');

// Import Routers
const signupRouter = require('./routes/signupRouter');
const loginRouter = require('./routes/loginRouter');
const adminRouter = require('./routes/adminRouter');
const accountRouter = require('./routes/accountRouter');
const apiRouter = require('./routes/apiRouter');
const dbRouter = require('./routes/dbRouter');
const logoutRouter = require('./routes/logoutRouter');

const app = express();
const PORT = 3000;

//dotenv.config();

app.use(express.json()); // parses the request body
app.use(express.urlencoded({ extended: true })); // parses urlencoded payloads
app.use(cors()); // enables ALL cors requests


// const AccessKey = process.env.ACCESS_KEY;
// const SecretKey = process.env.SECRET_KEY;

// app.get('/oauth', (req, res) => {
//   console.log('made it to oauth route');
//   console.log('AccessKey: ', AccessKey);
//   try {
//     const GitHubUrl = `${AccessKey}`;
//     res.redirect(GitHubUrl);
//     console.log('redirected');
//   }
//   catch (e) {
//     console.log('OAUTH ERR: ', e)
//   }
// })


app.use('/signup', signupRouter);
app.use('/login', loginRouter);
app.use('/admin', adminRouter);
app.use('/account', accountRouter);
app.use('/api', apiRouter);
app.use('/db', dbRouter);
app.use('/logout', logoutRouter);

// Unknown Endpoint Error Handler
app.use('/', (req, res) => {
  return res.status(404).json('404 Not Found');
});

// Global Error Handler
app.get('/', (req, res, next, err)=> {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occured' },
  };
  const errorObj = Object.assign(defaultErr, err);
  return res.status(errorObj.status).json(errorObj.message);
});

// Open up server on PORT
app.listen(PORT, ()=> {
  console.log(`server is listening on port ${PORT}`);
});

module.exports = app;
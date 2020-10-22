const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

// routers
const notificationsRouter = require('./routes/notifications.js'); //TO BE CHANGED

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// route handlers
app.use('/test', (req, res) =>{
    console.log('received test request')
    res.status(200).json('test request successfully completed')
});

app.post('/mobile', notificationsRouter.postMobile, (req, res) => {
    console.log("received POST mobile number request")
    res.status(200).json('verification code has been sent')
});

// add router for checking the verification code the user provides

app.post('/event', notificationsRouter.postEvent, (req, res) => {
    console.log("received POST triggering event request")
    res.status(200).json('Triggering event is successfully received')
});

// catch-all route handler
app.use('*', (req, res) => res.sendStatus(404));

// global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: `Express error handler caught unknown middleware error: ${err}`,
    status: 400,
    message: { err: `An error occured. ERROR: ${JSON.stringify(err)}` },
  };

  const errObj = Object.assign({}, defaultErr, err);

  console.log(errObj.log);

  return res.status(errObj.status).json(errObj.message);
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

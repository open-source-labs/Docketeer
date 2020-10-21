const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

// routers
// const notificationsRouter = require('./routes/notifications.js'); //TO BE CHANGED

// application-level middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// route handlers
// app.use('/notifications', businessesRouter);
app.use('/test', (req, res) =>{
    console.log('received test request')
    res.status(200).json('test request successfully completed')
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

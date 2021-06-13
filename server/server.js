const path = require('path');
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(express.json()); // parses the request body
app.use(express.urlencoded({ extended: true })); // parses urlencoded payloads
app.use(cors()); // this enables ALL cors requests

// Sample route handler to test out connection between Electron app and backend server hosted on Port 3000
app.post('/', (req, res) => {
  console.log('Request body: ', req.body);
  res.status(200).json('response sent to client');
})

// test route handler for logins... remove once we merge with Cat's end
app.post('/login', (req, res) => {
  if (req.body.username === 'codesmith' && req.body.password === 'narwhals'){
    return res.status(200).json(true);
  }
  else {
    return res.status(200).json(false);
  }
})
// Unknown Endpoint Error Handler
app.use('/', (req, res) => {
  res.status(404).json('404 Not Found');
})

// Global Error Handler
app.get('/', (req, res, next, err)=> {

  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occured' },
  };

  const errorObj = Object.assign(defaultErr, err);
  
  return res.status(errObj.status).json(errorObj.message);

})

// Open up server on PORT
app.listen(PORT, ()=> {
    console.log(`server is listening on port ${PORT}`)
});

module.exports = app;
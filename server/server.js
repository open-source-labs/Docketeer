<<<<<<< HEAD
const express = require('express');
<<<<<<< HEAD
// const path = require('path');
const cors = require('cors');
=======
const path = require('path');
const cors = require('cors');
=======
const app = require('./app');
>>>>>>> c4ce03b (Test seperating server file into app and server files)
const colors = require('colors');
>>>>>>> ceb41ea (@types/pg dependency)

const PORT = 3000;

// Open up server on PORT
app.listen(PORT, () => {
<<<<<<< HEAD
  console.log(`server is listening on port ${PORT}`);
=======
  console.log(`server is listening on port ${PORT}`.green.inverse);
>>>>>>> ceb41ea (@types/pg dependency)
});

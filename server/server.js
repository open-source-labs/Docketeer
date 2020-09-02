const express = require('express');
const path = require('path');
const app = express();
//const apiRoute = require()

app.use(express.json());
app.use(express.urlencoded());

// app.set('views', __dirname + '/client/views');
// app.use(express.static(__dirname + '/client/dist/static'));

app.get('/api', (req, res) => {
  res.json('this is the response');
});


//if(process.env.NODE_ENV === 'production') {
app.use('/build', express.static(path.join(__dirname, '../build')));

app.get('/', (req, res) => {
  return res.sendFile(path.join(__dirname, '../index.html'));
});
//}


app.listen(3000);

module.exports = app;
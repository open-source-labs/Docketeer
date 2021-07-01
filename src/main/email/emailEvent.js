const fetch = require('node-fetch');

const emailEvent = (args) => {
  console.log('INSIDE EMAIL EVENT');
  console.log('ARGS: ', args);
  fetch('http://localhost:3000/api', 
    { 
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(args)
    })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
};

export default emailEvent;
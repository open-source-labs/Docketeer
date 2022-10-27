const fetch = require('node-fetch');

const emailEvent = (args) => {
<<<<<<< HEAD
  fetch('http://localhost:3000/api', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(args)
  })
=======
  fetch('http://localhost:3000/api', 
    { 
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(args)
    })
>>>>>>> 276c4d7 (Revert "Updated linting for project. (#107)")
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

<<<<<<< HEAD
// export default emailEvent;
=======
export default emailEvent;
>>>>>>> 276c4d7 (Revert "Updated linting for project. (#107)")

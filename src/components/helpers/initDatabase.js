/**
 * @module | initDatabase.js
 * @description | Invoked upon login to compose containarized SQL DB (responsible for persisting of metric & notification data)
 **/

export default () => {
  fetch('http://localhost:3000/init', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((data) => data.json())
    .then((response) => {
      if (response.error !== null) {
        console.log(
          `Make sure Docker Desktop is running. \n\n ${response.error}`
        );
        return;
      }
      if (response.stderr) {
        console.log(`stderr: ${response.stderr}`);
        return;
      }
      console.log(response.stdout);
    })
    .catch((err) => {
      console.log(err);
    })
    .then((data) => data.json())
    .then((response) => {
      if (response.error !== null) {
        alert('Make sure Docker Desktop is running.');
        return;
      }
      if (response.stderr) {
        console.log(`stderr: ${response.stderr}`);
        return;
      }
      console.log(response.stdout);
    })
    .catch((err) => {
      console.log(err);
    });
};

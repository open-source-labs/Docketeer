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

// initDatabase is invoked upon login and composes the network consisting of a containerized SQL database
// which is the metrics data, notifications preferences data, etc. being persisted
// (for further details look into server / database)

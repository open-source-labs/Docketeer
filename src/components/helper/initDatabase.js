export default () => {

<<<<<<< HEAD:src/module/utils/initDatabase.js
  fetch('http://localhost:3000/init', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  })
  .then((data) => data.json())
  .then((response) => {
    if (response.error !== null){
      alert(`Make sure Docker Desktop is running. \n\n ${response.error}`);
      return
    }
    if (response.stderr){
      console.log(`stderr: ${response.stderr}`);
      return;
    }
    console.log(response.stdout);
  })
  .catch((err) => {
    console.log(err);
  })
=======
  exec(`cd ${directory} ; docker-compose up --no-recreate -d`, (error, stdout, stderr) => {
    if (error) {
      alert(`${error.message} `);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    console.log(stdout);
  });
>>>>>>> 276c4d7 (Revert "Updated linting for project. (#107)"):src/components/helper/initDatabase.js
};

// initDatabase is invoked upon login and composes the network consisting of a containerized SQL database 
// which is the metrics data, notifications preferences data, and etc. being persisted
<<<<<<< HEAD:src/module/utils/initDatabase.js
// (for further details look into server / databse)
=======
// (for further details look into src / databse)
>>>>>>> 276c4d7 (Revert "Updated linting for project. (#107)"):src/components/helper/initDatabase.js

// import { exec } from 'child_process';
import path from 'path';
import { config } from 'dotenv';
config();

export default () => {
  const directory =
    process.env.NODE_ENV === 'development'
      ? path.resolve(__dirname, '..', '..', 'database')
      : path.join(path.dirname(__dirname), 'database');

<<<<<<< HEAD:src/module/utils/initDatabase.js
  exec(
=======
  child_process.exec(
>>>>>>> 68822a4 (Get the html to show up on the electron app. Still need to get the react to mount the html id):src/components/helper/initDatabase.js
    `cd ${directory} ; docker-compose up --no-recreate -d`,
    (error, stdout, stderr) => {
      if (error) {
        alert(`${error.message} `);
        return;
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
      }
      console.log(stdout);
    }
  );
};

// initDatabase is invoked upon login and composes the network consisting of a containerized SQL database
// which is the metrics data, notifications preferences data, and etc. being persisted
// (for further details look into src / databse)

import { exec } from 'child_process';
import path from 'path';
import { config } from 'dotenv';

config();

export default () => {
  const directory =
    process.env.NODE_ENV === 'development'
      ? path.resolve(__dirname, '../../database')
      : path.join(path.dirname(__dirname), 'database');

  exec(`cd ${directory} && docker compose up --no-recreate --wait -d`, (error, stdout, stderr) => {
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
};

// initDatabase is invoked upon login and composes the network consisting of a containerized SQL database 
// which is the metrics data, notifications preferences data, and etc. being persisted
// (for further details look into src / databse)
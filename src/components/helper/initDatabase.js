import { exec } from "child_process";
import path from "path";

export default () => {
  const directory = path.resolve(__dirname, "..", "..", "database");
  // const directory = path.join(path.dirname(__dirname), "database");

  exec(`cd ${directory} && docker-compose up -d`, (error, stdout, stderr) => {
    if (error) {
      alert(`${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    console.log(stdout);
  });
};

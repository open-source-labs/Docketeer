const { exec } = require('child_process');

export const getContainers = () => {
  exec('docker ps', (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    return stdout;
  });
};

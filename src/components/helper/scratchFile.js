export const dockerComposeUp = (fileLocation, ymlFileName) => {
  console.log(' ymlFilename from comands.js', ymlFileName);

  const nativeYmlFilenames = ['docker-compose.yml', 'docker-compose.yaml', 'compose.yml', 'compose.yaml'];
  // if ymlFilename is not a native yml/yaml file name, add -f flag and non-native filename
  let cmd = `cd ${fileLocation} && docker-compose up -d`;

  if (!nativeYmlFilenames.includes(ymlFileName)) {
    cmd += ` -f ${ymlFileName}`;
  }

  console.log('cmd, ', cmd);

  exec(cmd, (error, stdout, stderr) => {
    if (error) {
      console.warn(error.message);
      return;
    }

    if (stderr) {
      console.log('stderr ', stderr);
      return stderr;
    }

    if (stdout) {
      console.log(stdout);
    }

  });
  return;

  // return new Promise((resolve, reject) => {
  //   exec(cmd, (error, stdout, stderr) => {
  //     if (error) {
  //       console.warn(error.message);
  //       return;
  //     }

  //     if (stderr) {
  //       resolve(stderr);
  //     }

  //     if (stdout) {
  //       console.log(stdout);
  //     }
  //   });
  // });
};

export const dockerComposeDown = (filePath) => {
  // return new Promise((resolve, reject) => {
  //   const cmd = `cd ${filePath} && docker-compose down`;

  //   exec(cmd, (error, stdout, stderr) => {
  //     if (error) {
  //       console.warn(error.message);
  //       return;
  //     }

  //     if (stderr) {
  //       console.log(stderr);
  //       resolve(stderr);
  //     }

  //     if (stdout) {
  //       console.log(stdout);
  //     }
  //   });
  // });

  const cmd = `cd ${filePath} && docker-compose down`;

  exec(cmd, (error, stdout, stderr) => {
    if (error) {
      console.warn(error.message);
      return;
    }

    if (stderr) {
      console.log('stderr ', stderr);
      return stderr;
    }

    if (stdout) {
      console.log(stdout);
    }
  });
  return;
};
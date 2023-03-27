/**
 * @module | commandController.ts
 * @description | Contains middleware that creates and runs the local database
 **/

import { Request, Response, NextFunction } from 'express';
import {
  CommandController,
  LogObject,
  composeStacksDockerObject,
} from '../../types';
import { exec } from 'child_process';
// TODO inconsitent use of async vs then
/**
 * Parse all the stdout output into array to manipulate data properly.
 *
 *  @param {*} stdout
 */
const convert = (stdout: string): string[][] => {
  const newArray = stdout.split('\n');

  const result: string[][] = [];
  for (let i = 1; i < newArray.length - 1; i++) {
    let removedSpace: string = newArray[i].replace(/\s+/g, ' '); // remove all spaces and replace it to 1 space
    removedSpace = removedSpace.replace(/\s[/]\s/g, '/'); // remove all the space in between slash
    const splittedArray: string[] = removedSpace.split(' ');
    result.push(splittedArray);
  }
  return result;
};

/**
 * Use user input to build options object to pass to getLogs()
 * Helper function to build options object based on the radio button selected in the process logs tab.
 * Creates readable logs.
 *
 * @param {string} containerId
 * @returns {object} optionsObj
 */
const makeArrayOfObjects = (
  string: string,
  containerName: string
): LogObject[] => {
  // Creates an array from the input string of logs
  const arrayOfObjects: LogObject[] = string
    .trim()
    .split('\n')
    // mutates the array of logs to be more readable
    .map((element: string): LogObject => {
      const obj: LogObject = {
        timeStamp: '',
        logMsg: '',
        containerName: '',
      };
      const logArray = element.split(' ');
      // extract timestamp

      // TODO timestamp cant only be string but if set to string | undefined ln 51 trips out; figure reason
      if (logArray[0].endsWith('Z')) {
        const timeStamp: string | undefined = logArray.shift();
        // parse GMT string to be readable local date and time
        obj.timeStamp = new Date(Date.parse(timeStamp || '')).toLocaleString();
      }
      // parse remaining array to create readable message
      let logMsg: string = logArray.join(' ');
      // messages with duplicate time&date have form: '<Time/Date> [num/notice] actual msg'
      const closingIndex: number = logMsg.indexOf(']');
      if (closingIndex >= 0) {
        logMsg = logMsg.slice(closingIndex + 1).trim();
      }
      // after removing [num/notice], some logs also have 'LOG:' before the actual msg
      if (logMsg.slice(0, 4) === 'LOG:') {
        logMsg = logMsg.slice(4);
      }
      obj.logMsg = logMsg.trim();
      obj.containerName = containerName;
      return obj;
    });

  // filter out empty messages
  const arrayOfLogs: LogObject[] = arrayOfObjects.filter(
    (obj: LogObject): boolean => obj.logMsg !== ''
  );
  return arrayOfLogs;
};

// TODO: is this used?
// ==========================================================
// Function: fn
// Purpose: formats our numbers to round to 2 decimal places
// ==========================================================
/**
 * Formats an input num to round to 2 decimal plames
 *
 *  @param {*} num
 */
const fn = (num: number): number => {
  return Math.round((num + Number.EPSILON) * 100) / 100;
};
// TODO the next two mwfs below dont practice dry; type alias?
// ==========================================================
// Function: promisifiedExec
// Purpose: makes our command line functions to return Promise
// ==========================================================
const promisifiedExec = (cmd: string): Promise<string> => {
  return new Promise(
    (resolve: (result: string) => void, reject: (error: Error) => void) => {
      exec(cmd, (error: Error | null, stdout: string, stderr: string) => {
        if (error) {
          reject(error);
        }
        resolve(stdout ? stdout : stderr);
      });
    }
  );
};

// ==========================================================
// Function: promisifiedExecStdErr
// Purpose: makes our command line functions to return Promise with std err
// ==========================================================
const promisifiedExecStdErr = (cmd: string): Promise<string> => {
  return new Promise(
    (resolve: (result: string) => void, reject: (error: Error) => void) => {
      exec(cmd, (error: Error | null, stdout: string, stderr: string) => {
        if (error) {
          reject(error);
        }
        resolve(stderr);
      });
    }
  );
};

// ==========================================================
// Function: convertArrToObj
// Purpose: converts arr to obj
// ==========================================================
const convertArrToObj = (array: string[][], objArray: string[]): object[] => {
  const result: object[] = [];
  for (let i = 0; i < array.length; i++) {
    const containerObj: { [k: string]: string } = {};
    for (let j = 0; j < array[i].length; j++) {
      containerObj[objArray[j]] = array[i][j];
    }
    result.push(containerObj);
  }
  return result;
};

const commandController: CommandController = {
  // ==========================================================
  // Middleware: getContainers
  // Purpose: pulls running container info from docker ps command
  // ==========================================================
  getContainers: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    // grab list of containers and info using docker ps

    const result: string = await promisifiedExec(
      'docker ps --format "{{json .}},"'
    );
    const dockerOutput: string[] = JSON.parse(
      `[${result.trim().slice(0, -1).replaceAll(' ', '')}]`
    );
    res.locals.containers = dockerOutput;
    return next();
  },

  // ==========================================================
  // Middleware: runImage;
  // Purpose: executes the docker run command with parameters and such
  // ==========================================================
  runImage: (req: Request, res: Response, next: NextFunction): void => {
    // TODO imgid ln 171?
    // List of running containers (docker ps)
    const { imgid, reps, tag } = req.body;
    const containerId: number = Math.floor(Math.random() * 100);
    const filteredRepo: string = reps
      .replace(/[,\/#!$%\^&\*;:{}=\`~()]/g, '.') // TODO shorten regex filter
      .replace(/\s{2,}/g, ' ');
    exec(
      `docker run --name ${filteredRepo}-${tag}_${containerId} ${reps}:${tag}`,
      (error: Error | null, stdout: string, stderr: string): void => {
        if (error) {
          console.log(`${error.message}`);
          return next(error);
        }
        if (stderr) {
          console.log(`runIm stderr: ${stderr}`);
          return;
        }
        return next();
      }
    );
  },

  // ==========================================================
  // Middleware: refreshStopped
  // Purpose: executes the docker ps command with status=exited flag to get list of stopped containers
  // ==========================================================
  refreshStopped: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    // run exec(docker ps -f "status=exited" --format "{{json .}},")
    const result: string = await promisifiedExec(
      'docker ps -f "status=exited" --format "{{json .}},"'
    );
    const dockerOutput: string = result.trim().slice(0, -1);
    const parsedDockerOutput: string[] = JSON.parse(`[${dockerOutput}]`);

    res.locals.stoppedContainers = parsedDockerOutput;
    return next();
  },

  // ==========================================================
  // Middleware: refreshImgaes
  // Purpose: executes the docker image command to get list of pulled images
  // ==========================================================
  refreshImages: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    // TODO any
    const result: string = await promisifiedExec('docker images');
    // make an arr of subarrays containing strings
    const value: string[][] = convert(result);
    // TODO why is this called objArr?
    const objArray: string[] = ['reps', 'tag', 'imgid', 'size'];
    const resultImages: string[][] = [];

    for (let i = 0; i < value.length; i++) {
      const innerArray: string[] = [];
      if (value[i][0] !== '<none>') {
        innerArray.push(value[i][0]);
        innerArray.push(value[i][1]);
        innerArray.push(value[i][2]);
        innerArray.push(value[i][6]);
        resultImages.push(innerArray);
      }
    }

    const convertedValue: object[] = convertArrToObj(resultImages, objArray);

    res.locals.imagesList = convertedValue;
    return next();
  },

  // ==========================================================
  // Middleware: remove
  // Purpose: executes docker rm {containerId} command to remove a stopped container
  // ==========================================================
  remove: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    exec(
      `docker rm ${req.query.id}`,
      (error: Error | null, stdout: string, stderr: string): void => {
        if (error) {
          console.log(`${error.message}`);
          return next(error);
        }
        if (stderr) {
          console.log(`remove stderr: ${stderr}`);
          return;
        }
        // container deleted move to refreshStopped method
        // res.locals.idRemoved = req.body;
        res.locals.idRemoved = {
          message: `Container with id ${req.query.id} deleted`,
        };
        return next();
      }
    );
  },

  // ==========================================================
  // Middleware: stopContainer
  // Purpose: executes docker stop {id} command to stop a running container
  // ==========================================================
  stopContainer: (req: Request, res: Response, next: NextFunction): void => {
    exec(
      `docker stop ${req.query.id}`,
      (error: Error | null, stdout: string, stderr: string) => {
        if (error) {
          console.log(`${error.message}`);
          return next(error);
        }
        if (stderr) {
          console.log(`stop stderr: ${stderr}`);
          return;
        }

        res.locals.containerStopped = {
          message: `Stopped Container with id ${req.query.id} stopped`,
        };
        return next();
      }
    );
  },

  // ==========================================================
  // Middleware: runStopped
  // Purpose: executes docker start {id} command to run a stopped container
  // ==========================================================
  runStopped: (req: Request, res: Response, next: NextFunction): void => {
    exec(
      `docker start ${req.query.id}`,
      (error: Error | null, stdout: string, stderr: string) => {
        if (error) {
          console.log(`${error.message}`);
          return next(error);
        }
        if (stderr) {
          console.log(`runStopped stderr: ${stderr}`);
          return;
        }

        res.locals.containerRan = {
          message: `Running container with id ${req.query.id}`,
        };
        return next();
      }
    );
  },

  // ==========================================================
  // Middleware: removeImage
  // Purpose: executes `docker rmi -f {id} command to remove a pulled image
  // ==========================================================
  removeImage: (req: Request, res: Response, next: NextFunction): void => {
    exec(
      `docker rmi -f ${req.query.id}`,
      (error: Error | null, stdout: string, stderr: string) => {
        if (error) {
          console.log(
            `${error.message}` +
              '\nPlease stop running container first then remove.'
          );
          return next(error);
        }
        if (stderr) {
          console.log(`removeIm stderr: ${stderr}`);
          return;
        }
        return next();
      }
    );
  },

  // ==========================================================
  // Middleware: dockerPrune
  // Purpose: executes docker system prune --force command to remove all unused containers, networks, images (both dangling and unreferenced)
  // ==========================================================
  dockerPrune: (req: Request, res: Response, next: NextFunction): void => {
    exec(
      'docker system prune --force',
      (error: Error | null, stdout: string, stderr: string) => {
        if (error) {
          console.log(`${error.message}`);
          return next(error);
        }
        if (stderr) {
          console.log(`handlePruneClick stderr: ${stderr}`);
          return;
        }
        res.locals.pruneMessage = {
          message:
            'Remove all unused containers, networks, images (both dangling and unreferenced)',
        };
        return next();
      }
    );
  },

  // ==========================================================
  // Middleware: pullImage
  // Purpose: executes docker pull {repo} command to pull a new image
  // ==========================================================
  pullImage: (req: Request, res: Response, next: NextFunction): void => {
    exec(
      `docker pull ${req.query.repo}`,
      (error: Error | null, stdout: string, stderr: string) => {
        if (error) {
          console.log(
            `Image repo '${req.query.repo}' seems to not exist, or may be a private repo.`
          );
          return next(error);
        }
        if (stderr) {
          console.log(`pullImage stderr: ${stderr}`);
        }
        res.locals.imgMessage = {
          message: `${req.query.repo} is currently being downloaded`,
        };
        console.log(
          'res.locals.imgMessage in pullImage',
          res.locals.imgMessage
        );
        return next();
      }
    );
  },

  // ==========================================================
  // Middleware: networkContainers
  // Purpose: Display all containers network based on docker-compose
  // when the application starts
  // ==========================================================
  networkContainers: (
    req: Request,
    res: Response,
    next: NextFunction
  ): void => {
    exec(
      'docker network ls --format "{{json .}},"',
      (error: Error | null, stdout: string, stderr: string): void => {
        if (error) {
          console.log(`networkContainers error: ${error.message}`);
          return next(error);
        }
        if (stderr) {
          console.log(`networkContainers stderr: ${stderr}`);
          return;
        }

        const dockerOutput = `[${stdout
          .trim()
          .slice(0, -1)
          .replaceAll(' ', '')}]`;

        type NetworkContainer = {
          Name: string;
          ID: string;
          Driver: string;
        };

        // remove docker network defaults named: bridge, host, and none
        const networkContainers: NetworkContainer[] = JSON.parse(
          dockerOutput
        ).filter(
          ({ Name }: { Name: string }) =>
            Name !== 'bridge' && Name !== 'host' && Name !== 'none'
        );
        res.locals.networkContainers = networkContainers;
        return next();
      }
    );
  },

  // ==========================================================
  // Middleware: inspectDockerContainer
  // Purpose: inspects docker containers; is not implemented right now
  // ==========================================================
  inspectDockerContainer: (
    req: Request,
    res: Response,
    next: NextFunction
  ): void => {
    exec(
      `docker inspect ${req.query.id}`,
      (error: Error | null, stdout: string, stderr: string) => {
        if (error) {
          console.log(`inspectDockerContainer error: ${error.message}`);
          return next();
        }
        if (stderr) {
          console.log(`inspectDockerContainer stderr: ${stderr}`);
          return;
        }
        res.locals.inspectOut = stdout;
      }
    );
  },

  // ==========================================================
  // Middleware: composeUp
  // Purpose: compose up a network and container from an uploaded yml file
  // ==========================================================
  composeUp: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const nativeYmlFilenames: Set<string> = new Set([
      'docker-compose.yml',
      'docker-compose.yaml',
      'compose.yml',
      'compose.yaml',
    ]);

    const cmd: string = nativeYmlFilenames.has(req.body.ymlFileName)
      ? `cd ${req.body.filePath} && docker compose up -d`
      : `cd ${req.body.filePath} && docker compose -f ${req.body.ymlFileName} up -d`;

    const result: string | Error = await promisifiedExecStdErr(cmd);
    res.locals.composeMessage = result;
    return next();
  },

  // ==========================================================
  // Middleware: composeStacks
  // Purpose: get a list of all current container networks, based on running containers
  // ==========================================================
  composeStacks: (req: Request, res: Response, next: NextFunction): void => {
    exec(
      'docker network ls --filter "label=com.docker.compose.network" --format "{{json .}},"',
      (error: Error | null, stdout: string, stderr: string) => {
        if (error) {
          console.log(`dockerComposeStacks error: ${error.message}`);
          return next(error);
        }
        if (stderr) {
          console.log(`dockerComposeStacks stderr: ${stderr}`);
          return;
        }

        // create array of running container network objects
        // the array is sorted in alphabetical order based on network Name
        const dockerOutput = `[${stdout
          .trim()
          .slice(0, -1)
          .replaceAll(' ', '')}]`;

        const parseDockerOutput = JSON.parse(dockerOutput);
        // TODO take a moment to see if we can figure why we update the filePath and ymlFileName in our object
        // if container network was composed through the application, add a filePath and ymlFileName property to its container network object
        if (req.body.filePath && req.body.ymlFileName) {
          const directoryNameArray: string[] = req.body.filePath.split('/');
          // console.log(directoryNameArray);
          // const containerNetworkName =
          //   directoryNameArray[directoryNameArray.length - 1].concat('_default');
          parseDockerOutput.forEach((obj: composeStacksDockerObject): void => {
            if (
              obj.Name.includes(
                directoryNameArray[directoryNameArray.length - 1]
              )
            ) {
              obj.FilePath = req.body.filePath;
              obj.YmlFileName = req.body.ymlFileName;
            }
          });
        }
        res.locals.output = parseDockerOutput;
        return next();
      }
    );
  },

  // ==========================================================
  // Middleware: composeDown
  // Purpose: composes down a container and network
  // TODO
  // Note: causes server to shut down because container is not properly
  // stopped; button goes away when you leave the page because the
  // file name and location are not in "docker networks" so it gets
  // erased from the state
  // ==========================================================
  composeDown: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const nativeYmlFilenames: Set<string> = new Set([
      'docker-compose.yml',
      'docker-compose.yaml',
      'compose.yml',
      'compose.yaml',
    ]);

    const cmd: string = nativeYmlFilenames.has(req.body.ymlFileName)
      ? `cd ${req.body.filePath} && docker-compose down`
      : `cd ${req.body.filePath} && docker-compose -f ${req.body.ymlFileName} down`;

    const result: string | Error = await promisifiedExecStdErr(cmd);
    res.locals.composeMessage = result;
    return next();
  },

  // ==========================================================
  // Middleware: getAllDockerVolumes
  // Purpose: retrieves the list of running volumes
  // ==========================================================
  getAllDockerVolumes: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    exec(
      'docker volume ls --format "{{json .}},"',
      (error: Error | null, stdout: string, stderr: string) => {
        if (error) {
          console.log(`getAllDockerVolumes error: ${error.message}`);
          return next(error);
        }
        if (stderr) {
          console.log(`getAllDockerVolumes stderr: ${stderr}`);
          return;
        }

        // TODO define shape of dockeroutput with interface
        const dockerOutput: object = JSON.parse(
          `[${stdout.trim().slice(0, -1).replaceAll(' ', '')}]`
        );
        res.locals.dockerVolumes = dockerOutput;
        return next();
      }
    );
  },

  // ==========================================================
  // Middleware: getVolumeContainers
  // Purpose: runs docker ps filtering by volume name to get list of containers running in the specified volume
  // ==========================================================
  getVolumeContainers: (req: Request, res: Response, next: NextFunction) => {
    exec(
      `docker ps -a --filter volume=${req.query.volumeName} --format "{{json .}},"`,
      (error: Error | null, stdout: string, stderr: string) => {
        if (error) {
          console.log(`getVolumeContainers error: ${error.message}`);
          return;
        }
        if (stderr) {
          console.log(`getVolumeContainers stderr: ${stderr}`);
          return;
        }
        const dockerOutput: object = JSON.parse(
          `[${stdout.trim().slice(0, -1)}]`
        );
        res.locals.volumeContainers = dockerOutput;
        return next();
      }
    );
  },
  // TODO revise description?
  // ==========================================================
  // Middleware: getLogs
  // Purpose: runs docker ps filtering by volume name to get list of containers running in the specified volume
  // ==========================================================
  getLogs: (req: Request, res: Response, next: NextFunction) => {
    // TODO any
    const containerLogs: { [k: string]: LogObject[] } = {
      stdout: [],
      stderr: [],
    };
    const optionsObj: { [k: string]: string[] } = req.body;
    console.log('optionsObj', req.body);

    let completedExecs = 0;

    // iterate through containerIds array in optionsObj
    for (let i = 0; i < optionsObj.containerIds.length; i++) {
      // build inputCommandString to get logs from command line
      let inputCommandString = 'docker logs ';
      // if (optionsObj.since) {
      //   inputCommandString += `--since ${optionsObj.since} `;
      // }
      // optionsObj.tail
      //   ? (inputCommandString += `--tail ${optionsObj.tail} `)
      //   : (inputCommandString += '--tail 50 ');
      inputCommandString += `${optionsObj.containerIds[i]}`;
      // inputCommandString += 'grafana';
      // execute our command (inputCommandString) to update our containerLogs props to include proper logs

      console.log('ab to exec')
      exec(
        inputCommandString,
        (error: Error | null, stdout: string, stderr: string) => {
          console.log(stdout);
          if (error) {
            console.log(
              'Please enter a valid rfc3339 date, Unix timestamp, or Go duration string'
            );
            return next(error);
          }
          // update containerLogs properties to include what was received in stdout/stderr
          console.log('broken stuff')
          containerLogs.stdout = [
            ...containerLogs.stdout,
            ...makeArrayOfObjects(stdout, optionsObj.containerIds[i]),
          ];
          containerLogs.stderr = [
            ...containerLogs.stderr,
            ...makeArrayOfObjects(stderr, optionsObj.containerIds[i]),
          ];
          res.locals.logs = containerLogs;
          // console.log('logs', res.locals.logs);
          // console.log('ab to increment')
          completedExecs++;
          console.log('CL', completedExecs, containerLogs);
          if (i === optionsObj.containerIds.length - 1) return next();
        }
      );
      // res.locals.logs = CL;
      console.log('after exec')
      console.log('locals after exec', res.locals.logs)
    }
    // console.log('execs', completedExecs);
    console.log('AFTER FOR LOOP LOGS', res.locals.logs);
    // return next();
    // while(completedExecs !== optionsObj.containerIds.length) {
    //   // console.log('execs', completedExecs)
    //   if (completedExecs === optionsObj.containerIds.length) return next();
    // }
  },
};

// export controller here
export default commandController;

/**
 * @module | commandController.ts
 * @description | Contains middleware that creates and runs the local database
 **/
// TODO make a type alias for mwf
import { Request, Response, NextFunction } from 'express';
import {
  CommandController,
  LogObject,
  composeStacksDockerObject,
} from '../../types';
import { exec } from 'child_process';

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
  console.log('makeArrayOfObjs input2: ', containerName);

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
      console.log('element', element);
      const logArray = element.split(' ');
      console.log('logArray', logArray);

      // extract timestamp from logArray
      let timeStamp: string = logArray.find(el => el.endsWith('Z'));

      // if there is a timestamp, parse it
      if (timeStamp) {
        timeStamp = timeStamp.replace(/t(s)?=/, '');
        console.log('timeStamp', timeStamp);

        // parse GMT string to be readable local date and time
        obj.timeStamp = new Date(Date.parse(timeStamp || '')).toLocaleString();
        console.log('obj.timeStamp', obj.timeStamp);
      }

      // parse remaining array to create readable message
      let logMsg: string = logArray.filter(el => !el.endsWith('Z')).join(' ');
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

  // console.log('makeArrayOfObjs output: ', arrayOfObjects);

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

// TODO add descriptions to these functions
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
const convertArrToObj = (
  array: string[][],
  imgPropsArray: string[]
): object[] => {
  const result: object[] = [];
  for (let i = 0; i < array.length; i++) {
    const containerObj: { [k: string]: string } = {};
    for (let j = 0; j < array[i].length; j++) {
      containerObj[imgPropsArray[j]] = array[i][j];
    }
    result.push(containerObj);
  }
  return result;
};

interface CommandMethods {
  /**
   * @description pulls running container info from docker ps command as a json object
   */
  getContainers;

  /**
   * @description executes the docker run command with parameters from body: reps, tag
   * @note imgid is not used; may want it swapped with containerId in the exec?
   */
  runImage;

  /**
   * @description executes the docker ps command with status=exited flag to get list of stopped containers
   */
  refreshStopped;

  /**
   * @description executes the docker image command to get list of pulled images; invokes convertArrToObj and passes resulting value in locals to imagesList
   */
  refreshImages;

  /**
   * @description executes docker rm {containerId} command to remove a stopped container
   * @note id is grabbed from req.query
   */
  remove;

  /**
   * @description executes docker stop {id} command to stop a running container
   * @note id is grabbed from req.query
   */
  stopContainer;

  /**
   * @description executes docker start {id} command to run a stopped container
   * @note id is grabbed from req.query
   */
  runStopped;

  /**
   * @description executes `docker rmi -f {id} command to remove a pulled image
   * @note id is grabbed from req.query
   */
  removeImage;

  /**
   * @description executes docker system prune --force command to remove all unused containers, networks, images (both dangling and unreferenced); passes a string to prop 'pruneMessage' in locals relaying the prune
   */
  dockerPrune;

  /**
   * @description executes docker pull {repo} command to pull a new image; send a string to locals 'imgMessage'
   * @note image's repo name grabbed from req.query
   */
  pullImage;

  /**
   * @description Display all containers network based on docker-compose in a json object; when the application starts
   */
  networkContainers;

  /**
   * @description inspects docker containers
   * @note is not implemented right now
   */
  inspectDockerContainer;

  /**
   * @description compose up a network and container from an uploaded yml file
   * @note file path is grabbed from req.body
   */
  composeUp;

  /**
   * @description get a list of all current container networks, based on running containers; passes the output to locals
   * @note grabs file path and yml file name from req.body
   */
  composeStacks;

  /**
   * @description composes down a container and network
   * @note (from v10): causes server to shut down because container is not properly
  stopped; button goes away when you leave the page because the
  file name and location are not in "docker networks" so it gets
  erased from the state
   */
  composeDown;

  /**
   * @description retrieves the list of running volumes; passes the output to 'dockerVolumes' in locals
   */
  getAllDockerVolumes;

  /**
   * @description runs docker ps filtering by volume name to get list of containers running in the specified volume; passes output to 'volumeContainers' in locals
   * @note grabs volume name from query
   */
  getVolumeContainers;

  /**
   * @description runs docker logs with timestamps and presists 'containerLogs' though locals, invokes makeArrayOfObjects passing in stdout/err to add to the 'containerLogs' obj
   */
  getLogs;
}

/**
 * @description runs terminal commands through execs to interact with our containers, images, volumes, and networks
 */
const commandController: CommandController & CommandMethods = {
  getContainers: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const result: string = await promisifiedExec(
      'docker ps --format "{{json .}},"'
    );
    const dockerOutput: string[] = JSON.parse(
      `[${result.trim().slice(0, -1).replaceAll(' ', '')}]`
    );
    res.locals.containers = dockerOutput;
    return next();
  },

  runImage: (req: Request, res: Response, next: NextFunction): void => {
    // TODO imgid ln 171?
    // List of running containers (docker ps)
    const { imgid, reps, tag } = req.body;
    const containerId: number = Math.floor(Math.random() * 100);
    const filteredRepo: string = reps
      .replace(/[,\/#!$%\^&\*;:{}=\`~()]/g, '.')
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

  refreshStopped: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
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
    const result: string = await promisifiedExec('docker images');

    const value: string[][] = convert(result);
    // Image properties: reps -> repository, tag -> img label, imgid -> image ID, size -> size of the img in bytes
    const imgPropsArray: string[] = ['reps', 'tag', 'imgid', 'size'];
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

    const convertedValue: object[] = convertArrToObj(
      resultImages,
      imgPropsArray
    );

    res.locals.imagesList = convertedValue;
    return next();
  },

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

    console.log('req.body', req.body);

    const result: string | Error = await promisifiedExecStdErr(cmd);
    res.locals.composeMessage = result;
    return next();
  },

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
        // if container network was composed through the application, add a filePath and ymlFileName property to its container network object
        if (req.body.filePath && req.body.ymlFileName) {
          const directoryNameArray: string[] = req.body.filePath.split('/');
          // TODO delete these comments?
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

        const dockerOutput: object = JSON.parse(
          `[${stdout.trim().slice(0, -1).replaceAll(' ', '')}]`
        );
        res.locals.dockerVolumes = dockerOutput;
        return next();
      }
    );
  },

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

  getLogs: (req: Request, res: Response, next: NextFunction) => {
    const containerLogs: { [k: string]: LogObject[] } = {
      stdout: [],
      stderr: [],
    };
    const optionsObj: { [k: string]: string[] } = req.body;
    // console.log('optionsObj', req.body);

    // let completedExecs = 0;

    // iterate through containerIds array in optionsObj
    for (let i = 0; i < optionsObj.containerNames.length; i++) {
      // build inputCommandString to get logs from command line
      let inputCommandString = `docker logs ${optionsObj.containerNames[i]} `;
      if (optionsObj.since) {
        inputCommandString += `--since ${optionsObj.since} `;
      }
      // optionsObj.tail
      //   ? (inputCommandString += `--tail ${optionsObj.tail} `)
      //   : (inputCommandString += '--tail 50 ');
      // inputCommandString += `${optionsObj.containerNames[i]}`;
      // inputCommandString += 'grafana';
      // execute our command (inputCommandString) to update our containerLogs props to include proper logs

      // console.log('ab to exec');
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
          // console.log('broken stuff');
          containerLogs.stdout = [
            ...containerLogs.stdout,
            ...makeArrayOfObjects(stdout, optionsObj.containerNames[i]),
          ];
          containerLogs.stderr = [
            ...containerLogs.stderr,
            ...makeArrayOfObjects(stderr, optionsObj.containerNames[i]),
          ];
          res.locals.logs = containerLogs;
          // console.log('logs', res.locals.logs);
          // console.log('ab to increment')
          // completedExecs++;
          // console.log('CL', containerLogs);
          if (i === optionsObj.containerNames.length - 1) return next();
        }
      );
      // res.locals.logs = CL;
      // console.log('after exec');
      // console.log('locals after exec', res.locals.logs);
    }
    // console.log('execs', completedExecs);
    // console.log('AFTER FOR LOOP LOGS', res.locals.logs);
    // return next();
    // while(completedExecs !== optionsObj.containerIds.length) {
    //   // console.log('execs', completedExecs)
    //   if (completedExecs === optionsObj.containerIds.length) return next();
    // }
  },
};

// export controller here
export default commandController;

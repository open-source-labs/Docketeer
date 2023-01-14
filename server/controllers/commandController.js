/**
 * @module initDatabase Controller
 * @description Contains middleware that creates and runs the local database
 */

const { exec } = require('child_process');
const { net } = require('electron');
const { constants } = require('fs/promises');
const { cpuUsage, freemem, totalmem, freememPercentage } = require('os-utils');
const commandController =  {};


// ==========================================================
// Function: convert
// Purpose: 
// ==========================================================
/**
 * Parse all the stdout output into array to manipulate data properly.
 *
 *  @param {*} stdout
 */
const convert = (stdout) => {
  const newArray = stdout.split('\n');
  const result = [];
  for (let i = 1; i < newArray.length - 1; i++) {
    let removedSpace = newArray[i].replace(/\s+/g, ' '); // remove all spaces and replace it to 1 space
    removedSpace = removedSpace.replace(/\s[/]\s/g, '/'); // remove all the space in between slash
    const splittedArray = removedSpace.split(' ');
    result.push(splittedArray);
  }
  return result;
};

/**
 * Use user input to build options object to pass to getLogs()
 * Helper function to build options object based on the radio button selected in the process logs tab
 *
 * @param {string} containerId
 * @returns {object} optionsObj
 */
const makeArrayOfObjects = (string, containerName) => {
  const arrayOfObjects = string
    .trim()
    .split('\n')
    .map((element) => {
      const obj = {};
      const logArray = element.split(' ');
      // extract timestamp
      if (logArray[0].endsWith('Z')) {
        const timeStamp = logArray.shift();
        // parse GMT string to be readable local date and time
        obj.timeStamp = new Date(Date.parse(timeStamp)).toLocaleString();
      }
      // parse remaining array to create readable message
      let logMsg = logArray.join(' ');
      // messages with duplicate time&date have form: '<Time/Date> [num/notice] actual msg'
      const closingIndex = logMsg.indexOf(']');
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
  const arrayOfLogs = arrayOfObjects.filter((obj) => obj.logMsg !== '');
  return arrayOfLogs;
};

// ==========================================================
// Function: fn
// Purpose: formats our numbers to round to 2 decimal places
// ==========================================================
/**
 * Formats an input num to round to 2 decimal plames
 *
 *  @param {*} num
 */
const fn = (num) => {
  return Math.round((num + Number.EPSILON) * 100) / 100;
};

// ==========================================================
// Function: promisifiedExec
// Purpose: makes our command line functions to return Promise
// ==========================================================
const promisifiedExec = (cmd) => {
  return new Promise((resolve, reject) => {
    exec(cmd, (error, stdout, stderr) => {
      if (error) {
        reject(error);
      }
      resolve(stdout ? stdout : stderr);
    });
  });
};

// ==========================================================
// Function: promisifiedExecStdErr
// Purpose: makes our command line functions to return Promise
// ==========================================================
const promisifiedExecStdErr = (cmd) => {
  return new Promise((resolve, reject) => {
    exec(cmd, (error, stdout, stderr) => {
      if (error) {
        reject(error);
      }
      resolve(stderr);
    });
  });
};

// ==========================================================
// Function: convertArrToObj
// Purpose: converts arr to obj
// ==========================================================
const convertArrToObj = (array, objArray) => {
  const result = [];
  for (let i = 0; i < array.length; i++) {
    const containerObj = {};
    for (let j = 0; j < array[i].length; j++) {
      containerObj[objArray[j]] = array[i][j];
    }
    result.push(containerObj);
  }
  return result;
};

// ==========================================================
// Middleware: getContainers
// Purpose: pulls running container info from docker ps command
// ==========================================================
commandController.getContainers = async (req, res, next) => {
  // grab list of containers and info using docker ps
  const result = await promisifiedExec('docker ps --format "{{json .}},"');
  const dockerOutput = JSON.parse(`[${result
    .trim()
    .slice(0, -1)
    .replaceAll(' ', '')}]`);
  res.locals.containers = dockerOutput;
  return next();
};

// ==========================================================
// Middleware: getApiData
// Purpose: pulls docker engine api info for EACH container
// and sends bac
// ==========================================================
commandController.getApiData = async (req, res, next) => {
  const apiDataList = [];
  const requests = [];
  // loop through list of containers and make curl request
  // res.locals.containers has list of containres
  const dockerOutput = res.locals.containers;
  // helper function to async the curl request to return the data for specified container
  const getContainerDetails = async (containerId) => {
    const result = await promisifiedExec(`curl -v --unix-socket /var/run/docker.sock http://localhost/v1.41/containers/${containerId}/stats\?stream\=false`);
    return result;
  };
  
  for (const each of dockerOutput) {
    // const containerData = getContainerDetails(each.ID);
    requests.push(getContainerDetails(each.ID));
  }
  
  const promisedApi = await Promise.all(requests);

  for (const each of promisedApi) {
    const containerInfo = dockerOutput[promisedApi.indexOf(each)];
    const apiData = JSON.parse(each);
    const container = {
      ID: containerInfo.ID,
      Name: containerInfo.Names,
      Image: containerInfo.Image,
      CPUPerc: `${fn(((apiData.cpu_stats.cpu_usage.total_usage - apiData.precpu_stats.cpu_usage.total_usage) / (apiData.cpu_stats.system_cpu_usage - apiData.precpu_stats.system_cpu_usage)) * apiData.cpu_stats.online_cpus * 100)}%`,
      MemPerc: `${fn(((apiData.memory_stats.usage - apiData.memory_stats.stats.inactive_file) / apiData.memory_stats.limit) * 100)}%`,
      MemUsage: `${fn((apiData.memory_stats.usage - apiData.memory_stats.stats.inactive_file) / 1048576)}MiB / ${fn(apiData.memory_stats.limit / 1048576)}MiB`,
      NetIO: `${fn(apiData.networks.eth0.rx_bytes / 1000)}kB / ${fn(apiData.networks.eth0.tx_bytes / 1000)}kB`,
      BlockIO: apiData.blkio_stats.io_service_bytes_recursive ? `${fn(apiData.blkio_stats.io_service_bytes_recursive[0].value / 1000)}kB / ${fn(apiData.blkio_stats.io_service_bytes_recursive[1].value / 1000)}kB` : '0kB / 0kB',
      PIDs: `${apiData.pids_stats.current}`,
      // add new data
    };
    apiDataList.push(container);
  }
  res.locals.apiData = apiDataList;
  return next();
};

// ==========================================================
// Middleware: getHost
// Purpose: pulls host statistics using the os-utils module
// ==========================================================
commandController.getHost = async (req, res, next) => {
  const hostData = {
    cpuPerc: 0,
    memPerc: 0,
  };

  const promisifyCpuUsage = () => {
    return new Promise ((resolve, reject) => {
      cpuUsage((data) => {
        resolve(data);
      });
    });
  };

  const cpuPerc = await promisifyCpuUsage();
  hostData.cpuPerc = fn(cpuPerc * 100);
  
  const memPerc = (1 - freememPercentage()) * 100;
  hostData.memPerc = fn(memPerc);
  
  res.locals.hostData = hostData;
  // dispatch hostData
  return next();
};

// ==========================================================
// Middleware: runImage
// Purpose: executes the docker run command with parameters and such
// ==========================================================
commandController.runImage = (req, res, next) => {
  // list of running containers (docker ps)
  console.log(req.body);
  const { imgid, reps, tag } = req.body;
  const containerId = Math.floor(Math.random() * 100);
  const filteredRepo = reps
    .replace(/[,\/#!$%\^&\*;:{}=\`~()]/g, '.')
    .replace(/\s{2,}/g, ' ');
  exec(`docker run --name ${filteredRepo}-${tag}_${containerId} ${reps}:${tag}`, (error, stdout, stderr) => {
    if (error) {
      alert(`${error.message}`);
      return next(error);
    }
    if (stderr) {
      console.log(`runIm stderr: ${stderr}`);
      return;
    }
    return next();
  });
  // const runningContainers = res.locals.containers;
  // const stateCopy = req.body;
  // console.log('🚀 ~ file: commandController.js:131 ~ stateCopy', stateCopy);
  // for(let i = 0; i < runningContainers.length; i++) {
  //   if(!stateCopy.includes(runningContainers[i])) stateCopy.push(runningContainers[i]);
  // }
  // res.locals.newRunningList = stateCopy;
  // return next();
  // logic here to run docker ps to get list of containers, make copy of running list, add the and push the new container in req.body into copy of running list, and send that into res.locals.newRunningList

};

// ==========================================================
// Middleware: refreshStopped
// Purpose: executes the docker ps command with status=exited flag to get list of stopped containers
// ==========================================================
commandController.refreshStopped = async (req, res, next) => {
  // run exec(docker ps -f "status=exited" --format "{{json .}},")
  const result = await promisifiedExec('docker ps -f "status=exited" --format "{{json .}},"');
  const dockerOutput = result.trim().slice(0, -1);
  const parsedDockerOutput = JSON.parse(`[${dockerOutput}]`);

  res.locals.stoppedContainers = parsedDockerOutput;
  return next();
};

// ==========================================================
// Middleware: refreshImgaes
// Purpose: executes the docker image command to get list of pulled images
// ==========================================================
commandController.refreshImages = async (req, res, next) => {
  const result = await promisifiedExec('docker images');

  const value = convert(result);

  const objArray = ['reps', 'tag', 'imgid', 'size'];
  const resultImages = [];

  for (let i = 0; i < value.length; i++) {
    const innerArray = [];
    if (value[i][0] !== '<none>') {
      innerArray.push(value[i][0]);
      innerArray.push(value[i][1]);
      innerArray.push(value[i][2]);
      innerArray.push(value[i][6]);
      resultImages.push(innerArray);
    }
  }

  const convertedValue = convertArrToObj(
    resultImages,
    objArray
  );

  res.locals.imagesList = convertedValue;
  return next();
};

// ==========================================================
// Middleware: remove
// Purpose: executes docker rm {containerId} command to remove a stopped container
// ==========================================================
commandController.remove = (req, res, next) => {
  exec(`docker rm ${req.query.id}`, (error, stdout, stderr) => {
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
    res.locals.idRemoved = {message: `Container with id ${req.query.id} deleted`};
    return next();
  });
};

// ==========================================================
// Middleware: stopContainer
// Purpose: executes docker stop {id} command to stop a running container
// ==========================================================
commandController.stopContainer = (req, res, next) => {
  exec(`docker stop ${req.query.id}`, (error, stderr, stdout) => {
    if(error) {
      console.log(`${error.message}`);
      return next(error); 
    }
    if(stderr) {
      console.log(`stop stderr: ${stderr}`);
      return;
    }

    res.locals.containerStopped = {message: `Stopped Container with id ${req.query.id} stopped`};
    return next();
  });
};

// ==========================================================
// Middleware: runStopped
// Purpose: executes docker start {id} command to run a stopped container
// ==========================================================
commandController.runStopped = (req, res, next) => {
  console.log('inside docker runstopped', req.query.id);
  exec(`docker start ${req.query.id}`, (error, stdout, stderr) => {
    if (error) {
      console.log(`${error.message}`);
      return next(error);
    }
    if (stderr) {
      console.log(`runStopped stderr: ${stderr}`);
      return;
    }

    res.locals.containerRan = {message: `Running container with id ${req.query.id}`};
    return next();

  });
};

// ==========================================================
// Middleware: removeImage
// Purpose: executes `docker rmi -f {id} command to remove a pulled image 
// ==========================================================
commandController.removeImage = (req, res, next) => {
  // console.log('in remove image');
  exec(`docker rmi -f ${req.query.id}`, (error, stderr, stdout) => {
    if(error) {
      console.log(`${error.message}` + '\nPlease stop running container first then remove.');
      return next(error);
    }
    if(stderr) {
      console.log(`removeIm stderr: ${stderr}`);
      return;
    }
    return next();
  });
};

// ==========================================================
// Middleware: dockerPrune
// Purpose: executes docker system prune --force command to remove all unused containers, networks, images (both dangling and unreferenced) 
// ==========================================================
commandController.dockerPrune = (req, res, next) => {
  exec(
    'docker system prune --force',
    (error, stdout, stderr) => {
      if (error) {
        alert(`${error.message}`);
        return next(error);
      }
      if (stderr) {
        console.log(`handlePruneClick stderr: ${stderr}`);
        return;
      }
      res.locals.pruneMessage = {message: 
        'Remove all unused containers, networks, images (both dangling and unreferenced)'};
      return next();
    }
  );
};

// ==========================================================
// Middleware: pullImage
// Purpose: executes docker pull {repo} command to pull a new image
// ==========================================================
commandController.pullImage = (req, res, next) => {
  exec(`docker pull ${req.query.repo}`, (error, stdout, stderr) => {
    if (error) {
      console.log(`Image repo '${req.query.repo}' seems to not exist, or may be a private repo.`);
      return next(error); 
    }
    if(stderr) {
      console.log(`pullImage stderr: ${stderr}`);
    }
    res.locals.imgMessage = {message:`${req.query.repo} is currently being downloaded`};
    return next();
  });
};

// ==========================================================
// Middleware: networkContainers
// Purpose: Display all containers network based on docker-compose 
// when the application starts
// ==========================================================
commandController.networkContainers = (req, res, next) => {
  exec('docker network ls --format "{{json .}},"',
    (error, stdout, stderr) => {
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

      // remove docker network defaults named: bridge, host, and none
      const networkContainers = JSON.parse(dockerOutput).filter(
        ({ Name }) => Name !== 'bridge' && Name !== 'host' && Name !== 'none'
      );
      res.locals.networkContainers = networkContainers;
      return next();
    }
  );
};

// ==========================================================
// Middleware: inspectDockerContainer
// Purpose: inspects docker containers; is not implemented right now
// ==========================================================
commandController.inspectDockerContainer = (req, res, next) => {
  exec(
    `docker inspect ${req.query.id}`,
    (error, stdout, stderr) => {
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
};

// ==========================================================
// Middleware: composeUp
// Purpose: compose up a network and container from an uploaded yml file
// ==========================================================
commandController.composeUp = async (req, res, next) => {
  const nativeYmlFilenames = new Set([
    'docker-compose.yml',
    'docker-compose.yaml',
    'compose.yml',
    'compose.yaml',
  ]);

  const cmd = nativeYmlFilenames.has(req.body.ymlFileName) ?
    `cd ${req.body.filePath} && docker compose up -d` :
    `cd ${req.body.filePath} && docker compose -f ${req.body.ymlFileName} up -d`;

  const result = await promisifiedExecStdErr(cmd);
  res.locals.composeMessage = result;
  return next();
};

// ==========================================================
// Middleware: composeStacks
// Purpose: get a list of all current container networks, based on runnin containers
// ==========================================================
commandController.composeStacks = (req, res, next) => {
  exec('docker network ls --filter "label=com.docker.compose.network" --format "{{json .}},"',
    (error, stdout, stderr) => {
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
        const directoryNameArray = req.body.filePath.split('/');
        const containerNetworkName =
          directoryNameArray[directoryNameArray.length - 1].concat('_default');
        
        parseDockerOutput.forEach((obj) => {
          if (containerNetworkName === obj.Name) {
            obj.FilePath = req.body.filePath;
            obj.YmlFileName = req.body.ymlFileName;
          }
        });
      }
      console.log('parseDockerOutput: ', parseDockerOutput);
      res.locals.output = parseDockerOutput;
      return next();
    }
  );
};

// ==========================================================
// Middleware: composeDown
// Purpose: composes down a container and network
// Note: causes server to shut down because container is not properly
// stopped; button goes away when you leave the page because the 
// file name and location are not in "docker networks" so it gets
// erased from the state
// ==========================================================
commandController.composeDown = async (req, res, next) => {
  console.log(req.body);
  const nativeYmlFilenames = new Set([
    'docker-compose.yml',
    'docker-compose.yaml',
    'compose.yml',
    'compose.yaml',
  ]);

  const cmd = nativeYmlFilenames.has(req.body.ymlFileName) ?
    `cd ${req.body.filePath} && docker-compose down` :
    `cd ${req.body.filePath} && docker-compose -f ${req.body.ymlFileName} down`;

  const result = await promisifiedExecStdErr(cmd);
  res.locals.composeMessage = result;
  return next();
};

// ==========================================================
// Middleware: getAllDockerVolumes
// Purpose: retrieves the list of running volumes
// ==========================================================
commandController.getAllDockerVolumes = (req, res, next) => {
  exec('docker volume ls --format "{{json .}},"',
    (error, stdout, stderr) => {
      if (error) {
        console.log(`getAllDockerVolumes error: ${error.message}`);
        return next(error);
      }
      if (stderr) {
        console.log(`getAllDockerVolumes stderr: ${stderr}`);
        return;
      }

      const dockerOutput = JSON.parse(
        `[${stdout.trim().slice(0, -1).replaceAll(' ', '')}]`
      );
      res.locals.dockerVolumes = dockerOutput;
      return next();
    }
  );
};


// ==========================================================
// Middleware: getVolumeContainers
// Purpose: runs docker ps filtering by volume name to get list of containers running in the specified volume
// ==========================================================
commandController.getVolumeContainers = (req, res, next) => {
  console.log(req.query);
  exec(`docker ps -a --filter volume=${req.query.volumeName} --format "{{json .}},"`, (error, stdout, stderr) => {
    if (error) {
      console.log(`getVolumeContainers error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`getVolumeContainers stderr: ${stderr}`);
      return;
    }
    const dockerOutput = JSON.parse(`[${stdout.trim().slice(0, -1)}]`);
    res.locals.volumeContainers = dockerOutput;
    return next();
  });
};

// ==========================================================
// Middleware: getVolumeContainers
// Purpose: runs docker ps filtering by volume name to get list of containers running in the specified volume
// ==========================================================
commandController.getLogs = (req, res, next) => {

  const containerLogs = {stdout: [], stderr: []};
  const optionsObj = req.body;
  // iterate through containerIds array in optionsObj
  for (let i = 0; i < optionsObj.containerIds.length; i++) {
    // build inputCommandString to get logs from command line
    let inputCommandString = 'docker logs --timestamps ';
    if (optionsObj.since) {
      inputCommandString += `--since ${optionsObj.since} `;
    }
    optionsObj.tail
      ? (inputCommandString += `--tail ${optionsObj.tail} `)
      : (inputCommandString += '--tail 50 ');
    inputCommandString += `${optionsObj.containerIds[i]}`;

    console.log('🚀 ~ file: commandController.js:639 ~ inputCommandString', inputCommandString);
    exec(inputCommandString, (error, stdout, stderr) => {
      if (error) {
        alert('Please enter a valid rfc3339 date, Unix timestamp, or Go duration string.');
        return next(error);
      }
      containerLogs.stdout = [
        ...containerLogs.stdout,
        ...makeArrayOfObjects(stdout, optionsObj.containerIds[i]),
      ];
      containerLogs.stderr = [
        ...containerLogs.stderr,
        ...makeArrayOfObjects(stderr, optionsObj.containerIds[i]),
      ];
      console.log(containerLogs);
      res.locals.logs = containerLogs;
      return next();
    });
  }
  
};
// export controller here
module.exports = commandController;
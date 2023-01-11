/**
 * @module initDatabase Controller
 * @description Contains middleware that creates and runs the local database
 */

const { exec } = require('child_process');
const { cpuUsage, freemem, totalmem, freememPercentage } = require('os-utils');
// const {convert}  = require('/Users/eshaanjoshi/Documents/CodeSmith/Docketeer/src/components/helper/parseContainerFormat.ts');
const commandController =  {};

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
// ==========================================================
// Function: fn
// Purpose: formats our numbers to round to 2 decimal places
// ==========================================================
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
      return;
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
  // logic to remove a container
  console.log('in remove method ');
  console.log(req.body);
  exec(`docker rm ${req.body}`, (error, stdout, stderr) => {
    if (error) {
      console.log(`${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`remove stderr: ${stderr}`);
      return;
    }
    // container deleted move to refreshStopped method
    // res.locals.idRemoved = req.body;
    return next();
  });

};
// export controller here
module.exports = commandController;
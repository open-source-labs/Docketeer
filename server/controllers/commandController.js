/**
 * @module initDatabase Controller
 * @description Contains middleware that creates and runs the local database
 */

const { exec } = require('child_process');

const commandController =  {};

// formats our numbers to round to 2 decimal places
const fn = (num) => {
  return Math.round((num + Number.EPSILON) * 100) / 100;
};

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

module.exports = commandController;
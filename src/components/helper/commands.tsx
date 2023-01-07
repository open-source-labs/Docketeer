/* The below ts-noCheck comment was made because this file has not yet been completely converted to Typescript. 
The below comment removes all Typescript errors. Please remove this line of code to see what needs to be configured for Typescript compliance
*/
// @ts-noCheck

import parseContainerFormat from './parseContainerFormat';
import {
  filterOneProperty,
  listOfVolumeProperties,
} from './volumeHistoryHelper';
import store from '../../renderer/store';
import { makeArrayOfObjects } from './processLogHelper';
import * as child_process from 'child_process';
// import * as util from 'util';
import utilPromisify from 'util.promisify'
/**
 * Grabs all active containers on app-start up
 *
 * @param {*} runningList
 * @param {*} callback
 */


// exec docker 

export const addRunning = (runningList, callback) => {
  window.nodeMethod.runExec(
    'docker stats --no-stream --format "{{json .}},"',
    (error: child_process.ExecException | null, stdout: string, stderr: string) => {
      if (error) {
        alert(`${error.message}`);
        return;
      }
      if (stderr) {
        console.log(`addRunning stderr: ${stderr}`);
        return;
      }
      // trim whitespace at end out stdout, slice to remove trailing comma and remove spaces

      const dockerOutput = `[${stdout
        .trim()
        .slice(0, -1)
        .replaceAll(' ', '')}]`;

      const convertedValue = JSON.parse(dockerOutput);

      const newList = [];

      for (let i = 0; i < convertedValue.length; i++) {
        let isInTheList = false;
        for (const container of runningList) {
          if (container.ID === convertedValue[i].ID) {
            isInTheList = true;
            break;
          }
        }
        isInTheList ? '' : newList.push(convertedValue[i]);
      }
      // console.log('addrunning newlist', newList);
      newList.length ? callback(newList) : '';
    }
  );
};

/**
 * Refreshes running containers
 *
 * @param {*} callback
 * @param {*} runningList
 */

const errorsCalled = {};

const errorCheck = (key, error) => {
  if (!errorsCalled[key]) {
    errorsCalled[key] = error.message;
    alert(`Make sure Docker Desktop is running. \n\n ${error.message}`);
  }
  else {
    console.log(error.message);
  }
  return;
};

// We're using the article's info to promisify the window.nodeMethod.runExec and make it reusable in multiple instances
//this function accepts a shell command (type string) and returns a either a resolved or rejected promise
function promisifiedExec(cmd) {
  return new Promise((resolve, reject) => {
    window.nodeMethod.runExec(cmd, (error, stdout, stderr) => {
      if (error) {
        console.warn(error);
        reject(error)
      }
      resolve(stdout ? stdout : stderr);
    });
  });
}

// applying async/await to each container's fetch request 
const getContainerDetails = async (containerId) => {
  const result = await promisifiedExec(`curl --unix-socket /var/run/docker.sock http://localhost/v1.41/containers/${containerId}/stats\?stream\=false`)
  return result
}

// this makes the refreshRunning function asynchronous so that when refteshRunningContainers callback is invoked
// we have all the data retrived from the original command and the individual container details fetch
const insideRefreshRunning = async () => {
  const apiDataList = [];
  const result = await promisifiedExec('docker stats --no-stream --format "{{json .}},"')
  const dockerOutput = JSON.parse(`[${result
    .trim()
    .slice(0, -1)
    .replaceAll(' ', '')}]`)

  for (let each of dockerOutput) {
    const containerData = await getContainerDetails(each.ID);
    const apiData = JSON.parse(containerData);
    // modify stats to match expected formatting
    // BlockIO:"0B/4.1kB"
    // CPUPerc:"3.03%"
    // Container:"2f02752dde44"
    // ID:"2f02752dde44"
    // MemPerc:"7.91%"
    // MemUsage:"31.64MiB/400MiB"
    // Name:"docketeer-db"
    // NetIO:"690kB/636kB"
    // PIDs:"11"


    const container = {
      ID: apiData.id,
      Name: apiData.name.slice(1),
      CPUPerc: `${((apiData.cpu_stats.cpu_usage.total_usage - apiData.precpu_stats.cpu_usage.total_usage) / (apiData.cpu_stats.system_cpu_usage - apiData.precpu_stats.system_cpu_usage)) * apiData.cpu_stats.online_cpus * 100.0}%`,
      MemPerc: `${((apiData.memory_stats.usage - apiData.memory_stats.stats.inactive_file) / apiData.memory_stats.limit) * 100.0}%`,
      MemUsage: `${(apiData.memory_stats.usage - apiData.memory_stats.stats.inactive_file) / 1000}kB / ${apiData.memory_stats.limit / 1000}kB`,
      NetIO: `${apiData.networks.eth0.rx_bytes / 1000}kB / ${apiData.networks.eth0.tx_bytes / 1000}kB`,
      BlockIO: `${apiData.blkio_stats.io_service_bytes_recursive[0].value / 1000}kB / ${apiData.blkio_stats.io_service_bytes_recursive[1].value / 1000}kB`,
      PIDs: `${apiData.pids_stats.current}`,
    }

    apiDataList.push(container);
  }

  return apiDataList
}

//awaiting all the data and updates the store with the new data
export const refreshRunning = async (refreshRunningContainers) => {
  const apiDataList = await insideRefreshRunning();
  refreshRunningContainers(apiDataList);
};


/**
 * Refreshes stopped containers
 *
 * @param {*} callback
 */
export const refreshStopped = (refreshStoppedContainers) => {
  window.nodeMethod.runExec(
    'docker ps -f "status=exited" --format "{{json .}},"',
    (error: child_process.ExecException | null, stdout: string, stderr: string) => {
      if (error) {
        errorCheck('refreshStopped', error);
        return;
      }
      if (stderr) {
        console.log(`refreshStopped stderr: ${stderr}`);
        return;
      }
      // trim whitespace at end out stdout and slice to remove trailing comma
      const dockerOutput = stdout.trim().slice(0, -1);
      let output = `[${dockerOutput}]`;
      output = JSON.parse(output);
      refreshStoppedContainers(output);
    }
  );
};

/**
 * Refreshes images
 *
 * @param {*} callback
 */
export const refreshImages = (callback) => {
  window.nodeMethod.runExec('docker images', (error: child_process.ExecException | null, stdout: string, stderr: string) => {
    if (error) {
      errorCheck('refreshImages', error);
      return;
    }
    if (stderr) {
      console.log(`refreshImages stderr: ${stderr}`);
      return;
    }
    const value = parseContainerFormat.convert(stdout);
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

    const convertedValue = parseContainerFormat.convertArrToObj(
      resultImages,
      objArray
    );
    callback(convertedValue);
  });
};

/**
 * Removes images
 *
 * @param {*} id
 * @param {*} callback
 */
export const remove = (id, callback) => {
  window.nodeMethod.runExec(`docker rm ${id}`, (error: child_process.ExecException | null, stdout: string, stderr: string) => {
    if (error) {
      alert(`${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`remove stderr: ${stderr}`);
      return;
    }
    callback(id);
  });
};

/**
 * Stops a container on what user selects
 *
 * @param {*} id
 * @param {*} callback
 */
export const stop = (id, callback) => {
  window.nodeMethod.runExec(`docker stop ${id}`, (error: child_process.ExecException | null, stdout: string, stderr: string) => {
    if (error) {
      alert(`${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stop stderr: ${stderr}`);
      return;
    }
    callback(id);
  });
};

/**
 * Starts the container
 *
 * @param {*} id
 * @param {*} callback
 */
export const runStopped = (
  id,
  runStoppedContainerDispatcher,
) => {
  window.nodeMethod.runExec(`docker start ${id}`, (error, stdout, stderr) => {
    if (error) {
      alert(`${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`runStopped stderr: ${stderr}`);
      return;
    }
    runStoppedContainerDispatcher(id);
  });
};

/**
 * Run image
 *
 * @param {*} id
 * @param {*} runningList
 * @param {*} callback_1
 * @param {*} callback_2
 */

// this function is used to run an image from the image tab
export const runIm = (container, runningList, callback_1, callback_2) => {
  // props.runIm(ele['imgid'], props.runningList, helper.addRunning, props.addRunningContainers)
  const { imgid, reps, tag } = container;
  const containerId = Math.floor(Math.random() * 100)
  const filteredRepo = reps
    .replace(/[,\/#!$%\^&\*;:{}=\`~()]/g, ".")
    .replace(/\s{2,}/g, " ");
  window.nodeMethod.runExec(`docker run --name ${filteredRepo}-${tag}_${containerId} ${reps}:${tag}`, (error, stdout, stderr) => {
    if (error) {
      alert(`${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`runIm stderr: ${stderr}`);
      return;
    }
  });
  callback_1(runningList, callback_2);
  alert('Running container');
};

/**
 * Remove Image
 *
 * @param {*} id
 * @param {*} imagesList
 * @param {*} callback_1
 * @param {*} callback_2
 */
export const removeIm = (id, imagesList, callback_1, callback_2) => {
  window.nodeMethod.runExec(`docker rmi -f ${id}`, (error: child_process.ExecException | null, stdout: string, stderr: string) => {
    if (error) {
      alert(
        `${error.message}` +
        '\nPlease stop running container first then remove.'
      );
      return;
    }
    if (stderr) {
      console.log(`removeIm stderr: ${stderr}`);
      return;
    }
    callback_1(callback_2);
  });
};

/**
 * Handles System Prune
 *
 * @param {*} e
 */

export const handlePruneClick = (e) => {
  e.preventDefault();
  window.nodeMethod.runExec(
    'docker system prune --force',
    (error: child_process.ExecException | null, stdout: string, stderr: string) => {
      if (error) {
        alert(`${error.message}`);
        return;
      }
      if (stderr) {
        console.log(`handlePruneClick stderr: ${stderr}`);
        return;
      }
    }
  );
};

/**
 * Pulls image based on the repo you select
 *
 * @param {*} repo
 */

export const pullImage = (repo) => {
  window.nodeMethod.runExec(`docker pull ${repo}`, (error: child_process.ExecException | null, stdout: string, stderr: string) => {
    if (error) {
      alert(
        `Image repo '${repo}' seems to not exist, or may be a private repo.`
      );
      return;
    }
    if (stderr) {
      console.log(`pullImage stderr: ${stderr}`);
      return;
    }

    alert(`${repo} is currently being downloaded`);
    console.log(stdout);
    // if not error, add a loading component until page renders a new component
  });
};

/**
 * Display all containers network based on docker-compose when the application starts
 *
 * @param {*} getNetworkContainers
 */

export const networkContainers = (getNetworkContainers) => {
  window.nodeMethod.runExec(
    'docker network ls --format "{{json .}},"',
    (error: child_process.ExecException | null, stdout: string, stderr: string) => {
      if (error) {
        console.log(`networkContainers error: ${error.message}`);
        return;
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

      getNetworkContainers(networkContainers);
    }
  );
};

export const inspectDockerContainer = (containerId) => {
  window.nodeMethod.runExec(
    `docker inspect ${containerId}`,
    (error: child_process.ExecException | null, stdout: string, stderr: string) => {
      if (error) {
        console.log(`inspectDockerContainer error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.log(`inspectDockerContainer stderr: ${stderr}`);
        return;
      }
      console.log(stdout);
    }
  );
};

/**
 * Compose up a docker container network
 *
 * @param {*} fileLocation
 * @param {*} ymlFileName
 */

export const dockerComposeUp = (fileLocation, ymlFileName) => {
  console.log(fileLocation, ymlFileName);
  return new Promise((resolve, reject) => {
    const nativeYmlFilenames = [
      'docker-compose.yml',
      'docker-compose.yaml',
      'compose.yml',
      'compose.yaml',
    ];
    let cmd = `cd ${fileLocation} && docker compose up -d`;
    // if ymlFilename is not a native yml/yaml file name, add -f flag and non-native filename

    if (!nativeYmlFilenames.includes(ymlFileName)) {
      cmd = `cd ${fileLocation} && docker compose -f ${ymlFileName} up -d`;
    }

    window.nodeMethod.runExec(cmd, (error: child_process.ExecException | null, stdout: string, stderr: string) => {
      if (error) {
        console.warn(error.message);
        return;
      }
      if (stderr) {
        resolve(stderr);
      }
      if (stdout) {
        console.log(stdout);
      }
    });
  });
};

/**
 * Get list of running container networks
 *
 * @param {*} getContainerStacks
 * @param {*} filePath
 * @param {*} ymlFileName
 */

export const dockerComposeStacks = (
  getContainerStacks,
  filePath,
  ymlFileName
) => {
  let parseDockerOutput;

  window.nodeMethod.runExec(
    'docker network ls --filter "label=com.docker.compose.network" --format "{{json .}},"',
    (error: child_process.ExecException | null, stdout: string, stderr: string) => {
      if (error) {
        console.log(`dockerComposeStacks error: ${error.message}`);
        return;
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
      parseDockerOutput = JSON.parse(dockerOutput);

      // if container network was composed through the application, add a filePath and ymlFileName property to its container network object
      if (filePath && ymlFileName) {
        const directoryNameArray = filePath.split('/');
        const containerNetworkName =
          directoryNameArray[directoryNameArray.length - 1].concat('_default');

        parseDockerOutput.forEach((obj) => {
          if (containerNetworkName === obj.Name) {
            obj.FilePath = filePath;
            obj.YmlFileName = ymlFileName;
          }
        });
      }

      getContainerStacks(parseDockerOutput);
    }
  );
};

/**
 * Compose down selected container network
 *
 * @param {*} fileLocation
 * @param {*} ymlFileName
 */

export const dockerComposeDown = (fileLocation, ymlFileName) => {
  return new Promise((resolve, reject) => {
    const nativeYmlFilenames = [
      'docker-compose.yml',
      'docker-compose.yaml',
      'compose.yml',
      'compose.yaml',
    ];
    let cmd = `cd ${fileLocation} && docker-compose down`;
    // if ymlFilename is not a native yml/yaml file name, add -f flag and non-native filename
    if (!nativeYmlFilenames.includes(ymlFileName)) {
      cmd = `cd ${fileLocation} && docker-compose -f ${ymlFileName} down`;
    }

    window.nodeMethod.runExec(cmd, (error: child_process.ExecException | null, stdout: string, stderr: string) => {
      if (error) {
        console.warn(error.message);
        return;
      }

      if (stderr) {
        console.log(stderr);
        resolve(stderr);
      }

      if (stdout) {
        console.log(stdout);
      }
    });
  });
};

/**
 * Writes metric stats into database
 */

export const writeToDb = () => {
  const interval = 300000;
  setInterval(() => {
    const state = store.getState();

    const runningContainers = state.containersList.runningList;

    const stoppedContainers = state.containersList.stoppedList;

    if (!runningContainers.length) return;
    const containerParameters = {};

    // used_memory = memory_stats.usage - memory_stats.stats.cache

    console.log('🚀 ~ file: commands.tsx:551 ~ setInterval ~ state', state)
    console.log('🚀 ~ file: commands.tsx:553 ~ setInterval ~ runningContainers', runningContainers)

    runningContainers.forEach((container) => {
      containerParameters[container.name.slice(1)] = {
        ID: container.id,
        names: container.name.slice(1),
        cpu: `${((container.cpu_stats.cpu_usage.total_usage - container.precpu_stats.cpu_usage.total_usage) / (container.cpu_stats.system_cpu_usage - container.precpu_stats.system_cpu_usage)) * container.cpu_stats.online_cpus * 100.0}%`,
        mem: `${((container.memory_stats.usage - container.memory_stats.stats.inactive_file) / container.memory_stats.limit) * 100.0}%`,
        memuse: `${(container.memory_stats.usage - container.memory_stats.stats.inactive_file) / 1000}kB / ${container.memory_stats.limit / 1000}kB`,
        net: `${container.networks.eth0.rx_bytes / 1000}kB / ${container.networks.eth0.tx_bytes / 1000}kB`,
        block: `${container.blkio_stats.io_service_bytes_recursive[0].value / 1000}kB / ${container.blkio_stats.io_service_bytes_recursive[1].value / 1000}kB`,
        pid: container.pids_stats.current,
        timestamp: 'current_timestamp',
      };
    });
    if (stoppedContainers.length >= 1) {
      stoppedContainers.forEach((container) => {
        containerParameters[container.name.slice(1)] = {
          ID: container.id,
          names: container.name.slice(1),
          cpu: '0.00%',
          mem: '0.00%',
          memuse: '0.00MiB/0.00GiB',
          net: '0.00kB/0.00kB',
          block: '0.00kB/0.00kB',
          pid: '0',
          timestamp: 'current_timestamp',
        };
      });
    }
    fetch('http://localhost:3000/init/addMetrics', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        containers: containerParameters,
      }),
    }).catch((err) => {
      console.log(err);
    });
  }, interval);
};

export const setDbSessionTimeZone = () => {
  const currentTime = new Date();
  const offsetTimeZoneInHours = currentTime.getTimezoneOffset() / 60;

  fetch('http://localhost:3000/init/timezone', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      timezone: offsetTimeZoneInHours,
    }),
  })
    .then((data) => data.json())
    .then((response) => {
      return;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getContainerGitUrl = async (container) => {
  const response = await fetch('http://localhost:3000/init/github', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      githubUrl: container,
    }),
  });
  return await response.json();
};

/**
 * Docker command to retrieve the list of running volumes
 *
 * @param {*} getVolumeList
 */


export const getAllDockerVolumes = (getVolumeList) => {
  window.nodeMethod.runExec(
    'docker volume ls --format "{{json .}},"',
    (error: child_process.ExecException | null, stdout: string, stderr: string) => {
      if (error) {
        console.log(`getAllDockerVolumes error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.log(`getAllDockerVolumes stderr: ${stderr}`);
        return;
      }

      const dockerOutput = JSON.parse(
        `[${stdout.trim().slice(0, -1).replaceAll(' ', '')}]`
      );

      return getVolumeList(filterOneProperty(dockerOutput, 'Name'));
    }
  );
};

/**
 * Docker command to retrieve the list of containers running in specified volume
 *
 * @param {string} volumeName
 * @param {callback} getVolumeContainersList
 */

export const getVolumeContainers = (volumeName, getVolumeContainersList) => {
  window.nodeMethod.runExec(
    `docker ps -a --filter volume=${volumeName} --format "{{json .}},"`,
    (error: child_process.ExecException | null, stdout: string, stderr: string) => {
      if (error) {
        console.log(`getVolumeContainers error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.log(`getVolumeContainers stderr: ${stderr}`);
        return;
      }
      const dockerOutput = JSON.parse(`[${stdout.trim().slice(0, -1)}]`);

      return getVolumeContainersList(
        listOfVolumeProperties(volumeName, dockerOutput)
      );
    }
  );
};

/**
 * Builds and child_process.executes a docker logs command to generate logs
 *
 * @param {callback} getContainerLogs
 * @param {object} optionsObj
 * @returns {object} containerLogs
 */

export const getLogs = async (optionsObj, getContainerLogsDispatcher) => {
  const containerLogs = { stdout: [], stderr: [] };

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

    window.nodeMethod.runExec(inputCommandString, (error: child_process.ExecException | null, stdout: string, stderr: string) => {
      if (error) {
        alert(`Please enter a valid rfc3339 date, Unix timestamp, or Go duration string.`);
        console.error(`exec error: ${error}`);
        return;
      }
      containerLogs.stdout = [
        ...containerLogs.stdout,
        ...makeArrayOfObjects(stdout, optionsObj.containerIds[i]),
      ];
      containerLogs.stderr = [
        ...containerLogs.stderr,
        ...makeArrayOfObjects(stderr, optionsObj.containerIds[i]),
      ];
    });
  }
  return containerLogs;
};

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

/**
 * Grabs all active containers on app-start up
 *
 * @param {*} runningList
 * @param {*} callback
 */


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
  else{
    console.log(error.message);
  }
  return;
};

export const refreshRunning = (refreshRunningContainers) => {
  window.nodeMethod.runExec(
    'docker stats --no-stream --format "{{json .}},"',
    (error: child_process.ExecException | null, stdout: string, stderr: string) => {
      if (error) {
        errorCheck('refreshRunning', error);
        return;
      }
      if (stderr) {
        console.log(`refreshRunning stderr: ${stderr}`);
        return;
      }

      const dockerOutput = `[${stdout
        .trim()
        .slice(0, -1)
        .replaceAll(' ', '')}]`;
      const convertedValue = JSON.parse(dockerOutput);
      refreshRunningContainers(convertedValue);
    }
  );
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

    runningContainers.forEach((container) => {
      containerParameters[container.Name] = {
        ID: container.ID,
        names: container.Name,
        cpu: container.CPUPerc,
        mem: container.MemPerc,
        memuse: container.MemUsage,
        net: container.NetIO,
        block: container.BlockIO,
        pid: container.PIDs,
        timestamp: 'current_timestamp',
      };
    });
    if (stoppedContainers.length >= 1) {
      stoppedContainers.forEach((container) => {
        containerParameters[container.Names] = {
          ID: container.ID,
          names: container.Names,
          cpu: '0.00%',
          mem: '0.00%',
          memuse: '00.0MiB/0.00GiB',
          net: '0.00kB/0.00kB',
          block: '00.0MB/00.0MB',
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

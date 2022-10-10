// import { exec } from 'child_process';
import query from '../../../server/models/psqlQuery';
import parseContainerFormat from './parseContainerFormat';
import {
  filterOneProperty,
  listOfVolumeProperties
} from './volumeHistoryHelper';
import store from '../../renderer/store';
import { makeArrayOfObjects } from './processLogHelper';

/**
 * Grabs all active containers on app-start up
 *
 * @param {*} runningList
 * @param {*} callback
 */

export const addRunning = (runningList, callback) => {
  window.childProcess.runExec(
    'docker stats --no-stream --format "{{json .}},"',
    (error, stdout, stderr) => {
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
          if (container.cid === convertedValue[i].cid) {
            isInTheList = true;
            break;
          }
        }
        isInTheList ? '' : newList.push(convertedValue[i]);
      }
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
export const refreshRunning = (refreshRunningContainers) => {
  window.childProcess.runExec(
    'docker stats --no-stream --format "{{json .}},"',
    (error, stdout, stderr) => {
      if (error) {
        alert(`${error.message}`);
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
  window.childProcess.runExec(
    'docker ps -f "status=exited" --format "{{json .}},"',
    (error, stdout, stderr) => {
      if (error) {
        alert(`${error.message}`);
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
  window.childProcess.runExec('docker images', (error, stdout, stderr) => {
    if (error) {
      alert(`${error.message}`);
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
  window.childProcess.runExec('docker images', (error, stdout, stderr) => {
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
  window.childProcess.runExec(`docker stop ${id}`, (error, stdout, stderr) => {
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
  refreshRunningContainers
) => {
  window.childProcess.runExec(`docker start ${id}`, (error, stdout, stderr) => {
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

export const runIm = (id, runningList, callback_1, callback_2) => {
  // props.runIm(ele['imgid'], props.runningList, helper.addRunning, props.addRunningContainers)
  window.childProcess.runExec(`docker run ${id}`, (error, stdout, stderr) => {
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
  window.childProcess.runExec(
    `docker rmi -f ${id}`,
    (error, stdout, stderr) => {
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
    }
  );
};

/**
 * Handles System Prune
 *
 * @param {*} e
 */

export const handlePruneClick = (e) => {
  e.preventDefault();
  window.childProcess.runExec(
    'docker system prune --force',
    (error, stdout, stderr) => {
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
  window.childProcess.runExec(
    `docker pull ${repo}`,
    (error, stdout, stderr) => {
      if (error) {
        alert(`${error.message}`);
        return;
      }
      if (stderr) {
        console.log(`pullImage stderr: ${stderr}`);
        return;
      }
    }
  );
};

/**
 * Display all containers network based on docker-compose when the application starts
 *
 * @param {*} getNetworkContainers
 */

export const networkContainers = (getNetworkContainers) => {
  window.childProcess.runExec(
    'docker network ls --format "{{json .}},"',
    (error, stdout, stderr) => {
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
  window.childProcess.runExec(
    `docker inspect ${containerId}`,
    (error, stdout, stderr) => {
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
  return new Promise((resolve, reject) => {
    const nativeYmlFilenames = [
      'docker-compose.yml',
      'docker-compose.yaml',
      'compose.yml',
      'compose.yaml'
    ];
    let cmd = `cd ${fileLocation} && docker-compose up -d`;
    // if ymlFilename is not a native yml/yaml file name, add -f flag and non-native filename
    if (!nativeYmlFilenames.includes(ymlFileName)) {
      cmd = `cd ${fileLocation} && docker-compose -f ${ymlFileName} up -d`;
    }

    window.childProcess.runExec(cmd, (error, stdout, stderr) => {
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

  window.childProcess.runExec(
    'docker network ls --filter "label=com.docker.compose.network" --format "{{json .}},"',
    (error, stdout, stderr) => {
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
      'compose.yaml'
    ];
    let cmd = `cd ${fileLocation} && docker-compose down`;
    // if ymlFilename is not a native yml/yaml file name, add -f flag and non-native filename
    if (!nativeYmlFilenames.includes(ymlFileName)) {
      cmd = `cd ${fileLocation} && docker-compose -f ${ymlFileName} down`;
    }

    window.childProcess.runExec(cmd, (error, stdout, stderr) => {
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

    let dbQuery =
      'insert into metrics (container_id, container_name, cpu_pct, memory_pct, memory_usage, net_io, block_io, pid, created_at) values ';
    runningContainers.forEach((container, idx) => {
      // No need to worry about sql injections as it would be self sabotaging!
      const string = `('${container.ID}', 
        '${container.Name}', 
        '${container.CPUPerc}', 
        '${container.MemPerc}', 
        '${container.MemUsage}', 
        '${container.NetIO}', 
        '${container.BlockIO}', 
        '${container.PIDs}', 
        current_timestamp)`;

      if (
        idx === runningContainers.length - 1 &&
        stoppedContainers.length === 0
      )
        dbQuery += string;
      else dbQuery += string + ', ';
    });
    stoppedContainers.forEach((container, idx) => {
      const string = `('${container.ID}', 
        '${container.Names}', 
        '0.00%',
        '0.00%',
        '00.0MiB/0.00GiB',
        '0.00kB/0.00kB',
        '00.0MB/00.0MB',
        '0',
        current_timestamp)`;

      if (idx === stoppedContainers.length - 1) dbQuery += string;
      else dbQuery += string + ', ';
    });
    // query(dbQuery);
  }, interval);
};

export const setDbSessionTimeZone = () => {
  const currentTime = new Date();
  const offsetTimeZoneInHours = currentTime.getTimezoneOffset() / 60;
  // query(`set time zone ${offsetTimeZoneInHours}`);
};

export const getContainerGitUrl = (container) => {
  // return query(`Select github_url from containers where name = '${container}'`);
};

/**
 * Docker command to retrieve the list of running volumes
 *
 * @param {*} getVolumeList
 */

export const getAllDockerVolumes = (getVolumeList) => {
  window.childProcess.runExec(
    'docker volume ls --format "{{json .}},"',
    (error, stdout, stderr) => {
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
  window.childProcess.runExec(
    `docker ps -a --filter volume=${volumeName} --format "{{json .}},"`,
    (error, stdout, stderr) => {
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
 * Builds and executes a docker logs command to generate logs
 *
 * @param {callback} getContainerLogs
 * @param {object} optionsObj
 * @returns {object} containerLogs
 */

export const getLogs = (optionsObj, getContainerLogsDispatcher) => {
  // build inputCommandString to get logs from command line
  let inputCommandString = 'docker logs --timestamps ';
  if (optionsObj.since) {
    inputCommandString += `--since ${optionsObj.since} `;
  }
  optionsObj.tail
    ? (inputCommandString += `--tail ${optionsObj.tail} `)
    : (inputCommandString += '--tail 50 ');
  inputCommandString += `${optionsObj.containerId}`;

  const containerLogs = { stdout: [], stderr: [] };

  window.childProcess.runExec(inputCommandString, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    containerLogs.stdout = makeArrayOfObjects(stdout);
    containerLogs.stderr = makeArrayOfObjects(stderr);
  });
  return containerLogs;
};

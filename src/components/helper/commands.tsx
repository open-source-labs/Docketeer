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
import { PostAdd } from '@mui/icons-material';
import { removeContainer } from '../../redux/actions/actions';

/**
 * Grabs all active containers on app-start up
 *
 * @param {*} runningList
 * @param {*} callback
 */


export const getHostStats = (refreshHostData) => {
  fetch('http://localhost:3000/command/getHost')
    .then((res) => res.json())
    .then((data) => {
      refreshHostData(data);
    })
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


// moved existing "command" functions to backend '/command' 
export const refreshRunning = (refreshRunningContainers) => {
  fetch('http://localhost:3000/command/refreshRunning')
    .then((data) => data.json())
    .then((runningContainers) => {
      refreshRunningContainers(runningContainers);
    });
};


/**
 * Refreshes stopped containers
 *
 * @param {*} callback
 */
export const refreshStopped = (refreshStoppedContainers) => {
  fetch('http://localhost:3000/command/refreshStopped')
    .then((data) => data.json())
    .then((stoppedContainers) => {
      refreshStoppedContainers(stoppedContainers)
    })
};

/**
 * Refreshes images
 *
 * @param {*} callback
 */
export const refreshImages = (refreshImagesList) => {
  fetch('http://localhost:3000/command/refreshImages')
    .then((data) => data.json())
    .then((imagesList) => {
      refreshImagesList(imagesList)
    })
};

/**
 * Removes stopped containers
 *
 * @param {*} id
 * @param {*} callback
 */
export const remove = (containerID, removeContainer) => {
  fetch(`http://localhost:3000/command/removeContainer?id=${containerID}`)
    .then((message) => message.json())
    .then((message) => {
        console.log({message})
        removeContainer(containerID)
     })
};

/**
 * Stops a container on what user selects
 *
 * @param {*} id
 * @param {*} refreshStoppedContainers
 */
export const stop = (id, refreshStoppedContainers) => {
  fetch(`http://localhost:3000/command/stopContainer?id=${id}`)
    .then((message) => message.json())
    .then((message) => {
      console.log({message})
      refreshStoppedContainers(id)
    })

  // THE BELOW CODE RUNS KINDA FAST
  // window.nodeMethod.runExec(`docker stop ${id}`, (error: child_process.ExecException | null, stdout: string, stderr: string) => {
  //   if (error) {
  //     alert(`${error.message}`);
  //     return;
  //   }
  //   if (stderr) {
  //     console.log(`stop stderr: ${stderr}`);
  //     return;
  //   }
  //   callback(id);
  // });
};

/**
 * Starts a stopped container in containers tab
 *
 * @param {*} id
 * @param {*} callback
 */
export const runStopped = (id, runStoppedContainerDispatcher) => {
  console.log('inside runStopped')
  fetch(`http://localhost:3000/command/runStopped?id=${id}`)
    .then((message) => message.json())
    .then((message) => {
      console.log({message})
      runStoppedContainerDispatcher(id)
    })
  // window.nodeMethod.runExec(`docker start ${id}`, (error, stdout, stderr) => {
  //   if (error) {
  //     alert(`${error.message}`);
  //     return;
  //   }
  //   if (stderr) {
  //     console.log(`runStopped stderr: ${stderr}`);
  //     return;
  //   }
  //   runStoppedContainerDispatcher(id);
  // });
};

/**
 * Runs an image from the pulled images list in image tab
 *
 * @param {*} id
 * @param {*} runningList
 * @param {*} callback_1
 * @param {*} callback_2
 */
export const runIm = (container, refreshRunningContainers) => {
  fetch('http://localhost:3000/command/runImage', {method: 'post', headers: {
    'Content-Type': 'application/json'
  }, body: JSON.stringify(container)})
    .then((data) => data.json())
    .then((newRunningList) => {
      refreshRunningContainers(newRunningList)
    })
  alert('Running container');
};

/**
 * Removes an image from pulled images list in image tab
 *
 * @param {*} id
 * @param {*} imagesList
 * @param {*} refreshImages
 * @param {*} refreshImagesList
 */
export const removeIm = (id, imagesList, refreshImages, refreshImagesList) => {
  // fetch request to removeImage route passing param of id
  // console.log('inside removeIm')
  // this will exec the docker rmi -f {id} command
  // after successfully executing, function will then invoke callback1, passing in the dispatch function, refreshImagesList
  // refreshImages callback is actually the refreshImages command defined above
  
  fetch(`http://localhost:3000/command/removeImage?id=${id}`)
    .then(() => {
      refreshImages(refreshImagesList)
  })
  // window.nodeMethod.runExec(`docker rmi -f ${id}`, (error: child_process.ExecException | null, stdout: string, stderr: string) => {
  //   if (error) {
  //     alert(
  //       `${error.message}` +
  //       '\nPlease stop running container first then remove.'
  //     );
  //     return;
  //   }
  //   if (stderr) {
  //     console.log(`removeIm stderr: ${stderr}`);
  //     return;
  //   }
  //   callback_1(refreshImagesList);
  // });
};

/**
 * Handles System Prune
 *
 * @param {*} e
 */

export const handlePruneClick = (e) => {
  // fetch(`http://localhost:3000/command/dockerPrune`)
  //   .then((message) => message.json())
  //   .then((message) => {
  //     console.log({message})
  //   })
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
  // fetch(`http://localhost:3000/command/pullImage?repo=${repo}`)
  //   .then((message) => message.json())
  //   .then((message) => {
  //     console.log({message})
  //   })
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
  const interval = 150000;
  setInterval(() => {
    const state = store.getState();

    const runningContainers = state.containersList.runningList;

    const stoppedContainers = state.containersList.stoppedList;
    
    if (!runningContainers.length) return;
    const containerParameters = {};
    
    // used_memory = memory_stats.usage - memory_stats.stats.cache

    runningContainers.forEach((container) => {
      containerParameters[container.Name] = {
        ID: container.ID,
        names: container.Name,
        Image: container.Image,
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
          memuse: '0.00MiB/0.00MiB',
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
  console.log("🚀 ~ file: commands.tsx:644 ~ setDbSessionTimeZone ~ offsetTimeZoneInHours", offsetTimeZoneInHours)
  console.log('in setDbSessionTimeZone');
  

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

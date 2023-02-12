/* The below ts-noCheck comment was made because this file has not yet been completely converted to Typescript.
The below comment removes all Typescript errors. Please remove this line of code to see what needs to be configured for Typescript compliance
*/
// @ts-noCheck

import {
  filterOneProperty,
  listOfVolumeProperties,
} from "./volumeHistoryHelper";
import store from "../../renderer/store";

/**
 * Grabs all active containers on app-start up
 * @param {*} refreshHostData
 */

export const getHostStats = (refreshHostData) => {
  fetch("http://localhost:3000/command/getHost")
    .then((res) => res.json())
    .then((data) => {
      refreshHostData(data);
    })
    .catch((err) => console.log(err));
};

/**
 * Refreshes running containers
 * @param {*} refreshRunningContainers
 */

export const refreshRunning = (refreshRunningContainers) => {
  fetch("http://localhost:3000/command/refreshRunning")
    .then((data) => data.json())
    .then((runningContainers) => {
      refreshRunningContainers(runningContainers);
    })
    .catch((err) => console.log(err));
};

/**
 * Refreshes stopped containers
 * @param {*} refreshStoppedContainers
 */
export const refreshStopped = (refreshStoppedContainers) => {
  fetch("http://localhost:3000/command/refreshStopped")
    .then((data) => data.json())
    .then((stoppedContainers) => {
      refreshStoppedContainers(stoppedContainers);
    })
    .catch((err) => console.log(err));
};

/**
 * Refreshes images
 * @param {*} refreshImagesList
 */
export const refreshImages = (refreshImagesList) => {
  fetch("http://localhost:3000/command/refreshImages")
    .then((data) => data.json())
    .then((imagesList) => {
      refreshImagesList(imagesList);
    })
    .catch((err) => console.log(err));
};

/**
 * Removes stopped containers
 * @param {*} containerID
 * @param {*} removeContainer
 */
export const remove = (containerID, removeContainer) => {
  fetch(`http://localhost:3000/command/removeContainer?id=${containerID}`)
    .then((message) => message.json())
    .then((message) => {
      console.log({ message });
      removeContainer(containerID);
    })
    .catch((err) => console.log(err));
};

/**
 * Stops a container on what user selects
 * @param {*} id
 * @param {*} refreshStoppedContainers
 */
export const stop = (id, refreshStoppedContainers) => {
  fetch(`http://localhost:3000/command/stopContainer?id=${id}`)
    .then((message) => message.json())
    .then((message) => {
      console.log({ message });
      refreshStoppedContainers(id);
    })
    .catch((err) => console.log(err));
};

/**
 * Starts a stopped container in containers tab
 * @param {*} id
 * @param {*} runStoppedContainerDispatcher
 */
export const runStopped = (id, runStoppedContainerDispatcher) => {
  fetch(`http://localhost:3000/command/runStopped?id=${id}`)
    .then((message) => message.json())
    .then((message) => {
      console.log({ message });
      runStoppedContainerDispatcher(id);
    })
    .catch((err) => console.log(err));
};

/**
 * Runs an image from the pulled images list in image tab
 * @param {*} container
 * @param {*} refreshRunningContainers
 */
export const runIm = (container, refreshRunningContainers) => {
  fetch("http://localhost:3000/command/runImage", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(container),
  })
    .then((data) => data.json())
    .then((newRunningList) => {
      refreshRunningContainers(newRunningList);
    })
    .catch((err) => console.log(err));
  alert("Running container.");
};

/**
 * Removes an image from pulled images list in image tab
 * @param {*} id
 * @param {*} refreshImages
 * @param {*} refreshImagesList
 */
export const removeIm = (id, refreshImages, refreshImagesList) => {
  fetch(`http://localhost:3000/command/removeImage?id=${id}`).then(() => {
    refreshImages(refreshImagesList).catch((err) => console.log(err));
  });
};

/**
 * Handles System Prune
 * @param {*} e
 */
export const handlePruneClick = (e) => {
  e.preventDefault();
  fetch("http://localhost:3000/command/dockerPrune")
    .then((message) => message.json())
    .then((message) => {
      console.log({ message });
    })
    .catch((err) => console.log(err));
};

/**
 * Pulls image based on the repo you select
 * @param {*} repo
 */
export const pullImage = (repo) => {
  fetch(`http://localhost:3000/command/pullImage?repo=${repo}`)
    .then((message) => message.json())
    .then((message) => {
      console.log({ message });
    })
    .catch((err) => console.log(err));
};

/**
 * Display all containers network based on docker-compose when the application starts
 * @param {*} getNetworkContainers
 */
export const networkContainers = (getNetworkContainers) => {
  fetch("http://localhost:3000/command/networkContainers")
    .then((data) => data.json())
    .then((networkContainers) => {
      getNetworkContainers(networkContainers);
    })
    .catch((err) => console.log(err));
};

/**
 * Inspects a specific containers
 * @param {*} containerId
 */
export const inspectDockerContainer = (containerId) => {
  fetch(`http://localhost:3000/command/inspect?id=${containerId}`)
    .then((data) => data.json())
    .then((data) => {
      console.log(data);
    })
    .catch((err) => console.log(err));
};

/**
 * Compose up a docker container network
 * @param {*} getContainerStacks
 * @param {*} filePath
 * @param {*} ymlFileName
 */
export const dockerComposeUp = (getContainerStacks, filePath, ymlFileName) => {
  fetch("http://localhost:3000/command/composeUp", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ filePath: filePath, ymlFileName: ymlFileName }),
  })
    .then((data) => data.json())
    .then((dockerOutput) => {
      getContainerStacks(dockerOutput);
    })
    .catch((err) => console.log(err));
};

/**
 * Get list of running container networks
 * @param {*} getContainerStacks
 */
export const dockerComposeStacks = (getContainerStacks) => {
  fetch("http://localhost:3000/command/composeStacks")
    .then((data) => data.json())
    .then((dockerOutput) => {
      getContainerStacks(dockerOutput);
    })
    .catch((err) => console.log(err));
};

/**
 * Compose down selected container network
 * @param {*} filePath
 * @param {*} ymlFileName
 */
export const dockerComposeDown = (
  getContainerStacks,
  filePath,
  ymlFileName
) => {
  fetch("http://localhost:3000/command/composeDown", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ filePath: filePath, ymlFileName: ymlFileName }),
  })
    .then((data) => data.json())
    .then((dockerOutput) => {
      getContainerStacks(dockerOutput);
    })
    .catch((err) => console.log(err));
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
        timestamp: "current_timestamp",
      };
    });
    if (stoppedContainers.length >= 1) {
      stoppedContainers.forEach((container) => {
        containerParameters[container.Names] = {
          ID: container.ID,
          names: container.Names,
          cpu: "0.00%",
          mem: "0.00%",
          memuse: "0.00MiB/0.00MiB",
          net: "0.00kB/0.00kB",
          block: "0.00kB/0.00kB",
          pid: "0",
          timestamp: "current_timestamp",
        };
      });
    }
    fetch("http://localhost:3000/init/addMetrics", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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

  fetch("http://localhost:3000/init/timezone", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
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
  const response = await fetch("http://localhost:3000/init/github", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      githubUrl: container,
    }),
  });
  return await response.json();
};

/**
 * Docker command to retrieve the list of running volumes
 * @param {*} getVolumeList
 */
export const getAllDockerVolumes = (getVolumeList) => {
  fetch("http://localhost:3000/command/allDockerVolumes")
    .then((volumes) => volumes.json())
    .then((dockerVolumes) => {
      return getVolumeList(filterOneProperty(dockerVolumes, "Name"));
    })
    .catch((err) => {
      console.log(err);
    });
};

/**
 * Docker command to retrieve the list of containers running in specified volume
 * @param {string} volumeName
 * @param {callback} getVolumeContainersList
 */
export const getVolumeContainers = (volumeName, getVolumeContainersList) => {
  fetch(
    `http://localhost:3000/command/volumeContainers?volumeName=${volumeName}`
  )
    .then((data) => data.json())
    .then((volumeContainers) => {
      return getVolumeContainersList(
        listOfVolumeProperties(volumeName, volumeContainers)
      );
    })
    .catch((err) => {
      console.log(err);
    });
};

/**
 * Builds and child_process.executes a docker logs command to generate logs
 * @param {callback} getContainerLogs
 * @param {object} optionsObj
 * @returns {object} containerLogs
 */
export const getLogs = async (optionsObj, getContainerLogsDispatcher) => {
  try {
    const response = await fetch("http://localhost:3000/command/allLogs", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(optionsObj),
    });
    return await response.json();
  } catch {
    console.log(err);
  }
};

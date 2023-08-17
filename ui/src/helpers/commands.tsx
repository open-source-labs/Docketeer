// @ts-noCheck
import {
  filterOneProperty,
  listOfVolumeProperties,
} from './volumeHistoryHelper';
import { useMemo } from 'react';
import useSurvey from './dispatch';
import { useAppSelector } from '../reducers/hooks';

/**
 * @module | commands.tsx
 * @description | Organizes all server-communication throughout client-side into a single custom hook exportable into individual components
 **/

const useHelper = () => {
  const dispatch = useSurvey();

  const state = useAppSelector((state) => state);

  const actions = useMemo(
    () => ({
      /* funcs to help w/ creating new users */
      createNewUser(username: string, password: string) {
        fetch('/api/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: username,
            password: password,
          }),
        })
          .then(() => {
            actions.getUpdatedUserList();
          })
          .catch((err) => {
            console.log(err);
          });
      },
      checkCookie(): Promise<string> {
        return fetch('/api/login/checkCookie', {
          method: 'GET',
        })
          .then((res) => res.json())
          .then((data) => {
            return data;
          })
          .catch((error) => {
            console.log('error when fetching cookie', error);
          });
      },
      getUid(apiKey: string, dashboard: string): Promise<string> {
        return fetch('/api/gapi/uidkey', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            key: apiKey,
            dashboard: dashboard,
          }),
        })
          .then((res) => {
            console.log('Response received:', res); // Log the response object
            return res.json();
          })
          .then((data) => {
            return data;
          })
          .catch((error) => {
            console.log('Error when fetching uid key', error);
          });
      },
      getKey(): Promise<string> {
        return fetch('/api/gapi/key', {
          method: 'GET',
        })
          .then((res) => res.json())
          .then((data) => {
            return data;
          })
          .catch((error) => {
            console.log('Error when fetching api key', error);
          });
      },

      /* Refreshes running containers */
      refreshRunning() {
        const { refreshRunningContainers } = dispatch;
        fetch('/api/command/refreshRunning')
          .then((data: Response) => data.json())
          .then((runningContainers) => {
            refreshRunningContainers(runningContainers);
          })
          .catch((err: Error): void => console.log(err));
      },
      /* Refreshes stopped containers */
      refreshStopped() {
        const { refreshStoppedContainers } = dispatch;
        fetch('/api/command/refreshStopped')
          .then((data: Response) => data.json())
          .then((stoppedContainers) => {
            refreshStoppedContainers(stoppedContainers);
          })
          .catch((err: Error): void => console.log(err));
      },
      /* Refreshes images */
      refreshImages() {
        const { refreshImagesList } = dispatch;
        fetch('/api/command/refreshImages')
          .then((data: Response) => data.json())
          .then((imagesList) => {
            refreshImagesList(imagesList);
          })
          .catch((err: Error): void => console.log(err));
      },
      /* Refreshes networkContainerList[state in networkReducer] */
      refreshNetwork() {
        const { refreshNetworkList } = dispatch;
        fetch('/api/command/networkListContainers')
          .then((data: Response) => data.json())
          .then((networkList) => {
            refreshNetworkList(networkList);
          })
          .catch((err: Error): void => console.log(err));
      },
      /* Removes stopped containers @param {*} containerID */
      remove(containerID: string) {
        const { removeContainer } = dispatch;
        fetch(`/api/command/removeContainer?id=${containerID}`, {
          method: 'DELETE',
        })
          .then((message) => {
            if (message.status === 401) {
              window.alert('Invalid permissions');
              throw new Error(message);
            } else {
              return message.json();
            }
          })
          .then((message) => {
            console.log({ message });
            removeContainer(containerID);
          })
          .catch((err) => console.log(err));
      },
      /* Stops a container on what user selects @param {*} id */
      stop(id) {
        const { stopRunningContainer } = dispatch;
        fetch(`/api/command/stopContainer?id=${id}`, {
          method: 'DELETE',
        })
          .then((message) => {
            if (message.status === 401) {
              window.alert('Invalid permissions');
              throw new Error(message);
            } else {
              return message.json();
            }
          })
          .then((message) => {
            console.log({ message });
            stopRunningContainer(id);
          })
          .catch((err: Error): void => console.log(err));
      },
      /* Starts a stopped container in containers tab @param {*} id */
      runStopped(id: string) {
        const { runStoppedContainer } = dispatch;
        fetch(`/api/command/runStopped?id=${id}`)
          .then((message) => {
            if (message.status === 401) {
              window.alert('Invalid permissions');
              throw new Error(message);
            } else {
              return message.json();
            }
          })
          .then((message) => {
            console.log({ message });
            runStoppedContainer(id);
          })
          .catch((err: Error): void => console.log(err));
      },
      /* Runs an image from the pulled images list in image tab @param {*} container */
      runIm(container) {
        const { refreshRunningContainers } = dispatch;
        fetch('/api/command/runImage', {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(container),
        })
          .then((message) => {
            if (message.status === 401) {
              window.alert('Invalid permissions');
              throw new Error(message);
            } else {
              return message.json();
            }
          })
          .then((newRunningList) => {
            // With the deletion of getApiData from /runImage endpoint — the client is now given res.locals.containers rather than res.locals.apiData — ensure that this is fine anywhere where runningList is extracted from the containerReducer
            refreshRunningContainers(newRunningList);
          })
          .catch((err: Error): void => console.log(err));
      },
      /* Removes an image from pulled images list in image tab @param {*} id */

      removeIm(id) {
        const { refreshImages } = dispatch;
        fetch(`/api/command/removeImage?id=${id}`, {
          method: 'DELETE',
        })
          .then((message) => {
            if (message.status === 401) {
              window.alert('Invalid permissions');
              throw new Error(message);
            }
          })
          .then(() => {
            refreshImages().catch((err: Error): void => console.log(err));
          });
      },
      /* Handles System Prune @param {*} e */
      handlePruneClick(e) {
        e.preventDefault();
        fetch('/api/command/dockerPrune', {
          method: 'DELETE',
        })
          .then((message) => {
            if (message.status === 401) {
              window.alert('Invalid permissions');
              throw new Error(message);
            }
          })
          .catch((err: Error): void => console.log(err));
      },

      /* Handles Network Prune @param {*} e */
      handleNetworkPruneClick(e) {
        e.preventDefault();
        fetch('/api/command/dockerNetworkPrune', {
          method: 'DELETE',
        })
          .then((message) => {
            if (message.status === 401) {
              window.alert('Invalid permissions');
              throw new Error(message);
            }
          })
          .catch((err: Error): void => console.log(err));
      },
      
      /* Pulls image based on the repo you select @param {*} repo */
      pullImage(repo) {
        fetch(`/api/command/pullImage?repo=${repo}`)
          .then((message) => {
            if (message.status === 401) {
              window.alert('Invalid permissions');
              throw new Error(message);
            } else {
              return message.json();
            }
          })
          .then((message) => {
            console.log({ message });
          })
          .catch((err: Error): void => console.log(err));
      },
      /* Display all containers network based on docker-compose when the application starts */
      networkContainers() {
        // Pass in container that button is clicked on
        const { getNetworkContainers } = dispatch;
        fetch('/api/command/networkContainers')
          .then((data: Response) => data.json())
          .then((networkContainers) => {
            // grab the name of the network only using map method
            networkContainers = networkContainers.map((el) => el.Name);
            getNetworkContainers(networkContainers); // use passed in container to
          })
          .catch((err: Error): void => console.log(err));
      },
      /* Compose up a docker container network @param {*} filePath @param {*} ymlFileName */
      dockerComposeUp(filePath, ymlFileName) {
        const { getContainerStacks } = dispatch;
        fetch('/api/command/composeUp', {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            filePath: filePath,
            ymlFileName: ymlFileName,
          }),
        })
          .then((message) => {
            if (message.status === 401) {
              window.alert('Invalid permissions');
              throw new Error(message);
            } else {
              return message.json();
            }
          })
          .then((dockerOutput) => {
            getContainerStacks(dockerOutput);
          })
          .catch((err: Error): void => console.log(err));
      },
      /* Get list of running container networks */
      dockerComposeStacks() {
        const { getContainerStacks } = dispatch;
        fetch('/api/command/composeStacks')
          .then((data: Response) => data.json())
          .then((dockerOutput) => {
            getContainerStacks(dockerOutput);
          })
          .catch((err: Error): void => console.log(err));
      },
      /* Compose down selected container network @param {*} filePath @param {*} ymlFileName */
      dockerComposeDown(filePath, ymlFileName) {
        const { getContainerStacks } = dispatch;
        fetch('/api/command/composeDown', {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            filePath: filePath,
            ymlFileName: ymlFileName,
          }),
        })
          .then((message) => {
            if (message.status === 401) {
              window.alert('Invalid permissions');
              throw new Error(message);
            } else {
              return message.json();
            }
          })
          .then((dockerOutput) => {
            getContainerStacks(dockerOutput);
          })
          .catch((err: Error): void => console.log(err));
      },
      /* Writes metric stats into database */
      writeToDb() {
        const interval = 150000;
        setInterval(() => {
          const runningContainers = state.containers.runningList;

          const stoppedContainers = state.containers.stoppedList;

          if (!runningContainers.length) return;
          const containerParameters: object = {};

          runningContainers.forEach((container: RunningListType) => {
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
          fetch('/api/init/addMetrics', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              containers: (object = containerParameters),
            }),
          }).catch((err: Error): void => {
            console.log(err);
          });
        }, interval);
      },
      setDbSessionTimeZone() {
        const currentTime = new Date();
        const offsetTimeZoneInHours = currentTime.getTimezoneOffset() / 60;

        fetch('/api/init/timezone', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            timezone: offsetTimeZoneInHours,
          }),
        })
          .then((data: Response) => data.json())
          .then((response) => {
            console.log(response);
            return;
          })
          .catch((err: Error): void => {
            console.log(err);
          });
      },
      async getContainerGitUrl(container) {
        const response: Response = await fetch('/api/init/github', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            githubUrl: container,
          }),
        });
        return await response.json();
      },
      /* Docker command to retrieve the list of running volumes */
      getAllDockerVolumes() {
        const { getVolumes } = dispatch;
        fetch('/api/command/allDockerVolumes')
          .then((volumes: Response) => volumes.json())
          .then((dockerVolumes) => {
            return getVolumes(filterOneProperty(dockerVolumes, 'Name'));
          })
          .catch((err: Error): void => {
            console.log(err);
          });
      },
      /* Docker command to retrieve the list of containers running in specified volume @param {string} volumeName */
      getVolumeContainers(volumeName) {
        const { getVolumeContainerList } = dispatch;
        fetch(`/api/command/volumeContainers?volumeName=${volumeName}`)
          .then((data: Response) => data.json())
          .then((volumeContainers) => {
            return getVolumeContainerList(
              listOfVolumeProperties(volumeName, volumeContainers)
            );
          })
          .catch((err: Error): void => {
            console.log(err);
          });
      },

      removeVolume(volumeName) {
        console.log('commands.tsx line 463 =>', volumeName);
        fetch('/api/command/volumeRemove', {
          method: 'POST',
          body: JSON.stringify({ volumeName: volumeName }),
          headers: { 'Content-Type': 'application/json' },
        })
          .then((data: Response) => data.json())
          .then((deletedVolumeNameFromBackEnd) => {
            console.log(deletedVolumeNameFromBackEnd);
          })
          .catch((err: Error): void => {
            console.log('Error in removeVolume', err);
          });
      },

      /* Builds and child_process.executes a docker logs command to generate logs @param {object} optionsObj @returns {object} containerLogs */
      async getLogs(optionsObj) {
        try {
          const response: Response = await fetch('/api/command/allLogs', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(optionsObj),
          });
          const parsedResponse = await response.json();
          return parsedResponse;
        } catch {
          console.log(err);
        }
      },
    }),
    [dispatch]
  );
  return actions;
};

export default useHelper;

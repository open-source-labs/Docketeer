// @ts-noCheck
import {
  filterOneProperty,
  listOfVolumeProperties,
} from './volumeHistoryHelper';
import { useMemo } from 'react';
import useSurvey from '../helpers/dispatch';
import { useAppSelector } from '../../reducers/hooks';

/**
 * @module | commands.tsx
 * @description | Organizes all server-communication throughout client-side into a single custom hook exportable into individual components
 **/

const useHelper = () => {
  const dispatch = useSurvey();

  const state = useAppSelector((state) => state);

  const actions = useMemo(
    () => ({
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

      // TODO: add a delete method
      /* Removes stopped containers @param {*} containerID */
      remove(containerID: string) {
        const { removeContainer } = dispatch;
        fetch(`/api/command/removeContainer?id=${containerID}`)
          .then((message: Response) => message.json())
          .then((message) => {
            console.log({ message });
            removeContainer(containerID);
          })
          .catch((err) => console.log(err));
      },
      /* Stops a container on what user selects @param {*} id */
      stop(id) {
        const { stopRunningContainer } = dispatch;
        fetch(`/api/command/stopContainer?id=${id}`)
          .then((message: Response) => message.json())
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
          .then((message: Response) => message.json())
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
          .then((data: Response) => data.json())
          .then((newRunningList) => {
            // With the deletion of getApiData from /runImage endpoint — the client is now given res.locals.containers rather than res.locals.apiData — ensure that this is fine anywhere where runningList is extracted from the containerReducer
            refreshRunningContainers(newRunningList);
          })
          .catch((err: Error): void => console.log(err));
      },
      /* Removes an image from pulled images list in image tab @param {*} id */
      removeIm(id) {
        const { refreshImages } = dispatch;
        fetch(`/api/command/removeImage?id=${id}`).then(() => {
          refreshImages().catch((err: Error): void => console.log(err));
        });
      },
      /* Handles System Prune @param {*} e */
      handlePruneClick(e) {
        e.preventDefault();
        fetch('/api/command/dockerPrune')
          .then((message: Response) => message.json())
          .then((message) => {
            console.log({ message });
          })
          .catch((err: Error): void => console.log(err));
      },
      /* Pulls image based on the repo you select @param {*} repo */
      pullImage(repo) {
        fetch(`/api/command/pullImage?repo=${repo}`)
          .then((message: Response) => message.json())
          .then((message) => {
            console.log({ message });
          })
          .catch((err: Error): void => console.log(err));
      },
      /* Display all containers network based on docker-compose when the application starts */
      networkContainers() {
        const { getNetworkContainers } = dispatch;
        fetch('/api/command/networkContainers')
          .then((data: Response) => data.json())
          .then((networkContainers) => {
            getNetworkContainers(networkContainers);
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
          .then((data: Response) => data.json())
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
          .then((data: Response) => data.json())
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
            // TODO: why is any not erroring here?
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
      /* Builds and child_process.executes a docker logs command to generate logs @param {object} optionsObj @returns {object} containerLogs */
      async getLogs(optionsObj) {
        console.log('inside of async getLogs');
        try {
          console.log('inside of try block');
          const response: Response = await fetch('/api/command/allLogs', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(optionsObj),
          });
          // console.log('response from fetch', response);
          const parsedResponse = await response.json();
          console.log('parsed response from fetch', parsedResponse);
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

// @ts-noCheck
import {
  filterOneProperty,
  listOfVolumeProperties,
} from './volumeHistoryHelper';
import { useMemo } from 'react';
import useSurvey from './dispatch';
import { useAppSelector } from '../reducers/hooks';
import { createDockerDesktopClient } from '@docker/extension-api-client';
import Client from '../models/Client';
import { ImageType } from 'types';
/**
 * @module | commands.tsx
 * @description | Organizes all server-communication throughout client-side into a single custom hook exportable into individual components
 **/
const ddClient = createDockerDesktopClient();
const useHelper = () => {
  const dispatch = useSurvey();

  const state = useAppSelector((state) => state);

  const actions = useMemo(
    () => ({
      /* Refreshes running containers */
      refreshRunning() {
        const { refreshRunningContainers } = dispatch;
        Client.ContainerService.getRunningContainers()
          .then((runningContainers) => {
            console.log(runningContainers)
            refreshRunningContainers(runningContainers);
          })
          .catch((err: Error): void => console.log(err));
      },
      /* Refreshes stopped containers */
      refreshStopped() {
        const { refreshStoppedContainers } = dispatch;
        Client.ContainerService.getStoppedContainers()
          .then((stoppedContainers) => {
            refreshStoppedContainers(stoppedContainers);
          })
          .catch((err: Error): void => console.log(err));
      },
      /* Refreshes images */
      refreshImages() {
        const { refreshImagesList } = dispatch;
        // ddClient.extension.vm?.service?.get('/api/docker/image')
        //   .then((data: Response) => data)
        Client.ImageService.getImages()
          .then((imagesList) => {
            refreshImagesList(imagesList);
          })
          .catch((err: Error): void => console.log(err));
      },
      /* Refreshes networkContainerList[state in networkReducer] */
      /**@todo Check if this is even used... */
      refreshNetwork() {
        const { refreshNetworkList } = dispatch;
        ddClient.extension.vm?.service?.get('/command/networkListContainers')
          .then((data: Response) => data)
          .then((networkList) => {
            refreshNetworkList(networkList);
          })
          .catch((err: Error): void => console.log(err));
      },
      /* Removes stopped containers @param {*} containerID */
      remove(containerID: string) {
        const { removeContainer } = dispatch;
        // ddClient.extension.vm?.service?.delete(`/api/docker/container/${containerID}`) ///command/removeContainer?id=${containerID}
        Client.ContainerService.removeContainer(containerID)  
          .then((message) => {
            console.log('Removed: ', message);
            removeContainer(containerID);
          })
          .catch((err) => console.log(err));
      },
      /* Stops a container on what user selects @param {*} id */
      stop(id: string) {
        const { stopRunningContainer } = dispatch;
        // ddClient.extension.vm?.service?.post('/api/docker/container/stop', {id}) //`/command/stopContainer?id=${id}`, {method: 'DELETE',}
        Client.ContainerService.stopContainer(id)  
          .then((message) => {
            console.log({ message });
            stopRunningContainer(id);
          })
          .catch((err: Error): void => console.log(err));
      },
      /* Starts a stopped container in containers tab @param {*} id */
      runStopped(id: string) {
        const { runStoppedContainer } = dispatch;
        // ddClient.extension.vm?.service?.post('/api/docker/container/start', {id}) // /command/runStopped?id=${id} '/api/docker/container/start', {body: {id}}
        Client.ContainerService.runContainer(id)  
          .then((message) => {
            console.log({ message });
            runStoppedContainer(id);
          })
          .catch((err: Error): void => console.log(err));
      },
      /* Runs an image from the pulled images list in image tab @param {*} container */
      runIm(image: ImageType) {
        // const { refreshRunningContainers } = dispatch;
        const imageName = image.Repository;
        const tag = image.Tag;
        //Fix the below
        //const containerName = imageName
        Client.ImageService.runImage(imageName, tag)
        // ddClient.extension.vm?.service?.post('/api/docker/image/run', {imageName, tag, containerName}) //'/command/runImage', container
        //   .then((message) => {
        //     if (message.status === 401) {
        //       window.alert('Invalid permissions');
        //       throw new Error(message);
        //     } else {
        //       return message;
        //     }
        //   })
          // the part below was just another get request for containers, which is truly pointless as the app spams running containers every second
          // .then((newRunningList) => {
          //   // With the deletion of getApiData from /runImage endpoint — the client is now given res.locals.containers rather than res.locals.apiData — ensure that this is fine anywhere where runningList is extracted from the containerReducer
          //   refreshRunningContainers(newRunningList);
          // })
          .catch((err: Error): void => console.log(err));
      },
      /* Removes an image from pulled images list in image tab @param {*} id */

      removeIm(id) {
        const { refreshImages } = dispatch;
        // ddClient.extension.vm?.service?.delete(`/api/docker/image/${id}`)
        //   .then((message) => {
        //     if (message.status === 401) {
        //       window.alert('Invalid permissions');
        //       throw new Error(message);
        //     }
        //   })
        Client.ImageService.removeImage(id)
          .then(() => {
            refreshImages().catch((err: Error): void => console.log(err));
          });
      },
      /* Handles System Prune @param {*} e */
      handlePruneClick(e) {
        e.preventDefault();
        ddClient.extension.vm?.service?.delete('/api/docker/system/prune')
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
        ddClient.extension.vm?.service?.delete('/api/docker/network/prune')
          .then((message) => {
            if (message.status === 401) {
              window.alert('Invalid permissions');
              throw new Error(message);
            }
          })
          .catch((err: Error): void => console.log(err));
      },
      
      /* Pulls image based on the repo you select @param {*} repo */
      /**@todo check if used */
      // pullImage(repo) {
      //   ddClient.extension.vm?.service?.get(`/command/pullImage?repo=${repo}`)
      //     .then((message) => {
      //       if (message.status === 401) {
      //         window.alert('Invalid permissions');
      //         throw new Error(message);
      //       } else {
      //         return message;
      //       }
      //     })
      //     .then((message) => {
      //       console.log({ message });
      //     })
      //     .catch((err: Error): void => console.log(err));
      // },
      /* Display all containers network based on docker-compose when the application starts */
      networkContainers() {
        // Pass in container that button is clicked on
        const { getNetworkContainers } = dispatch;
        ddClient.extension.vm?.service?.get('/api/docker/network')
          .then((data: Response) => data)
          .then((networkContainers) => {
            // grab the name of the network only using map method
            networkContainers = networkContainers.map((el) => el.Name);
            getNetworkContainers(networkContainers); // use passed in container to
          })
          .catch((err: Error): void => console.log(err));
      },
      /* Compose up a docker container network @param {*} filePath @param {*} ymlFileName */
      // dockerComposeUp(filePath, ymlFileName) {
      //   const { getContainerStacks } = dispatch;
      //   ddClient.extension.vm?.service?.post('/command/composeUp', {
      //       filePath: filePath,
      //       ymlFileName: ymlFileName,
      //     })
      //     .then((message) => {
      //       if (message.status === 401) {
      //         window.alert('Invalid permissions');
      //         throw new Error(message);
      //       } else {
      //         return message;
      //       }
      //     })
      //     .then((dockerOutput) => {
      //       getContainerStacks(dockerOutput);
      //     })
      //     .catch((err: Error): void => console.log(err));
      // },
      // /* Get list of running container networks */
      // dockerComposeStacks() {
      //   const { getContainerStacks } = dispatch;
      //   ddClient.extension.vm?.service?.get('/command/composeStacks')
      //     .then((data: Response) => data)
      //     .then((dockerOutput) => {
      //       getContainerStacks(dockerOutput);
      //     })
      //     .catch((err: Error): void => console.log(err));
      // },
      // /* Compose down selected container network @param {*} filePath @param {*} ymlFileName */
      // dockerComposeDown(filePath, ymlFileName) {
      //   const { getContainerStacks } = dispatch;
      //   ddClient.extension.vm?.service?.post('/command/composeDown', {
      //       filePath: filePath,
      //       ymlFileName: ymlFileName,
      //     })
      //     .then((message) => {
      //       if (message.status === 401) {
      //         window.alert('Invalid permissions');
      //         throw new Error(message);
      //       } else {
      //         return message;
      //       }
      //     })
      //     .then((dockerOutput) => {
      //       getContainerStacks(dockerOutput);
      //     })
      //     .catch((err: Error): void => console.log(err));
      // },
    
      /* Docker command to retrieve the list of running volumes */
      getAllDockerVolumes() {
        const { getVolumes } = dispatch;
        Client.VolumeService.getAllVolumes()
          .then((dockerVolumes) => {
            return getVolumes(filterOneProperty(dockerVolumes, 'Name'));
          })
          .catch((err: Error): void => {
            console.log(err);
          });
      },
      /* Docker command to retrieve the list of containers running in specified volume @param {string} volumeName */
      getVolumeContainers(volumeName: string) {
        const { getVolumeContainerList } = dispatch;
        // ddClient.extension.vm?.service?.get(`/api/docker/volume/${volumeName}/containers`) //`/command/volumeContainers?volumeName=${volumeName}`
        //   .then((data: Response) => data)
        Client.VolumeService.getContainersOnVolume(volumeName)
          .then((volumeContainers) => {
            console.log(volumeContainers);
            return getVolumeContainerList(
              listOfVolumeProperties(volumeName, volumeContainers)
            );
          })
          .catch((err: Error): void => {
            console.log(err);
          });
      },


      /* Builds and child_process.executes a docker logs command to generate logs @param {object} optionsObj @returns {object} containerLogs */
      async getLogs(optionsObj): Promise<LogObject[]> {
        try{
          const { containerNames, start, stop, offset } = optionsObj;
          return await Client.ContainerService.getLogs(containerNames, start, stop, offset);
        } catch (error){
          return [];
        }
       
  
      }

    }),
    [dispatch]
  );
  return actions;
};

export default useHelper;

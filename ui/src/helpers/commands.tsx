// @ts-noCheck
import {
  filterOneProperty,
  listOfVolumeProperties,
} from './volumeHistoryHelper';
import { useMemo } from 'react';
import useSurvey from './dispatch';
import Client from '../models/Client';
import { ImageType } from 'types';
/**
 * @module | commands.tsx
 * @description | Organizes all server-communication throughout client-side into a single custom hook exportable into individual components
 **/
const useHelper = () => {
  const dispatch = useSurvey();

  const actions = useMemo(
    () => ({
      /* Refreshes running containers */
      refreshRunning() {
        const { refreshRunningContainers } = dispatch;
        Client.ContainerService.getRunningContainers()
          .then((runningContainers) => {
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

        Client.NetworkService.getAllContainersOnAllNetworks()
          .then((networkList) => {
            refreshNetworkList(networkList);
          })
          .catch((err: Error): void => console.log(err));
      },
      /* Removes stopped containers @param {*} containerID */
      remove(containerID: string) {
        const { removeContainer } = dispatch;
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
        Client.ContainerService.stopContainer(id)  
          .then((message) => {
            console.log({ message });
            stopRunningContainer(id);
          })
          .catch((err: Error): void => console.log(err));
      },
      bashContainer(id: string) {
        Client.ContainerService.bashContainer(id)
          .then((message) => {
            console.log({ message });
            console.log('bashStep1')
            bashContainer(id);
          }).catch((err: Error): void => console.log(err));
      },
      /* Starts a stopped container in containers tab @param {*} id */
      runStopped(id: string) {
        const { runStoppedContainer } = dispatch;
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

          .catch((err: Error): void => console.log(err));
      },


      /* Removes an image from pulled images list in image tab @param {*} id */

      removeIm(id) {
        const { refreshImages } = dispatch;
  
        Client.ImageService.removeImage(id)
          .then(() => {
            refreshImages().catch((err: Error): void => console.log(err));
          });
      },
      /* Handles System Prune @param {*} e */
      handlePruneClick(e) {
        e.preventDefault();
 
        Client.NetworkService.pruneNetwork()
          .catch((err: Error): void => console.log(err));
      },

      /* Handles Network Prune @param {*} e */
      handleNetworkPruneClick(e) {
        e.preventDefault();
 
        Client.SystemService.pruneSystem()
          .catch((err: Error): void => console.log(err));
      },
      
 
      /* Display all containers network based on docker-compose when the application starts */
      networkContainers() {
        // Pass in container that button is clicked on
        const { getNetworkContainers } = dispatch;

        Client.NetworkService.getNetworks()
          .then((networkContainers) => {
            // grab the name of the network only using map method
            networkContainers = networkContainers.map((el) => el.Name);
            getNetworkContainers(networkContainers); // use passed in container to
          })
          .catch((err: Error): void => console.log(err));
      },
    
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

        Client.VolumeService.getContainersOnVolume(volumeName)
          .then((volumeContainers) => {
            return getVolumeContainerList(
              listOfVolumeProperties(volumeName, volumeContainers)
            );
          })
          .catch((err: Error): void => {
            console.log(err);
          });
      },

    }),
    [dispatch]
  );
  return actions;
};

export default useHelper;

// @ts-noCheck
import {
  filterOneProperty,
  listOfVolumeProperties,
} from './volumeHistoryHelper';
import { useMemo } from 'react';
import useSurvey from './dispatch';
import Client from '../models/Client';
import { ImageType } from 'types';
import { fetchImages } from '../reducers/imageReducer';
/**
 * @module | commands.tsx
 * @description | Organizes all server-communication throughout client-side into a single custom hook exportable into individual components
 **/
const useHelper = () => {
  const dispatch = useSurvey();

  const actions = useMemo(
    () => ({
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
      // async stop(id: string) {
      //   const { stopRunningContainer } = dispatch;
        
      //   const result = await Client.ContainerService.stopContainer(id)
      //   if (result) stopRunningContainer(id);
      //   return result;
      // },

      async bashContainer(id: string)  {
        await Client.ContainerService.bashContainer(id)  
      },
      /* Starts a stopped container in containers tab @param {*} id */
      // async runStopped(id: string) {
      //   const { runStoppedContainer } = dispatch;
      //   const result = await Client.ContainerService.runContainer(id)
      //   if (result) runStoppedContainer(id);
      //   return result;
      // },
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

      async removeIm(id) {
        const success = await Client.ImageService.removeImage(id);
        if (success) dispatch(fetchImages());
          
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

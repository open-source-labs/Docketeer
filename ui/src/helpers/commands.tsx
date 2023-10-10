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

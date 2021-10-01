import * as helper from './commands';

/**
 * Returns an array of object entries filtered by the key property
 * 
 * @param {Array of Objects} input
 * @param {string} filterInput
 */ 
export const filterOneProperty = (input, filterInput) => {
  const filteredOutput = [];

  for (let i = 0; i < input.length; i++) {
    const filteredArr = Object.entries(input[i]).filter(([key,value]) => key === filterInput);
    filteredOutput.push(Object.fromEntries(filteredArr));
  }

  return filteredOutput;
};

/**
 *  function is meant to perform a callback on input of arrays and return one string
 * 
 * @param {Callback Function} getVolumeContainers
 * @param {Array} arrayOfVolumeNames 
 * @param {Dispatched Action} getVolumeContainersList 
 */
export const volumeByName = (getVolumeContainers, arrayOfVolumeNames, getVolumeContainersList) => {
  let volumeName;
  arrayOfVolumeNames.forEach((element) => {
    volumeName = getVolumeContainers(element['Name'], getVolumeContainersList);
  });
  return volumeName;
};

/**
 * function that updates the state of volumes list
 * 
 * @param {Array} dockerOutput // <-- a volume with its properties included 
 */
export const listOfVolumeProperties = (dockerOutput) => {
  const cache = {};

  for (let i = 0; i < dockerOutput.length; i++) {
    const volumePropsObj = dockerOutput[i];
    
    // Edit this for the details of containers in the respective volume as needed
    for (const key in volumePropsObj) {
      if (key === 'Names') {
        cache['Names'] = volumePropsObj['Names'];
      } 
      if (key === 'RunningFor') {
        cache['RunningFor'] = volumePropsObj['RunningFor'];
      } 
      if (key === 'Status') {
        cache['Status'] = volumePropsObj['Status'];
      } 
    }
  }
  // console.log('cache for volume properties', cache);
  return cache;
};

/**
 * 
 * [{…}] <-- dockerOutput is an array with a single object
 0: <-- 0th index
  Command: ""git--help""
  CreatedAt: "2021-09-1512:07:53-0700PDT"
  ID: "d1ba32d2debe"
  Image: "cfd9fa28a348"
  Labels: ""
  LocalVolumes: "1"
  Mounts: "e59e9417c8de70…"
  Names: "mystifying_boyd"
  Networks: "bridge"
  Ports: ""
  RunningFor: "7daysago"
  Size: "0B(virtual25.2MB)"
  State: "exited"
  Status: "Exited(0)46hoursago"
 */
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
 * Performs a callback on input of arrays and return one string
 * 
 * @param {command callback} getVolumeContainers
 * @param {Array} arrayOfVolumeNames 
 * @param {dispatcher callback} getVolumeContainersList 
 */
export const volumeByName = (getVolumeContainers, arrayOfVolumeNames, getVolumeContainersList) => {
  let volumeName;
  arrayOfVolumeNames.forEach((element) => {
    volumeName = getVolumeContainers(element['Name'], getVolumeContainersList);
  });
  return volumeName;
};

/**
 * Updates the state of volumes list
 * 
 * @param {Array} dockerOutput
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

  return cache;
};
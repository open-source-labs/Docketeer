/**
 * Returns an array of object entries filtered by the key property
 * @param {Array of Objects} input
 * @param {string} filterInput
 **/

export const filterOneProperty = (input, filterInput) => {
  const filteredOutput = [];

  for (let i = 0; i < input.length; i++) {
    const filteredArr = Object.entries(input[i]).filter(
      ([key, value]) => key === filterInput
    );
    filteredOutput.push(Object.fromEntries(filteredArr));
  }

  return filteredOutput;
};

/**
 * Performs a callback on input of arrays and return one string
 * @param {command callback} getVolumeContainers
 * @param {Array} arrayOfVolumeNames
 * @param {dispatcher callback} getVolumeContainersList
 **/

export const volumeByName = (
  getVolumeContainers,
  arrayOfVolumeNames,
  getVolumeContainersList
) => {
  let volumeName;
  arrayOfVolumeNames.forEach((element) => {
    volumeName = getVolumeContainers(element['Name'], getVolumeContainersList);
  });
  return volumeName;
};

/**
 * Stores the list of all containers in their respective volume — edit this fucntion for the details of containers as needed
 * @param {string} volumeName
 * @param {Array} dockerOutput
 **/

export const listOfVolumeProperties = (volumeName, dockerOutput) => {
  const volumeList = {
    vol_name: volumeName,
    containers: [],
  };
  let containerProperties = {};

  for (let i = 0; i < dockerOutput.length; i++) {
    const container = dockerOutput[i];

    for (const key in container) {
      if (key === 'Names') containerProperties['Names'] = container['Names'];
      if (key === 'State') containerProperties['State'] = container['State'];
      if (key === 'Status') containerProperties['Status'] = container['Status'];
    }
    volumeList.containers.push(containerProperties);
    containerProperties = {};
  }

  return volumeList;
};

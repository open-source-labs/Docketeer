/**
 * Returns an array of object entries filtered by the key property
 * 
 * @param {Array of Objects} array
 * @param {string} filterInput
 */ 
export const filterOneProperty = (array, filterInput) => {
  const arrayOfValues = [];
  array.forEach((element) => {
    if (typeof element === 'object') {
      for (const [key, value] of Object.entries(element)) {
        if (key === filterInput) {
          console.log('element', element[key]);
          console.log('element type of', typeof element[key]);
          arrayOfValues.push(JSON.parse(`{${key}: ${value}}`));
          console.log(arrayOfValues);
        }
      }
    }
  });  
  return arrayOfValues;
};

/**
 * Returns an array of object entries filtered by the status
 * 
 * @param {Array of Objects} array
 * @param {string} filterStatus
 */ 
// const volumeContainersStatus = (array, filterStatus) => {
//   const arrayOfVolumeContainers = [];
//   // will show the status of the containers (running/exited)
//   array.forEach((element) => {
//     if (typeof element === 'object') {
//       for (const [key, value] of element) {
//         if (key === filterStatus) { 
//           arrayOfVolumeContainers.push({ key: value });
//         }
//       }
//     }
//   });  
//   return arrayOfVolumeContainers;
// };

// module.exports = {
//   filterOneProperty,
//  // volumeContainersStatus
// };


/**
 * volumename: fjdksf
 * containers:
 * jfkdlsajfksla 
 * fjdsklfjlkdsf  exited
 * fjdksfjklsa  exited
 * fdjskfjsakf 
 * jfdsalf
 */
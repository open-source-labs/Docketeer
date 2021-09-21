/* eslint-disable import/prefer-default-export */
/**
 * Returns an array of object entries filtered by the key property
 *
 * @param {Array of Objects} input
 * @param {string} filterInput
 */
export const filterOneProperty = (input, filterInput) => {
  const filteredOutput = [];
  console.log(input);

  for (let i = 0; i < input.length; i += 1) {
    const filteredArr = Object.entries(input[i]).filter(([key, value]) => key === filterInput);
    filteredOutput.push(Object.fromEntries(filteredArr));
  }

  console.log('output from filter: ', filteredOutput);
  return filteredOutput;
};
// const arrayOfValues = [];
// input.forEach((element) => {
//   if (typeof element === 'object') {
//     for (const [key, value] of Object.entries(element)) {
//       if (key === filterInput) {
//         console.log('element', element[key]);
//         console.log([key, value]);
//         console.log('element type of', typeof element[key]);
//         arrayOfValues.push(JSON.parse(`{${key}: ${value}}`));
//         console.log(arrayOfValues);
//       }
//     }
//   }
// });
// return arrayOfValues;

/**
 * Returns an array of object entries filtered by the status
 *
 * @param {Array of Objects} input
 * @param {string} filterStatus
 */
// const volumeContainersStatus = (array, filterStatus) => {
//   const arrayOfVolumeContainers = [];
//   // will show the status of the containers (running/exited)
//   input.forEach((element) => {
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

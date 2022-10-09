/**
 * Parse all the stdout output into array to manipulate data properly.
 *
 *  @param {*} stdout
 */
const convert = (stdout) => {
  const newArray = stdout.split('\n');
  const result = [];
  for (let i = 1; i < newArray.length - 1; i++) {
    let removedSpace = newArray[i].replace(/\s+/g, ' '); // remove all spaces and replace it to 1 space
    removedSpace = removedSpace.replace(/\s[/]\s/g, '/'); // remove all the space in between slash
    const splittedArray = removedSpace.split(' ');
    result.push(splittedArray);
  }
  return result;
};

/**
 * Converts all the array into array of objects containing key of the value
 *
 * @param {*} array
 * @param {*} objArray
 */
const convertArrToObj = (array, objArray) => {
  const result = [];
  for (let i = 0; i < array.length; i++) {
    const containerObj = {};
    for (let j = 0; j < array[i].length; j++) {
      containerObj[objArray[j]] = array[i][j];
    }
    result.push(containerObj);
  }
  return result;
};

/**
 * Customize metrics of containers to display the entire usage of the system. array is element of object that has each container's information.
 * return array as in this format: [a,b,[c1,c2],[d1,d2]]
 *  a: Sum of CPU
 *  b: Sum of Memory
 *  c: c1 Net I/O total
 *     c2 Net I/O System Total
 *  d: d1 Block I/O total
 *     d2 Block I/O System Total
 *  Refactoring is welcomed since it is not optimized way.
 *
 * @param {*} array
 */
const convertToMetricsArr = (array) => {
  const newArr = [];
  let cpuSum = 0;
  let memorySum = 0;
  let netArray = [0, 0];
  const blockArray = [0, 0];
  for (let i = 0; i < array.length; i++) {
    const cpu = array[i]['CPUPerc'].replace(/([%])+/g, '');
    cpuSum += parseFloat(cpu);
    const memory = array[i]['MemPerc'].replace(/([%])+/g, '');
    memorySum += parseFloat(memory);
    const splittedNet = array[i]['NetIO'].split('/');
    const netvalue = parseFloat(splittedNet[0].replace(/([A-z])+/g, ''));
    let netTotal;
    if (splittedNet[1].slice(-2) === 'kB') {
      netTotal = parseFloat(splittedNet[1].replace(/([A-z])+/g, ''));
    } else {
      netTotal = parseFloat(splittedNet[1].replace(/([A-z])+/g, '')) * 1000;
    }
    netArray[0] += netvalue;
    netArray[1] += netTotal;
    const splittedBlock = array[i]['BlockIO'].split('/');
    const blockValue = parseFloat(splittedBlock[0].replace(/([A-z])+/g, ''));
    const blockTotal = parseFloat(splittedBlock[1].replace(/([A-z])+/g, ''));
    blockArray[0] += blockValue;
    blockArray[1] += blockTotal;
  }
  newArr.push(parseFloat(cpuSum.toFixed(2)));
  newArr.push(parseFloat(memorySum.toFixed(2)));
  netArray = [netArray[0].toFixed(2), netArray[1].toFixed(2)];
  newArr.push(netArray);
  newArr.push(blockArray);

  return newArr;
};

module.exports = {
  convert,
  convertArrToObj,
  convertToMetricsArr,
};

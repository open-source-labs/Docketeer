

/**
 * Parse all the stdout output into array to manipulate data properly.
 *
 *  @param {*} stdout
 */
const convert = (stdout: string) => {
  const newArray = stdout.split('\n');
  const result = [];
  for (let i = 1; i < newArray.length - 1; i++) {
    let removedSpace = newArray[i].replace(/\s+/g, ' '); // remove all spaces and replace it to 1 space
    removedSpace = removedSpace.replace(/\s[/]\s/g, '/'); // remove all the space in between slash
    let splittedArray = removedSpace.split(' ');
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
const convertArrToObj = (array: string[][], objArray: string[]) => {
  const result = [];
  for (let i = 0; i < array.length; i++) {
    let containerObj: any = {};
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
const convertToMetricsArr = (array: any[]) => {
  let newArr = [];
  let cpuSum = 0;
  let memorySum = 0;
  let netArray: any = [0, 0];
  let blockArray = [0, 0];
  for (let i = 0; i < array.length; i++) {
    let cpu = array[i]['CPUPerc'].replace(/([%])+/g, '');
    cpuSum += parseFloat(cpu);
    let memory = array[i]['MemPerc'].replace(/([%])+/g, '');
    memorySum += parseFloat(memory);
    let splittedNet = array[i]['NetIO'].split('/');
    let netvalue = parseFloat(splittedNet[0].replace(/([A-z])+/g, ''));
    let netTotal;
    if (splittedNet[1].slice(-2) === 'kB') {
      netTotal = parseFloat(splittedNet[1].replace(/([A-z])+/g, ''));
    } else {
      netTotal = parseFloat(splittedNet[1].replace(/([A-z])+/g, '')) * 1000;
    }
    netArray[0] += netvalue;
    netArray[1] += netTotal;
    let splittedBlock = array[i]['BlockIO'].split('/');
    let blockValue = parseFloat(splittedBlock[0].replace(/([A-z])+/g, ''));
    let blockTotal = parseFloat(splittedBlock[1].replace(/([A-z])+/g, ''));
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

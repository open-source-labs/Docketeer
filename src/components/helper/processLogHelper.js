/**
 * Use user input to build options object to pass to getLogs()
 * Helper function to build options object based on the radio button selected in the process logs tab
 *
 * @param {string} containerId
 * @returns {object} optionsObj
 */
export const buildOptionsObj = (containerIDs) => {
  const optionsObj = {
    containerIds: containerIDs
  };

  if (document.getElementById('sinceInput').checked) {
    const sinceValue = document.getElementById('sinceText').value;
    optionsObj.since = sinceValue;
  } else if (document.getElementById('tailInput').checked) {
    const tailValue = document.getElementById('tailText').value;
    optionsObj.tail = tailValue;
  }
  return optionsObj;
};

/**
 * Helper function to transform input string (where string is a batch of logs) to an array of log objects
 *
 * @param {*} string
 */

export const makeArrayOfObjects = (string, containerName) => {
  const arrayOfObjects = string
    .trim()
    .split('\n')
    .map((element) => {
      const obj = {};
      const logArray = element.split(' ');
      // extract timestamp
      if (logArray[0].endsWith('Z')) {
        const timeStamp = logArray.shift();
        // parse GMT string to be readable local date and time
        obj.timeStamp = new Date(Date.parse(timeStamp)).toLocaleString();
      }
      // parse remaining array to create readable message
      let logMsg = logArray.join(' ');
      // messages with duplicate time&date have form: '<Time/Date> [num/notice] actual msg'
      const closingIndex = logMsg.indexOf(']');
      if (closingIndex >= 0) {
        logMsg = logMsg.slice(closingIndex + 1).trim();
      }
      // after removing [num/notice], some logs also have 'LOG:' before the actual msg
      if (logMsg.slice(0, 4) === 'LOG:') {
        logMsg = logMsg.slice(4);
      }
      obj.logMsg = logMsg.trim();
      obj.containerName = containerName;
      return obj;
    });

  // filter out empty messages
  const arrayOfLogs = arrayOfObjects.filter((obj) => obj.logMsg !== '');
  return arrayOfLogs;
};

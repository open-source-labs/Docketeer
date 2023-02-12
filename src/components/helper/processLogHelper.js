/**
 * Use user input to build options object to pass to getLogs()
 * Helper function to build options object based on the radio button selected in the process logs tab
 * @param {string} containerId
 * @returns {object} optionsObj
 */
export const buildOptionsObj = (containerIDs) => {
  const optionsObj = {
    containerIds: containerIDs,
  };
  if (document.getElementById("sinceInput").checked) {
    const sinceValue = document.getElementById("sinceText").value;
    optionsObj.since = sinceValue;
  } else if (document.getElementById("tailInput").checked) {
    const tailValue = document.getElementById("tailText").value;
    optionsObj.tail = tailValue;
  }
  return optionsObj;
};

/**
 * Helper function to transform input string (where string is a batch of logs) to an array of log objects
 * @param {*} string
 */
export const makeArrayOfObjects = (string, containerName) => {
  const arrayOfObjects = string
    .trim()
    .split("\n")
    .map((element) => {
      const obj = {};
      const logArray = element.split(" ");
      if (logArray[0].endsWith("Z")) {
        const timeStamp = logArray.shift(); // Extract timestamp
        obj.timeStamp = new Date(Date.parse(timeStamp)).toLocaleString(); // Parse GMT string to be readable local date & time
      }
      let logMsg = logArray.join(" "); // Parse remaining array to create readable message
      const closingIndex = logMsg.indexOf("]"); // Messages with duplicate time/date have form: '<Time/Date [num/notice actual msg]'
      if (closingIndex >= 0) {
        logMsg = logMsg.slice(closingIndex + 1).trim();
      }
      if (logMsg.slice(0, 4) === "LOG:") {
        // After removing [num/notice] — some logs also have 'LOG:' before actual msg
        logMsg = logMsg.slice(4);
      }
      obj.logMsg = logMsg.trim();
      obj.containerName = containerName;
      return obj;
    });
  const arrayOfLogs = arrayOfObjects.filter((obj) => obj.logMsg !== ""); // Filter out empty messages
  return arrayOfLogs;
};

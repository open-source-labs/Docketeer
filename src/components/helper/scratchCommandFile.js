// import stripAnsi from 'strip-ansi';
import { exec } from 'child_process';

const sampleObj = {
  containerId: '7c42396fd211'
};

console.log('why does this not log to the console');

const makeArrayOfObjects = string => {
    console.log(string);
    const arrayOfObjects = string.trim().split('\n').map((element) => {
      const obj = {};
      const timeStampLogArray = element.split(' ');
      if (timeStampLogArray[0].endsWith('Z')) {
        const timeStamp = timeStampLogArray.shift();
        const logMsg = timeStampLogArray.join(' ');
        obj.timeStamp = timeStamp;
        obj.logMsg = logMsg.trim();
      }
      else {
        obj.logMsg = timeStampLogArray.join(' ').trim();
        obj.timeStamp = '----';
      }
      return obj;
    });
    return arrayOfObjects;
  };

const getLogs = (optionsObj) => {
  // build inputCommandString to get logs from command line
  let inputCommandString = 'docker logs --timestamps ';
  if (optionsObj.since) {
    // console.log(optionsObj.since);
    inputCommandString += `--since ${optionsObj.since} `;
  }
  optionsObj.tail ? inputCommandString += `--tail ${optionsObj.tail} ` : inputCommandString += '--tail 50 ';
  inputCommandString += `${optionsObj.containerId}`;

  console.log(inputCommandString);
  
  const containerLogs = { stdout: [], stderr: [] };
    
  exec(inputCommandString, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    console.log('stdOut: ', stdout);
    console.log('stdErr: ', stderr);

    containerLogs.stdout = makeArrayOfObjects(stdout);
    containerLogs.stderr = makeArrayOfObjects(stderr);
  });
    
  // return the invocation of the getContainerLogs dispatch function, passing in the payload
  return containerLogs;
};

  
// makeArrayOfObjects transforms input string (where string is a batch of logs) to an array of objects: [{logmsg:..., timestamp:...}, {logmsg:..., timestamp:...}, ...]


console.log(getLogs(sampleObj));
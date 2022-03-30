import { getLogs } from './commands';
import { useDispatch } from 'react-redux';
import * as actions from '../../actions/actions';

// helper function to build options object based on the radio button selected on the process logs tab
export const buildOptionsObj = containerId => {

  const optionsObj = {
    containerId: containerId
  };
    
  // check if current logs options checked

  // check if since option checked
  if (document.getElementById('sinceInput').checked) {
    const sinceValue = document.getElementById('sinceText').value; // 00h00m00s
    optionsObj.since = sinceValue;
  }
  // check if tail option checked
  else if (document.getElementById('tailInput').checked) {
    const tailValue = document.getElementById('tailText').value;
    optionsObj.tail = tailValue;
  }
  return optionsObj;
};

// makeArrayOfObjects transforms input string (where string is a batch of logs) to an array of objects: [{logmsg:..., timestamp:...}, {logmsg:..., timestamp:...}, ...]
export const makeArrayOfObjects = string => {
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
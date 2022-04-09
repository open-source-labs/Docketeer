import { getLogs } from './commands';
import { useDispatch } from 'react-redux';
import * as actions from '../../actions/actions';


/**
 * Use user input to build options object to pass to getLogs()
 * 
 * @param {string} containerId
 * @returns {object} optionsObj
 */
export const buildOptionsObj = containerId => {

  const optionsObj = {
    containerId: containerId
  };
    
  if (document.getElementById('sinceInput').checked) {
    const sinceValue = document.getElementById('sinceText').value;
    optionsObj.since = sinceValue;
  }
  
  else if (document.getElementById('tailInput').checked) {
    const tailValue = document.getElementById('tailText').value;
    optionsObj.tail = tailValue;
  }
  return optionsObj;
};


/**
 * Transforms batch of logs, as string, to array of objects [{logmsg:..., timestamp:...}, {logmsg:..., timestamp:...}, ...]. * Called by getLogs()
 * @param {string} string
 * @returns {array} arrayOfObjects
 */
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
      if(timeStampLogArray.join(' ').trim() === ''){
        obj.timeStamp = '';
        obj.logMsg = '';
      }
      else{
        obj.logMsg = timeStampLogArray.join(' ').trim();
        obj.timeStamp = '----';
      }
    }
    return obj;
  });
  return arrayOfObjects;
};


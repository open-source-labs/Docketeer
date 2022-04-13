import { getLogs } from './commands';
import { useDispatch } from 'react-redux';
import * as actions from '../../actions/actions';

 
/**
 * Helper function to build options object based on the radio button selected in the process logs tab
 * 
 * @param {*} containerId
 */

<<<<<<< HEAD
=======
/**
 * Use user input to build options object to pass to getLogs()
 * 
 * @param {string} containerId
 * @returns {object} optionsObj
 */
>>>>>>> master
export const buildOptionsObj = containerId => {

  const optionsObj = {
    containerId: containerId
  };
<<<<<<< HEAD

=======
    
>>>>>>> master
  if (document.getElementById('sinceInput').checked) {
    const sinceValue = document.getElementById('sinceText').value;
    optionsObj.since = sinceValue;
  }
<<<<<<< HEAD
=======
  
>>>>>>> master
  else if (document.getElementById('tailInput').checked) {
    const tailValue = document.getElementById('tailText').value;
    optionsObj.tail = tailValue;
  }
  return optionsObj;
};

<<<<<<< HEAD
/**
 * Helper function to transform input string (where string is a batch of logs) to an array of log objects
 * 
 * @param {*} string
 */

=======

/**
 * Transforms batch of logs, as string, to array of objects [{logmsg:..., timestamp:...}, {logmsg:..., timestamp:...}, ...]. * Called by getLogs()
 * @param {string} string
 * @returns {array} arrayOfObjects
 */
>>>>>>> master
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


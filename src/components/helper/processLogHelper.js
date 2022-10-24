import { getLogs } from './commands';
import { useDispatch } from 'react-redux';
import * as actions from '../../redux/actions/actions';

/**
 * Helper function to build options object based on the radio button selected in the process logs tab
 *
 * @param {*} containerId
 */

/**
 * Use user input to build options object to pass to getLogs()
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
      const timeStampLogArray = element.split(' ');
      if (timeStampLogArray[0].endsWith('Z')) {
        const timeStamp = timeStampLogArray.shift();
        const logMsg = timeStampLogArray.join(' ');
        obj.timeStamp = new Date(Date.parse(timeStamp)).toLocaleString();
        obj.logMsg = logMsg.trim();
      } else {
        if (timeStampLogArray.join(' ').trim() === '') {
          obj.timeStamp = '';
          obj.logMsg = '';
        } else {
          obj.logMsg = timeStampLogArray.join(' ').trim();
          obj.timeStamp = '----';
        }
      }
      obj.containerName = containerName;
      return obj;
    });
  return arrayOfObjects;
};

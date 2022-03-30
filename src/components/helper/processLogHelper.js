// import { getLogs } from './commands';
// import { useDispatch } from 'react';
// import * as actions from '../../actions/actions';

// // // useDispatch returns a reference to the dispatch function from the redux store
// // const dispatch = useDispatch();
// // // getContainerLogs dispatches the getLogs action creator to trigger state change for containerLogs
// // const getContainerLogs = (data) => dispatch(actions.getLogs(data));

// // callback function invoked when 'get logs' button is clicked
// export const handleGetLogs = (e) => {
//   // extract container id
//   // e.target is the element that triggered the event, e.target.id is the ID of that element
//   // ***** for the fern/eric: need to set ID each button with the container ID
//   const containerId = e.target.id;

//   const optionsObj = buildOptionsObj(containerId);

//   return getLogs(optionsObj, getContainerLogs);

// };

// // helper function to build options object based on the radio button selected on the process logs tab
// const buildOptionsObj = containerId => {

//   const optionsObj = {
//     containerId: containerId
//   };
    
//   // check if current logs options checked
//   if (document.getElementById('currentLogsInput').checked) {
//     // do something for current logs - maybe delete for option 3
//   }
//   // check if since option checked
//   else if (document.getElementById('sinceInput').checked) {
//     const sinceValue = document.getElementById('sinceInput').value; // 00h00m00s
//     optionsObj.since = sinceValue;
//   }
//   // check if tail option checked
//   else if (document.getElementById('tailInput').checked) {
//     const tailValue = document.getElementById('tailInput').value;
//     optionsObj.tail = tailValue;
//   }
//   return optionsObj;
// };

// // makeArrayOfObjects transforms input string (where string is a batch of logs) to an array of objects: [{logmsg:..., timestamp:...}, {logmsg:..., timestamp:...}, ...]
// export const makeArrayOfObjects = string => {
//   const arrayOfObjects = string.trim().split('\n').map((element) => {
//     const obj = {};
//     const timeStampLogArray = element.split(' ');
//     if (timeStampLogArray[0].endsWith('Z')) {
//       const timeStamp = timeStampLogArray.shift();
//       const logMsg = timeStampLogArray.join(' ');
//       obj.timeStamp = timeStamp;
//       obj.logMsg = logMsg.trim();
//     }
//     else {
//       obj.logMsg = timeStampLogArray.join(' ').trim();
//       obj.timeStamp = '----';
//     }
//     return obj;
//   });
//   return arrayOfObjects;
// };
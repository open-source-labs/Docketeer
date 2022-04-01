import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as helper from '../helper/commands';
import {string} from 'prop-types';
import console from 'console';
import { buildOptionsObj } from '../helper/processLogHelper';
import { getLogs } from '../helper/commands';

// Redux Imports (actions)
import * as actions from '../../actions/actions';
import { SettingsCellOutlined } from '@material-ui/icons';

// this component displays a table  containing the process logs. 

/**
 * Display all running and stopped containers
 * 
 * @param {*} props
 */



const ProcessLogsTable = (props) => {

  // useDispatch returns a reference to the dispatch function from the redux store
  const dispatch = useDispatch();
  // getContainerLogs dispatches the getLogs action creator to trigger state change for containerLogs
  const getContainerLogsDispatcher = (data) => dispatch(actions.getContainerLogs(data));
  
  const urlString = window.location.href;
  const containerID = urlString.split('/');
  const id = containerID[containerID.length - 1];

  const [logs, setLogs] = useState({ stdout: [], stderr: [] });
  const { stdout, stderr } = logs;


  // The selector will be run whenever the function component renders 
  // useSelector() will also subscribe to the Redux store, and run your selector whenever an action is dispatched.
  // const containerLogs = useSelector(state => state.processLogs.containerLogs);
  // const { stdoutLogs, stderrLogs } = containerLogs;
  console.log('logs ', logs)
  // console.log('containerLogs ', containerLogs);

   

  // // after first component render AND after every render, tell useEffect to do something
  // useEffect(() => {
  //   console.log('useEffect is being triggered, containerLogs within store has been changed and component is being re-renderd');
  //   // const containerLogs = useSelector(state => state.containerLogs);
  //   // console.log('containerLogs ', containerLogs);
    
  //   // setLogs(containerLogs)
  // }, [containerLogs]);
  
  // const { stdoutLogs, stderrLogs } = logs;
  // console.log('logs after setLogs updated the logs', logs)

  // callback function invoked when 'get logs' button is clicked
  const handleGetLogs = (e) => {
    // extract container id
    // e.target is the element that triggered the event, e.target.id is the ID of that element
    // ***** for the fern/eric: need to set ID each button with the container ID
    const containerId = e.target.id;

    const optionsObj = buildOptionsObj(containerId);

    // invoke getLogs to get logs from command line, then dispatch the action creator to the reducer to update the store
    const containerLogs = getLogs(optionsObj, getContainerLogsDispatcher);  
    console.log('containerLogs in handlegetLogs fn ', containerLogs)
    setLogs(containerLogs);
  };

  // creating array of log elements to be displayed.
  // const logsToBeDisplayed = logs.stdoutLogs.map((element) => {
  //   return [element.timestamp, element.logMsg];
  // });

  // when user clicks button, the action creator getLogs is called to produce an action
  // action is fed to the dispatch, which forwards the action to the reducer which creates a new state

  /*
  const 
  
  */
  
//  const stdoutLogArray = stdoutLogs.map((log => {
//   return <Log
//      timestamp={log.timestamp}
//      logMsg={log.logMsg}
//    >
//     </Log>
//  })
   
//   const stderrLogArray = stderrLogs.map((log => {
//     return <Log
//       timestamp={log.timestamp}
//       logMsg={log.logMsg}
//     >
//     </Log>
//   })
  
  const stdoutLogArray = stdout.map((log, i) => {
    return <p key={`stdlog_${i}`}> <strong>timestamp:</strong> {log.timeStamp} <strong>log:</strong> {log.logMsg}</p>;
  }); 
  
  const stderrLogArray = stderr.map((log, i) => {
    return <p key={`stdlog_${i}`}> <strong>timestamp:</strong> {log.timeStamp} <strong>log:</strong> {log.logMsg}</p>;
  });

  return (
    <div className="renderContainers">
      
      <h1>Coming soon!</h1>
      <h1>ID: {id} </h1> 

      <form>
        
        <input type="radio" id="sinceInput" name="logOption" />
        <label htmlFor="sinceInput">Since</label>
        <input type='text' id="sinceText"/>

        
        <input type="radio" id="tailInput" name="logOption" />
        <label htmlFor="tailInput">Tail</label>
        <input type='text' id="tailText"/>

        <button id={id} type='button' onClick={handleGetLogs}>Get Logs</button>

      </form>

      <div>
        <h1>stdout Logs</h1>
        {stdoutLogArray}
        <h1> </h1>
        <h1>stderr Logs</h1>
        {stderrLogArray}
      </div>

      
    </div>
  );
};

export default ProcessLogsTable;

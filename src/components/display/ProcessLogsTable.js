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




  const handleGetLogs = (e) => {

    const containerId = e.target.id;

    const optionsObj = buildOptionsObj(containerId);

    
    const containerLogs = getLogs(optionsObj, getContainerLogsDispatcher);  
    console.log('containerLogs in handlegetLogs fn ', containerLogs);
    setLogs(containerLogs);
  };

  const stdoutLogArray = stdout.map((log, i) => {
    return <p key={`stdlog_${i}`}> <strong>timestamp:</strong> {log.timeStamp} <strong>log:</strong> {log.logMsg}</p>;
  }); 
  
  const stderrLogArray = stderr.map((log, i) => {
    return <p key={`stdlog_${i}`}> <strong>timestamp:</strong> {log.timeStamp} <strong>log:</strong> {log.logMsg}</p>;
  });

  return (
    <div className="renderContainers">
      
      <h1>ID: {id} </h1> 
      
      <div>
        <form>    
          <input type="radio" id="sinceInput" name="logOption" />
          <label htmlFor="sinceInput">Since</label>
          <input type='text' id="sinceText"/>
  
          
          <input type="radio" id="tailInput" name="logOption" />
          <label htmlFor="tailInput">Tail</label>
          <input type='text' id="tailText"/>
  
          <button id={id} type='button' onClick={handleGetLogs}>Get Logs</button>
  
        </form>
      </div>


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

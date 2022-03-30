import React, { useState } from 'react';
import { useEffect, useSelector, useDispatch } from 'react-redux';
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

  const [logs, setLogs] = useState({});
  

  // upon page render, dispatch the getLogs action creator to trigger state change for containerLogs  
  useEffect => (() => {
    const containerLogs = useSelector(state => state.containerLogs);
    // const { stdoutLogs, stderrLogs } = containerLogs; 
    setLogs(containerLogs);
  });
  
  const { stdoutLogs, stderrLogs } = logs;
  console.log('logs after setLogs updated the logs', logs)

  // callback function invoked when 'get logs' button is clicked
  const handleGetLogs = (e) => {
    // extract container id
    // e.target is the element that triggered the event, e.target.id is the ID of that element
    // ***** for the fern/eric: need to set ID each button with the container ID
    const containerId = e.target.id;

    const optionsObj = buildOptionsObj(containerId);

    // invoke getLogs to get logs from command line, then dispatch the action creator to the reducer to update the store
    getLogs(optionsObj, getContainerLogsDispatcher);
    // after store is updated, get the updated containerLogs from the store
    
    // indicate to the component that the store has been updated in order to re-render the component using useEffect
    setLogs({});
    return; 
  };

  // when user clicks button, the action creator getLogs is called to produce an action
  // action is fed to the dispatch, which forwards the action to the reducer which creates a new state
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
      {logs.stdoutLogs}
      

    </div>
  );
};

export default ProcessLogsTable;

/* eslint-disable react/prop-types */
import React from 'react';
import ToggleDisplay from '../display/ToggleDisplay';
import { HashRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import ProcessLogsCard from '../display/ProcessLogsCard';


/**
 * Display all running and stopped containers. Each box can be selected to view process log tables.
 * 
 * @param {*} props
 */


const ProcessLogs = (props) => {

  const renderRunningList = [];
  props.runningList.map((container, index) => {
    renderRunningList.push(
      <Link to={`/LogTable/${container.ID}`}> 
        <ProcessLogsCard index={index} container={container} key={container.ID} status="Running" />
      </Link>
    );
  });


  const renderStoppedList = [];
  props.stoppedList.map((container, index) => {
    
      renderStoppedList.push(
        <Link to={`/LogTable/${container.ID}`}> 
          <ProcessLogsCard index={index} container={container} status="Stopped" />
        </Link>
      );
    
  });

  return (
    <div className="renderContainers">
      <div className='header'>
        <h1 className='tabTitle'>Process Logs</h1>
      </div>

 
      <h3>
          Running Containers: {props.runningList.length}
      </h3>

      <div className="containers">
        {renderRunningList}
      </div>

      <h3>
        Stopped Containers: {props.stoppedList.length}
      </h3>

      <div className="containers">
        {renderStoppedList}
      </div>

    </div>
  );
};

export default ProcessLogs;

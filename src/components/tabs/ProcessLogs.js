/* eslint-disable react/prop-types */
import React from 'react';
<<<<<<< HEAD
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
        <ProcessLogsCard
          key={index}
          index={index}
          container={container}
          status='Running'
        />
    );
  });

  const renderStoppedList = [];
  props.stoppedList.map((container, index) => {
    renderStoppedList.push(
        <ProcessLogsCard key={index} index={index} container={container} status='Stopped' />
    );
  });

  return (
    <div className='renderContainers'>
=======
import ToggleDisplay from '../display/ToggleDisplay';
import { HashRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import ProcessLogsCard from '../display/ProcessLogsCard';


/**
 * Display all running and stopped containers. Each box can be selected to view process log tables.
 * 
 * @param {*} props
 */


const ProcessLogs = (props) => {
  
  // populate running containers. Needs unique keys
  const renderRunningList = [];
  props.runningList.map((container, index) => {
    renderRunningList.push(
      <Link to={`/LogTable/${container.ID}`}> 
        <ProcessLogsCard index={index} container={container} key={container.ID} status="Running" />
      </Link>
    );
  });

  // Populate stopped containers. Needs unique keys
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
>>>>>>> 276c4d7 (Revert "Updated linting for project. (#107)")
      <div className='header'>
        <h1 className='tabTitle'>Process Logs</h1>
      </div>

<<<<<<< HEAD
      <h3>Running Containers: {props.runningList.length}</h3>

      <div className='containers'>{renderRunningList}</div>

      <h3>Stopped Containers: {props.stoppedList.length}</h3>

      <div className='containers'>{renderStoppedList}</div>
=======
 
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

>>>>>>> 276c4d7 (Revert "Updated linting for project. (#107)")
    </div>
  );
};

export default ProcessLogs;

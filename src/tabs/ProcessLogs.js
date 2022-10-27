/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';
import ProcessLogsCard from '../components/display/ProcessLogsCard';

/**
 * Display all running and stopped containers. Each box can be selected to view process log tables.
 */
const ProcessLogs = ({ runningList, stoppedList }) => {
  // populate running containers. Needs unique keys
  const renderRunningList = [];
  runningList.map((container, index) => {
    renderRunningList.push(
      <Link to={`/LogTable/${container.ID}`}>
        <ProcessLogsCard
          index={index}
          container={container}
          key={container.ID}
          status="Running"
        />
      </Link>
    );
  });

  // Populate stopped containers. Needs unique keys
  const renderStoppedList = [];
  stoppedList.map((container, index) => {
    renderStoppedList.push(
      <Link to={`/LogTable/${container.ID}`}>
        <ProcessLogsCard index={index} container={container} status="Stopped" />
      </Link>
    );
  });

  return (
    <div className="renderContainers">
      <div className="header">
        <h1 className="tabTitle">Process Logs</h1>
      </div>

      <h3>Running Containers: {runningList.length}</h3>

      <div className="containers">{renderRunningList}</div>

      <h3>Stopped Containers: {stoppedList.length}</h3>

      <div className="containers">{renderStoppedList}</div>
    </div>
  );
};

export default ProcessLogs;

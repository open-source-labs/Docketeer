/* eslint-disable react/prop-types */
import React from 'react';
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
      <div className='header'>
        <h1 className='tabTitle'>Process Logs</h1>
      </div>

      <h3>Running Containers: {props.runningList.length}</h3>

      <div className='containers'>{renderRunningList}</div>

      <h3>Stopped Containers: {props.stoppedList.length}</h3>

      <div className='containers'>{renderStoppedList}</div>
    </div>
  );
};

export default ProcessLogs;

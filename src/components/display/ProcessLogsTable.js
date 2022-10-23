import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as helper from '../helper/commands';
import { buildOptionsObj } from '../helper/processLogHelper';
import { getLogs } from '../helper/commands';
import * as actions from '../../redux/actions/actions';

import { DataGrid } from '@mui/x-data-grid';

/**
 * Displays process logs as table
 * @module ProcessLogsTable
 * @description Container that displays all running and not running docker containers. Each box is wrapped by
 * a Router link.
 */

const ProcessLogsTable = (props) => {
  const dispatch = useDispatch();
  const getContainerLogsDispatcher = (data) =>
    dispatch(actions.getContainerLogs(data));

  // Grab container ID from URL parameter
  const urlString = window.location.href;
  const containerID = urlString.split('/');
  const id = containerID[containerID.length - 1];

  const [logs, setLogs] = useState({ stdout: [], stderr: [] });
  const { stdout, stderr } = logs;

  // Get logs button handler function. Grabs logs and updates component state
  const handleGetLogs = (e) => {
    const containerId = e.target.id;
    const optionsObj = buildOptionsObj([containerId]);
    const containerLogs = getLogs(optionsObj, getContainerLogsDispatcher);

    setLogs(containerLogs);
  };

  const columns = [
    { field: 'container', headerName: 'Container', width: 150 },
    { field: 'type', headerName: 'Log Type', width: 150 },
    { field: 'time', headerName: 'TimeStamp', width: 150 },
    { field: 'message', headerName: 'Message', width: 400 }
  ];

  // Populating the StdOut Table Data Using stdout.map
  const StdoutTableData = () => {
    const rows = [];

    stdout.forEach((log, index) => {
      rows.push({
        container: 'Container Name',
        type: 'stdout',
        time: log.timeStamp,
        message: log.logMsg,
        id: Math.random() * 100
      });
    });

    return <DataGrid rows={rows} columns={columns} rowHeight={200} />;
  };

  // Populating the StdErr Table Data Using stderr.map
  const StderrTableData = () => {
    const rows = [];

    stderr.forEach((log, index) => {
      rows.push({
        container: 'Container Name',
        type: 'stderr',
        time: log.timeStamp,
        message: log.logMsg,
        id: Math.random() * 100
      });
    });

    return <DataGrid rows={rows} columns={columns} />;
  };

  return (
    <div className='renderContainers'>
      <h1>Container ID: {id} </h1>

      <div className='settings-container'>
        <form>
          <input type='radio' id='sinceInput' name='logOption' />
          <label htmlFor='sinceInput'>Since</label>
          <input type='text' id='sinceText' />

          <input type='radio' id='tailInput' name='logOption' />
          <label htmlFor='tailInput'>Tail</label>
          <input type='text' id='tailText' />

          <button id={id} type='button' onClick={handleGetLogs}>
            Get Logs
          </button>
        </form>

        <div
          className='process-logs-container'
          style={{ height: 500, width: '100%' }}
        >
          <StdoutTableData />
        </div>
        <div
          className='process-logs-container'
          style={{ height: 500, width: '100%' }}
        >
          <StderrTableData />
        </div>
      </div>
    </div>
  );
};

export default ProcessLogsTable;

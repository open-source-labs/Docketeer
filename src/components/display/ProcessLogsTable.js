<<<<<<< HEAD
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { buildOptionsObj } from '../../module/utils/helper/processLogHelper';
import { getLogs } from '../../module/utils/commands';
import * as actions from '../../module/actions/actions';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
=======
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as helper from '../helper/commands';
import { string } from 'prop-types';
import { buildOptionsObj } from '../helper/processLogHelper';
import { getLogs } from '../helper/commands';
import * as actions from '../../redux/actions/actions';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { SettingsCellOutlined } from '@mui/icons-material';
>>>>>>> 68822a4 (Get the html to show up on the electron app. Still need to get the react to mount the html id)

/**
 * Displays process logs as table
 * @module ProcessLogsTable
 * @description Container that displays all running and not running docker containers. Each box is wrapped by
 * a Router link.
 */

<<<<<<< HEAD
const ProcessLogsTable = () => {
=======
const ProcessLogsTable = (props) => {
>>>>>>> 68822a4 (Get the html to show up on the electron app. Still need to get the react to mount the html id)
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
    const optionsObj = buildOptionsObj(containerId);
    const containerLogs = getLogs(optionsObj, getContainerLogsDispatcher);

    // * Debugging
    console.log('containerId: ', containerId);
    console.log('Container Logs: ', containerLogs);

    setLogs(containerLogs);
  };

  const StdoutTableData = () => {
    return stdout.map((log, index) => {
      return (
        <TableRow key={index}>
          <TableCell>
            <span className='log-timestamp'>{log.timeStamp}</span>
          </TableCell>
          <TableCell>
            <span className='log-message'>{log.logMsg}</span>
          </TableCell>
        </TableRow>
      );
    });
  };

  const StderrTableData = () => {
    return stderr.map((log, index) => {
      return (
        <TableRow key={index}>
          <TableCell>
            <span className='log-timestamp'>{log.timeStamp}</span>
          </TableCell>
          <TableCell>
            <span className='log-message'>{log.logMsg}</span>
          </TableCell>
        </TableRow>
      );
    });
  };

  return (
<<<<<<< HEAD
    <div className="renderContainers">
=======
    <div className='renderContainers'>
>>>>>>> 68822a4 (Get the html to show up on the electron app. Still need to get the react to mount the html id)
      <h1>Container ID: {id} </h1>

      <div className="settings-container">
        <form>
<<<<<<< HEAD
          <input type="radio" id="sinceInput" name="logOption" />
          <label htmlFor="sinceInput">Since</label>
          <input type="text" id="sinceText" />

          <input type="radio" id="tailInput" name="logOption" />
          <label htmlFor="tailInput">Tail</label>
          <input type="text" id="tailText" />

          <button id={id} type="button" onClick={handleGetLogs}>
=======
          <input type='radio' id='sinceInput' name='logOption' />
          <label htmlFor='sinceInput'>Since</label>
          <input type='text' id='sinceText' />

          <input type='radio' id='tailInput' name='logOption' />
          <label htmlFor='tailInput'>Tail</label>
          <input type='text' id='tailText' />

          <button id={id} type='button' onClick={handleGetLogs}>
>>>>>>> 68822a4 (Get the html to show up on the electron app. Still need to get the react to mount the html id)
            Get Logs
          </button>
        </form>

<<<<<<< HEAD
        <div className="process-logs-container">
=======
        <div className='process-logs-container'>
>>>>>>> 68822a4 (Get the html to show up on the electron app. Still need to get the react to mount the html id)
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>STDOUT:</TableCell>
                  <TableCell> </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>TimeStamp</TableCell>
                  <TableCell>Log Message</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <StdoutTableData />
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <div className='process-logs-container'>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>STDERR:</TableCell>
                  <TableCell> </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>TimeStamp</TableCell>
                  <TableCell>Log Message</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <StderrTableData />
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
};

export default ProcessLogsTable;

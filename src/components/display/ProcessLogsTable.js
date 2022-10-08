import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { buildOptionsObj } from '../helper/processLogHelper';
import { getLogs } from '../helper/commands';
import * as actions from '../../actions/actions';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

/**
 * Displays process logs as table
 * @module ProcessLogsTable
 * @description Container that displays all running and not running docker containers. Each box is wrapped by
 * a Router link.
 */

const ProcessLogsTable = () => {
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
    setLogs(containerLogs);
  };

  const StdoutTableData = () => {
    return stdout.map((log, index) => {
      return (
        <TableRow key={index}>
          <TableCell>
            <span className="log-timestamp">{log.timeStamp}</span>
          </TableCell>
          <TableCell>
            <span className="log-message">{log.logMsg}</span>
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
            <span className="log-timestamp">{log.timeStamp}</span>
          </TableCell>
          <TableCell>
            <span className="log-message">{log.logMsg}</span>
          </TableCell>
        </TableRow>
      );
    });
  };

  return (
    <div className="renderContainers">
      <h1>Container ID: {id} </h1>

      <div className="settings-container">
        <form>
          <input type="radio" id="sinceInput" name="logOption" />
          <label htmlFor="sinceInput">Since</label>
          <input type="text" id="sinceText" />

          <input type="radio" id="tailInput" name="logOption" />
          <label htmlFor="tailInput">Tail</label>
          <input type="text" id="tailText" />

          <button id={id} type="button" onClick={handleGetLogs}>
            Get Logs
          </button>
        </form>

        <div className="process-logs-container">
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
        <div className="process-logs-container">
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

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch, getState } from 'react-redux';
import * as helper from '../helper/commands';
import { buildOptionsObj } from '../helper/processLogHelper';
import { getLogs } from '../helper/commands';
import * as actions from '../../redux/actions/actions';

import  store  from '../../renderer/store.js';
import { DataGrid } from '@mui/x-data-grid';
import { Checkbox, FormControlLabel, FormGroup } from '@mui/material'; // use for container selection
import { CSVLink } from 'react-csv';

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

  // grab clicked container
  const urlString = window.location.href;
  const containerID = urlString.split('/');
  const id = containerID[containerID.length - 1];

  // access runningList from state
  const runningList = store.getState().containersList.runningList;
  // get inital container name for state
  const initCont = runningList.find(el => el.ID === id);

  const [btnIdList, setBtnIdList] = useState([id]);
  const [selectedContainerNames, setSelectedContainerNames] = useState([initCont.Name]);

  const [rows, setRows] = useState([]);

  const [csvData, setCsvData] = useState([
    [ 'container', 'type', 'time', 'message']
  ]);

  const [logs, setLogs] = useState({ stdout: [], stderr: [] });
  const { stdout, stderr } = logs;

  // Get logs button handler function. Grabs logs and updates component state
  const handleGetLogs = (idList) => {
    const optionsObj = buildOptionsObj(idList); 
    const containerLogs = getLogs(optionsObj, getContainerLogsDispatcher);
    setLogs(containerLogs);
  };

  const columns = [
    { field: 'container', headerName: 'Container', width: 150 },
    { field: 'type', headerName: 'Log Type', width: 120 },
    { field: 'time', headerName: 'Timestamp', width: 200 },
    { field: 'message', headerName: 'Message', width: 400 }
  ];

  const createContainerCheckboxes = (currId) => {
    // iterate through runningList -> create label and checkbox for each one
    for (let i = 0; i < runningList.length; i++) {
      // by default, clicked container should be checked
      if (runningList[i].ID === currId){
        containerSelectors.push(<FormControlLabel key={`FCL ${i}`} control={<Checkbox id={runningList[i].ID} name={runningList[i].Name} defaultChecked={true} onChange={(e) => handleCheck(e)} />} label={`${runningList[i].Name}`} />);
      } else {
        // by default all others should be unchecked
        containerSelectors.push(<FormControlLabel key={`FCL ${i}`} control={<Checkbox id={runningList[i].ID} name={runningList[i].Name} defaultChecked={false} onChange={(e) => handleCheck(e)} />} label={`${runningList[i].Name}`} />);
      }
    }
  };

  // create array to hold labels & boxes to render
  const containerSelectors = [];
  createContainerCheckboxes(id);

  const handleCheck = (e) => {
    const box = e.target;
    // if checkbox is changed to true add to button idList
    if (box.checked === true) {
      btnIdList.push(box.id);
      selectedContainerNames.push(box.name);
      setBtnIdList(btnIdList);
      setSelectedContainerNames(selectedContainerNames);
    } else {
      // else remove from button idList
      const newIdList = btnIdList.filter(container => container !== box.id);
      const newNameList = selectedContainerNames.filter(name => name !== box.name);
      setBtnIdList(newIdList);
      setSelectedContainerNames(newNameList);
    }
  };

  // Populating the StdOut Table Data Using stdout.map
  const tableData = () => {
    const newRows = [];
    const newCSV = [];

    stdout.forEach((log, index) => {
      const currCont = runningList.find(el => el.ID === log.containerName);
      newRows.push({
        container: currCont.Name,
        type: 'stdout',
        time: log.timeStamp,
        message: log.logMsg,
        id: `stdout ${index}`
      });
      newCSV.push([currCont.Name, 'stdout', log.timeStamp, log.logMsg]);
    });

    stderr.forEach((log, index) => {
      const currCont = runningList.find(el => el.ID === log.containerName);
      newRows.push({
        container: currCont.Name,
        type: 'stderr',
        time: log.timeStamp,
        message: log.logMsg,
        id: `stderr ${index}`
      });
      newCSV.push([currCont.Name, 'stderr', log.timeStamp, log.logMsg]);
    });

    setRows(newRows);
    setCsvData([[ 'container', 'type', 'time', 'message'], ...newCSV]);
    console.log('CSV data', csvData);
  };

  return (
    <div className='renderContainers'>

      <div className='settings-container'>
        <form>
          <input type='radio' id='sinceInput' name='logOption' />
          <label htmlFor='sinceInput'>Since</label>
          <input type='text' id='sinceText' />

          <input type='radio' id='tailInput' name='logOption' />
          <label htmlFor='tailInput'>Tail</label>
          <input type='text' id='tailText' />

          <FormGroup>
            {containerSelectors}  {/** Checkboxes for running containers */}
          </FormGroup>

          <button type='button' onClick={async () => {
            await handleGetLogs(btnIdList);
            tableData();
          }}>
            Get Logs
          </button>
          <h4>SelectedContainers: {selectedContainerNames}</h4>
          <CSVLink data={csvData}>Download to CSV</CSVLink>
        </form>

        <div
          className='process-logs-container'
          style={{ height: 500, width: '100%' }}
        >
          <DataGrid 
            key='DataGrid'
            rows={rows} 
            columns={columns} 
            getRowHeight={() => 'auto'}
            initialState={{
              sorting: {
                sortModel: [{ field: 'time', sort: 'desc' }], // default sorts table by time
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProcessLogsTable;

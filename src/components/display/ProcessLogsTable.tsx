import React, { useEffect, useState } from 'react';
import { buildOptionsObj } from '../helper/processLogHelper';
import useHelper from '../helper/commands';
import './ProcessLogsCard';
import useSurvey from '../helper/dispatch';
import { DataGrid } from '@mui/x-data-grid';
import { Checkbox, FormControlLabel, FormGroup } from '@mui/material'; // use for container selection
import { CSVLink } from 'react-csv';
import { ContainerType, RowsDataType } from '../../../types';
import { useAppSelector } from '../../redux/reducers/hooks';

/**
 * Displays process logs as table
 * @module ProcessLogsTable
 * @description Container that displays all running and not running docker containers. Each box is wrapped by
 * a Router link.
 */

const ProcessLogsTable = () => {
  const { getContainerLogsDispatcher } = useSurvey();
  // Select the clicked container
  const urlString = window.location.href;
  const containerID = urlString.split('/');
  const id = containerID[containerID.length - 1];

  // Access runningList from state - store has issue with runningList, ignore until updated
  const runningList = useAppSelector((state) => state.containers.runningList);
  const { getLogs } = useHelper();

  const [btnIdList, setBtnIdList] = useState([id]);
  const [rows, setRows] = useState([]);
  const [csvData, setCsvData] = useState([
    ['container', 'type', 'time', 'message'],
  ]);
  const [counter, setCounter] = useState(0);
  const { stdout, stderr } = useAppSelector(
    (state) => state.logs.containerLogs
  );

  // This will update the logs table after all logs have been pulled - there will be a lag before they render
  useEffect(() => {
    tableData();
  }, [counter, csvData.length]);

  // Get logs button handler function. Grabs logs and updates component state
  const handleGetLogs = async (idList: string[]) => {
    const optionsObj = buildOptionsObj(idList);

    // Using a promise as the process to pull the container logs takes a fair bit of time
    const containerLogs = await getLogs(optionsObj);
    getContainerLogsDispatcher(containerLogs);
    setCounter(counter + 1);
    return containerLogs;
  };

  const columns = [
    { field: 'container', headerName: 'Container', width: 150 },
    { field: 'type', headerName: 'Log Type', width: 120 },
    { field: 'time', headerName: 'Timestamp', width: 200 },
    { field: 'message', headerName: 'Message', width: 550 },
  ];

  const createContainerCheckboxes = (currId: string) => {
    // Iterate through runningList &  create label/checkbox for each one
    for (let i = 0; i < runningList.length; i++) {
      // By default, clicked container should be checked
      if (runningList[i].ID === currId) {
        containerSelectors.push(
          <FormControlLabel
            key={`FCL ${i}`}
            control={
              <Checkbox
                id={runningList[i].ID}
                name={runningList[i].Name}
                defaultChecked={true}
                onChange={(e) => handleCheck(e)}
              />
            }
            label={`${runningList[i].Name}`}
          />
        );
      } else {
        // By default, all others should be unchecked
        containerSelectors.push(
          <FormControlLabel
            key={`FCL ${i}`}
            control={
              <Checkbox
                id={runningList[i].ID}
                name={runningList[i].Name}
                defaultChecked={false}
                onChange={(e) => handleCheck(e)}
              />
            }
            label={`${runningList[i].Name}`}
          />
        );
      }
    }
  };

  // Create array to hold labels & boxes to render
  const containerSelectors: any[] = [];
  createContainerCheckboxes(id);

  // Handle checkboxes
  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const box = e.target;

    if (box.checked === true) {
      // If checkbox is changed to true => add to button idList
      btnIdList.push(box.id);
      setBtnIdList(btnIdList);
    } else {
      // else remove from button idList
      const newIdList = btnIdList.filter((container) => container !== box.id);
      setBtnIdList(newIdList);
    }
  };

  type CSVData = string[];

  // Populating the StdOut Table Data Using stdout.map
  const tableData = () => {
    const newRows: RowsDataType[] = [];
    const newCSV: CSVData[] = [];

    if (stdout) {
      stdout.forEach((log: { [k: string]: any }) => {
        const currCont = runningList.find(
          (el: ContainerType) => el.ID === log['containerName']
        );
        if (currCont) {
          newRows.push({
            container: currCont.Name,
            type: 'stdout',
            time: log['timeStamp'],
            message: log['logMsg'],
            id: Math.random() * 100,
          });
          newCSV.push([
            currCont.Name,
            'stdout',
            log['timeStamp'],
            log['logMsg'],
          ]);
        }
      });
    }
    if (stderr) {
      stderr.forEach((log: { [k: string]: any }, index: any) => {
        const currCont = runningList.find(
          (el: ContainerType) => el.ID === log['containerName']
        );
        if (currCont) {
          newRows.push({
            container: currCont.Name,
            type: 'stderr',
            time: log['timeStamp'],
            message: log['logMsg'],
            id: parseInt(index),
          });
          newCSV.push([
            currCont.Name,
            'stderr',
            log['timeStamp'],
            log['logMsg'],
          ]);
        }
      });
      console.log(newRows, 'setRows to newRows');

      setRows(newRows as keyof typeof setRows);
      setCsvData([['container', 'type', 'time', 'message'], ...newCSV]);
    }
  };

  return (
    <div className='renderContainers'>
      <div className='header'>
        <h1 className='tabTitle'>Container Process Logs</h1>
      </div>
      <div className='settings-container'>
        <form>
          <div className='log-timeframe'>
            <h3>Time Frame:</h3>
            <input
              style={{ margin: 5 }}
              type='radio'
              id='sinceInput'
              name='logOption'
            />
            <label style={{ margin: 5 }} htmlFor='sinceInput'>
              Since
            </label>
            <input type='text' id='sinceText' />
            <br></br>
            <input
              style={{ margin: 5 }}
              type='radio'
              id='tailInput'
              name='logOption'
            />
            <label style={{ margin: 5 }} htmlFor='tailInput'>
              Tail
            </label>
            <input style={{ marginLeft: 14 }} type='text' id='tailText' />
          </div>
          <br />
          <div className='log-containers'>
            <h3>Running Containers:</h3>
            <FormGroup style={{ display: 'flex', flexDirection: 'row' }}>
              {containerSelectors} {/** Checkboxes for running containers */}
            </FormGroup>
          </div>
          <br />
          <button
            className='etc-btn'
            id='getlogs-btn'
            type='button'
            onClick={() => {
              handleGetLogs(btnIdList);
            }}
          >
            GET LOGS
          </button>
          <button className='etc-btn' type='button'>
            <CSVLink
              style={{
                textDecoration: 'none',
                color: '#0064ff',
              }}
              data={csvData}
            >
              DOWNLOAD TO CSV
            </CSVLink>
          </button>
        </form>
      </div>
      <div className='settings-container'>
        <div
          className='process-logs-container'
          style={{ height: 660, width: '100%' }}
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

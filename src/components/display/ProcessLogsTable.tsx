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

  const [btnIdList, setBtnIdList] = useState([id] as any[]);
  const [rows, setRows] = useState([] as any[]);
  const [csvData, setCsvData] = useState([
    ['container', 'type', 'time', 'message'],
  ] as any[]);
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

  const createContainerCheckboxes = (currId: string) => {
    // Iterate through runningList &  create label/checkbox for each one
    runningList.forEach((container, i) => {
      // By default, clicked container should be checked
      if (container.ID === currId) {
        containerSelectors.push(
          <div className='form-control' key={i}>
            <label className='label cursor-pointer'>
              <span className='label-text'>{`${container.Name}`}</span>
              <input
                id={container.ID}
                type='checkbox'
                name={container.Name}
                checked
                className='checkbox checkbox-primary space-y-1 md:ml-2 md:space-y-0 md:space-x-1'
                onChange={(e) => handleCheck(e)}
              />
            </label>
          </div>
        );
      } else {
        // By default, all others should be unchecked
        containerSelectors.push(
          <div className='form-control' key={i}>
            <label className='label cursor-pointer'>
              <span className='label-text'>{`${container.Name}`}</span>
              <input
                type='checkbox'
                name={container.ID}
                className='checkbox checkbox-primary'
                onChange={(e) => handleCheck(e)}
              />
            </label>
          </div>
        );
      }
    });
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

      setRows(newRows as keyof typeof setRows);
      setCsvData([['container', 'type', 'time', 'message'], ...newCSV]);
    }
  };

  const renderRows = rows.map((row, i) => {
    return (
      <tbody key={i}>
        <tr>
          <td>{row.container}</td>
          <td>{row.type}</td>
          <td>{row.time}</td>
          <td>{row.message}</td>
        </tr>
      </tbody>
    );
  });

  return (
    <>
      <div className='h-3'></div>
      <div className='usersFlex flex flex-wrap gap-3'>
        <div className='card bg-neutral text-neutral-content rounded-lg flex-0'>
          <div className='card-body text-left space-y-2'>
            <h2 className='card-title text-sm'>RUNNING CONTAINER LIST</h2>
            <p className='text-xs w-full max-w-xs'>
              Please choose the running container(s) you would like to view
              process logs for.
            </p>
            <div className='divider py-5'></div>
            <div className='flex flex-wrap gap-1'>{containerSelectors}</div>
            <div className='divider py-2'></div>
            <div className='form-control'>
              <button
                className='btn btn-primary'
                type='button'
                id='getlogs-btn'
                onClick={() => handleGetLogs(btnIdList)}
              >
                GET LOGS
              </button>
            </div>
            <div className='form-control'>
              <button className='btn btn-primary' type='button'>
                <CSVLink data={csvData}>DOWNLOAD CSV</CSVLink>
              </button>
            </div>
          </div>
        </div>
        <div className='card bg-neutral text-neutral-content rounded-lg flex-0'>
          <div className='card-body text-left space-y-2'>
            <h2 className='card-title text-sm'>TIME FRAME SELECTION</h2>
            <div className='divider py-8'></div>
            <div className='form-control'>
              <label className='label cursor-pointer flex justify-between'>
                <input
                  type='radio'
                  name='logOption'
                  id='sinceInput'
                  className='radio primary radio-xs'
                />
                <span className='label-text font-bold text-xs'>SINCE</span>
                <input
                  type='text'
                  id='sinceText'
                  className='input input-bordered w-full max-w-xs'
                />
              </label>
            </div>
            <div className='form-control'>
              <label className='label cursor-pointer'>
                <input
                  type='radio'
                  name='logOption'
                  id='tailInput'
                  className='radio primary radio-xs'
                />
                <span className='label-text font-bold text-xs'>TAIL</span>
                <input
                  type='text'
                  id='tailText'
                  className='input input-bordered w-full max-w-xs'
                />
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className='py-1.5'></div>
      <div className='card bg-neutral text-neutral-content rounded-lg flex-1'>
        <div className='card-body space-y-2'>
          <h2 className='card-title text-sm'>CONTAINER PROCESS LOGS</h2>
          <div className='divider py-8'></div>
          <div className='items-center'>
            <div className='overflow-x-auto'>
              <table className='table max-w-full table-fixed'>
                <thead>
                  <tr>
                    <th className='text-xs'>CONTAINER</th>
                    <th className='text-xs'>LOG TYPE</th>
                    <th className='text-xs'>TIMESTAMP</th>
                    <th className='text-xs'>MESSAGE</th>
                  </tr>
                </thead>
                {renderRows}
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProcessLogsTable;

import React, { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../reducers/hooks';

import { createAlert } from '../../reducers/alertReducer';
import useHelper from '../helpers/commands';
import useSurvey from '../helpers/dispatch';
import { buildOptionsObj } from '../helpers/logs';

import { CSVLink } from 'react-csv';
import { ContainerType, RowsDataType } from '../../../types';
import './ProcessLogsCard';

/**
 * @module | ProcessLogsTable.tsx
 * @description | Provides process logs for running containers & configuration options to filter process logs
 **/

/*

containerName
: 
"10180290ca31"
logMsg
: 
"logger=context userId=0 orgId=1 uname= t=2023-03-13T21:50:10.802144512Z level=info msg=\"Request Completed\" method=POST path=/api/ds/query status=400 remote_addr=192.168.112.1 time_ms=249 duration=249.137435ms size=244 referer=\"http://localhost:2999/d/h5LcytHGz/system?kiosk=&orgId=1&refresh=10s\" handler=/api/ds/query"
timeStamp
: 
"3/13/2023, 9:50:10 PM"
*/

const ProcessLogsTable = () => {
  const dispatch = useAppDispatch();
  const { getContainerLogsDispatcher } = useSurvey();
  const { getLogs } = useHelper();

  const urlString = window.location.href;
  console.log({ urlString });
  const containerID = urlString.split('/');
  console.log({ containerID });

  const id = containerID[containerID.length - 1];

  const runningList = useAppSelector((state) => state.containers.runningList);
  const { stdout, stderr } = useAppSelector(
    (state) => state.logs.containerLogs
  );

  // btnIdList = boxes that are checked
  const [btnIdList, setBtnIdList] = useState([id] as any[]);
  const [rows, setRows] = useState([] as any[]);
  const [csvData, setCsvData] = useState([
    ['container', 'type', 'time', 'message'],
  ] as any[]);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    tableData();
  }, [counter, csvData.length]);

  // Requests logs from server
  // idList = btnIdList
  const handleGetLogs = async (idList: string[]) => {
    const optionsObj = buildOptionsObj(idList);
    const containerLogs = await getLogs(optionsObj);
    console.log({ containerLogs });
    getContainerLogsDispatcher(containerLogs);
    setCounter(counter + 1);
    return containerLogs;
  };

  // Create checkbox for running containers
  const createContainerCheckboxes = (currId: string) => {
    runningList.forEach((container, i) => {
      if (container.ID === currId) {
        containerSelectors.push(
          <div className="form-control" key={i}>
            <label className="label cursor-pointer">
              <span className="label-text">{`${container.Names}`}</span>
              <input
                id={container.ID}
                type="checkbox"
                name={container.Names}
                checked
                className="checkbox checkbox-primary space-y-1 md:ml-2 md:space-y-0 md:space-x-1"
                onChange={(e) => handleCheck(e)}
              />
            </label>
          </div>
        );
      } else {
        containerSelectors.push(
          <div className="form-control" key={i}>
            <label className="label cursor-pointer">
              <span className="label-text">{`${container.Names}`}</span>
              <input
                type="checkbox"
                name={container.ID}
                className="checkbox checkbox-primary"
                onChange={(e) => handleCheck(e)}
              />
            </label>
          </div>
        );
      }
    });
  };

  // Helper function to hold array of checkboxes to render within returned JSX
  const containerSelectors: any[] = [];
  createContainerCheckboxes(id);

  // Handle checkboxes
  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const box = e.target;

    if (box.checked === true) {
      btnIdList.push(box.id);
      setBtnIdList(btnIdList);
    } else {
      const newIdList = btnIdList.filter((container) => container !== box.id);
      setBtnIdList(newIdList);
    }
  };

  type CSVData = string[];

  // Create table data to render, based on either stdout or stderr
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
            container: currCont.Names,
            type: 'stdout',
            time: log['timeStamp'],
            message: log['logMsg'],
            id: Math.random() * 100,
          });
          newCSV.push([
            currCont.Names,
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
            container: currCont.Names,
            type: 'stderr',
            time: log['timeStamp'],
            message: log['logMsg'],
            id: parseInt(index),
          });
          newCSV.push([
            currCont.Names,
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
      <div className="h-3"></div>
      <div className="usersFlex flex flex-wrap gap-3">
        <div className="card bg-neutral text-neutral-content rounded-lg">
          <div className="card-body text-left space-y-2">
            <h2 className="card-title text-sm">RUNNING CONTAINER LIST</h2>
            <p className="text-xs w-full max-w-xs">
              Please choose the running container(s) you would like to view
              process logs for.
            </p>
            <div className="divider py-5"></div>
            <div className="flex flex-wrap gap-1">{containerSelectors}</div>
            <div className="form-control">
              <button
                className="btn btn-primary"
                type="button"
                id="getlogs-btn"
                onClick={() => {
                  dispatch(
                    createAlert(
                      'Loading process log information...',
                      5,
                      'success'
                    )
                  );
                  handleGetLogs(btnIdList);
                }}
              >
                GET LOGS
              </button>
            </div>
            <div className="form-control">
              <button className="btn btn-primary" type="button">
                <CSVLink data={csvData}>DOWNLOAD CSV</CSVLink>
              </button>
            </div>
          </div>
        </div>
        <div className="card bg-neutral text-neutral-content rounded-lg">
          <div className="card-body text-left space-y-2">
            <h2 className="card-title text-sm">TIME FRAME SELECTION</h2>
            <div className="divider py-8"></div>
            <div className="form-control">
              <label className="label cursor-pointer flex justify-between">
                <input
                  type="radio"
                  name="logOption"
                  id="sinceInput"
                  className="radio primary radio-xs"
                />
                <span className="label-text font-bold text-xs">SINCE</span>
                <input
                  type="text"
                  id="sinceText"
                  className="input input-bordered w-full max-w-xs"
                />
              </label>
            </div>
            <div className="form-control">
              <label className="label cursor-pointer">
                <input
                  type="radio"
                  name="logOption"
                  id="tailInput"
                  className="radio primary radio-xs"
                />
                <span className="label-text font-bold text-xs">TAIL</span>
                <input
                  type="text"
                  id="tailText"
                  className="input input-bordered w-full max-w-xs"
                />
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="card bg-neutral text-neutral-content rounded-lg">
        <div className="card-body space-y-2">
          <h2 className="card-title text-sm">CONTAINER PROCESS LOGS</h2>
          <div className="items-center">
            <div className="overflow-x-auto">
              <table className="table max-w-full table-fixed mb-20">
                <thead>
                  <tr>
                    <th className="text-xs">CONTAINER</th>
                    <th className="text-xs">LOG TYPE</th>
                    <th className="text-xs">TIMESTAMP</th>
                    <th className="text-xs">MESSAGE</th>
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

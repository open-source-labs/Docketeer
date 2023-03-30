import React, { useEffect, useState } from 'react';
import ProcessLogsCard from '../ProcessLogsCard/ProcessLogsCard';
import ProcessLogsSelector from '../ProcessLogsSelector/ProcessLogsSelector';
import {
  ContainerType,
  RowsDataType,
  CSVDataType,
  stdType,
} from '../../../types';
import { useAppSelector, useAppDispatch } from '../../reducers/hooks';

import { createAlert } from '../../reducers/alertReducer';
import useHelper from '../../helpers/commands';
import useSurvey from '../../helpers/dispatch';
// import { buildOptionsObj } from '../../helpers/logs';

import { CSVLink } from 'react-csv';

import styles from './ProcessLogs.module.scss';
import globalStyles from '../global.module.scss';

/**
 * @module | Metrics.tsx
 * @description | Provides process logs for running containers & additional configuration options
**/

const ProcessLogs = (): JSX.Element => {
  const { runningList, stoppedList } = useAppSelector(
    (state) => state.containers
  );
  const { stdout, stderr } = useAppSelector(
    (state) => state.logs.containerLogs
  );
  const runningBtnList = getContainerNames(runningList);

  // helper func for handling the checkboxes, checking a box sets the property to true & vice versa
  function getContainerNames(containerList: ContainerType[]): {
    name: string;
    value: boolean;
  }{
    const newObj = {};
    containerList.forEach(({ Names }) => newObj[Names] = false);
    return newObj;
  }

  const [btnIdList, setBtnIdList] = useState<object>(runningBtnList);
  const [timeFrameNum, setTimeFrameNum] = useState<string>('');
  const [timeFrame, setTimeFrame] = useState<string>('');
  const [rows, setRows] = useState([] as JSX.Element[]);
  const [csvData, setCsvData] = useState([
    ['container', 'type', 'time', 'message'],
  ] as CSVDataType[]);
  const [counter, setCounter] = useState(0);

  const { getContainerLogsDispatcher } = useSurvey();
  const { getLogs } = useHelper();
  const dispatch = useAppDispatch();

  useEffect(() => {
    tableData();
  }, [counter, csvData.length]);


  // helper func to create a single object to send to the backend
  const buildOptionsObj = (containerNames: string[], timeFrame?: string) => {
    const optionsObj = {
      containerNames: containerNames,
      since: timeFrame,
    };

    if (timeFrame) optionsObj.since = timeFrame;

    return optionsObj;
  };

  // takes in a btnIdList, passes that into buildObptionObj
  const handleGetLogs = async (idList: object) => {
    console.log('getting logs');
    console.log('idList: ', idList);
    const idArr = Object.keys(idList).filter((el) => idList[el] === true);

    dispatch(createAlert('Loading process log information...', 5, 'success'));

    const optionsObj = buildOptionsObj(idArr, createTimeFrameStr(timeFrameNum, timeFrame));
    const containerLogs = await getLogs(optionsObj);


    getContainerLogsDispatcher(containerLogs);
    setCounter(counter + 1);


    return containerLogs;
  };

  // Handle checkboxes
  const handleCheck = (name: string) => {
    const newBtnIdList = { ...btnIdList };


    if (newBtnIdList[name]) {
      newBtnIdList[name] = false;
    } else {
      newBtnIdList[name] = true;
    }

    setBtnIdList(newBtnIdList);
  };

  // creates an array of log messages and saves it to state
  // creates an array of log messages and saves it to state
  const tableData = () => {
    const newRows: RowsDataType[] = [];
    const newCSV: CSVDataType[] = [];
    const newCSV: CSVDataType[] = [];

    if (stdout.length) {
      stdout.forEach((log: stdType) => {
      stdout.forEach((log: stdType) => {
        const currCont = runningList.find(
          (el: ContainerType) => el.Names === log['containerName']
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
    if (stderr.length) {
      stderr.forEach((log: stdType) => {
      stderr.forEach((log: stdType) => {
        const currCont = runningList.find(
          (el: ContainerType) => el.Names === log['containerName']
        );
        if (currCont) {
          newRows.push({
            container: currCont.Names,
            type: 'stderr',
            time: log['timeStamp'],
            message: log['logMsg'],
            id: Math.random() * 100,
            id: Math.random() * 100,
          });
          newCSV.push([
            currCont.Names,
            'stderr',
            log['timeStamp'],
            log['logMsg'],
          ]);
        }
      });
    }
    setRows(newRows as keyof typeof setRows);
    setCsvData([['container', 'type', 'time', 'message'], ...newCSV]);
    setRows(newRows as keyof typeof setRows);
    setCsvData([['container', 'type', 'time', 'message'], ...newCSV]);
  };


  return (
    <div className={styles.wrapper}>
      <div className={styles.runningContainersHolder}>
        <div className={styles.runningLeft}>
          <h2>RUNNING CONTAINERS</h2>
          <div>Count: {runningList.length}</div>
          <p>
            Please choose the container(s) you would like to view process logs
            for.
          </p>
          <ProcessLogsSelector
            containerList={runningList}
            handleCheck={handleCheck}
            btnIdList={btnIdList}
            status="Running"
          />

          <ProcessLogsSelector
            containerList={stoppedList}
            handleCheck={handleCheck}
            btnIdList={btnIdList}
            status="Stopped"
          />

          <div className={styles.buttonHolder}>
            <button
              className={globalStyles.button1}
              type="button"
              id="getlogs-btn"
              onClick={() => {
                handleGetLogs(btnIdList);
              }}
            >
              GET LOGS
            </button>
            <button className={globalStyles.button2} type="button">
              <CSVLink data={csvData}>DOWNLOAD CSV</CSVLink>
            </button>
          </div>
        </div>
        <div className={styles.runningRight}>
          <h2>TIME FRAME SELECTION</h2>
          <p>
            Please specify a timeframe that you would like to see process logs within.
          </p>
          {/* TODO: rename labels if neccessary */}
          <label htmlFor="num">NUM</label>
          <input
            onChange={(e) => setTimeFrameNum(e.target.value)}
            className={globalStyles.inputShort}
            type="text"
            id="num"
          />
          <label htmlFor="logOption">TIME FRAME:</label>
          <input
            onChange={(e) => setTimeFrame(e.target.value)}
            type="radio"
            name="logOption"
            value="m"
          />
          Minutes
          <input
            onChange={(e) => setTimeFrame(e.target.value)}
            type="radio"
            name="logOption"
            value="h"
          />
          Hours
          <input
            onChange={(e) => setTimeFrame(e.target.value)}
            type="radio"
            name="logOption"
            value="d"
          />
          Days
        </div>
      </div>
      <div className={styles.logsHolder}>
        <h2>CONTAINER PROCESS LOGS</h2>
        <div className={styles.tableHolder}>
          <table className={globalStyles.table}>
            <thead>
              <tr>
                <th>CONTAINER</th>
                <th>LOG TYPE</th>
                <th>TIMESTAMP</th>
                <th>MESSAGE</th>
              </tr>
            </thead>
            {rows.map((row, i) => {
              return (
                <tbody key={`row-${i}`}>
                  <tr>
                    <td>{row.container}</td>
                    <td>{row.type}</td>
                    <td>{row.time}</td>
                    <td>{row.message}</td>
                  </tr>
                </tbody>
              );
            })}
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProcessLogs;

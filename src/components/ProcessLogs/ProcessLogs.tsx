import React, { useEffect, useState } from 'react';
import ProcessLogsCard from '../ProcessLogsCard/ProcessLogsCard';
import ProcessLogsSelector from '../ProcessLogsSelector/ProcessLogsSelector';
import { ContainerType, RowsDataType } from '../../../types';
import { useAppSelector, useAppDispatch } from '../../reducers/hooks';

import { createAlert } from '../../reducers/alertReducer';
import useHelper from '../helpers/commands';
import useSurvey from '../helpers/dispatch';
import { buildOptionsObj } from '../helpers/logs';

import { CSVLink } from 'react-csv';

import styles from './ProcessLogs.module.scss';
import globalStyles from '../global.module.scss';

/**
 * @module | Metrics.tsx
 * @description | Provides process logs for running containers & additional configuration options
 **/

type CSVData = string[];

const ProcessLogs = (): JSX.Element => {
  const { runningList, stoppedList } = useAppSelector(
    (state) => state.containers
  );
  // console.log('runningList: ', runningList);

  const dispatch = useAppDispatch();
  const { getContainerLogsDispatcher } = useSurvey();
  const { getLogs } = useHelper();

  // const id = containerID[containerID.length - 1];
  // I need to pass in array of object names
  // make object with name and wether or not they're checked

  // const runningList = useAppSelector((state) => state.containers.runningLibtnIdListst);
  const { stdout, stderr } = useAppSelector(
    (state) => state.logs.containerLogs
  );
  // console.log('stdout: ', stdout);
  // console.log('stderr: ', stderr);

  // there is an issue because the container list passed down is empty if the user navigates to this page directly. Somethine with the set timeout in the useEffect in the App.tsx file. Maybe a way to pass the container list down as props to this component?
  function getContainerNames(containerList: ContainerType[]): {
    name: string;
    value: boolean;
  } {
    // console.log('containerList: ', containerList);
    const newObj = {};
    containerList.forEach(({ Names }) => {
      newObj[Names] = false;
    });
    return newObj;
  }

  const runningBtnList = getContainerNames(runningList);

  // btnIdList = boxes that are checked
  const [btnIdList, setBtnIdList] = useState<object>(runningBtnList);

  const [rows, setRows] = useState([] as any[]);
  const [csvData, setCsvData] = useState([
    ['container', 'type', 'time', 'message'],
  ] as any[]);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    tableData();
  }, [counter, csvData.length]);

  /*
        export const buildOptionsObj = (containerNames: string[]) => {
        const optionsObj = {
          containerNames: containerNames,
        };

      / if (document.getElementById('sinceInput').checked) {
          const sinceValue = document.getElementById('sinceText').value;
          optionsObj.since = sinceValue;
        } else if (document.getElementById('tailInput').checked) {
          const tailValue = document.getElementById('tailText').value;
          optionsObj.tail = tailValue;
        }
  */
  // takes in a btnIdList, passes that into buildObptionObj, then passes that into getLogs
  const handleGetLogs = async (idList: object) => {
    const idArr = Object.keys(idList).filter((el) => idList[el] === true);
    // console.log('idArr: ', idArr);
    dispatch(createAlert('Loading process log information...', 5, 'success'));
    // takes array of names and create obj
    const optionsObj = buildOptionsObj(idArr);
    // console.log('idList', idList);
    // console.log('optionsObj', optionsObj);
    const containerLogs = await getLogs(optionsObj);
    // console.log('hello', containerLogs);
    getContainerLogsDispatcher(containerLogs);
    setCounter(counter + 1);
    return containerLogs;
  };

  // Handle checkboxes
  const handleCheck = (name: string) => {
    // console.log('event!: ', e);
    // console.log('btnIdList new name: ', name);
    const newBtnIdList = { ...btnIdList };
    if (newBtnIdList[name]) {
      newBtnIdList[name] = false;
    } else {
      newBtnIdList[name] = true;
    }
    // console.log('btnIdList', newBtnIdList);

    setBtnIdList(newBtnIdList);
  };

  const tableData = () => {
    const newRows: RowsDataType[] = [];
    const newCSV: CSVData[] = [];

    // console.log('pls', stdout.length, stderr.length);
    if (stdout.length) {
      stdout.forEach((log: { [k: string]: any }) => {
        const currCont = runningList.find(
          (el: ContainerType) => el.Names === log['containerName']
        );
        // console.log('currCont', currCont);
        // console.log('runningList in tableData', runningList);
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
      stderr.forEach((log: { [k: string]: any }, index: any) => {
        const currCont = runningList.find(
          (el: ContainerType) => el.Names === log['containerName']
        );
        // console.log('currCont stderr', currCont);
        // console.log('runningList in tableData stderr', runningList);
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

      // console.log('newRows', newRows);
      setRows(newRows as keyof typeof setRows);
      // console.log('rows after setRows', rows);
      setCsvData([['container', 'type', 'time', 'message'], ...newCSV]);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.runningContainersHolder}>
        <div className={styles.runningLeft}>
          <h2>RUNNING CONTAINERS</h2>
          <div>Count: {runningList.length}</div>
          <p>
            Please choose the running container(s) you would like to view
            process logs for.
          </p>
          <ProcessLogsSelector
            containerList={runningList}
            handleCheck={handleCheck}
            btnIdList={btnIdList}
          />

          <div className={styles.runningButtons}>
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
          <label>
            <input type="radio" name="logOption" id="sinceInput" />
            <span>SINCE</span>
            <input type="text" id="sinceText" />
          </label>
          <label>
            <input type="radio" name="logOption" id="tailInput" />
            <span>TAIL</span>
            <input type="text" id="tailText" />
          </label>
        </div>
      </div>
      <div className={styles.logsHolder}>
        <h2>CONTAINER PROCESS LOGS</h2>
        <table>
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
              <tbody key={i}>
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
      <div className={styles.stoppedContainersHoler}>
        <h2>STOPPED CONTAINERS</h2>
        <div>Count: {stoppedList.length}</div>

        <div className={styles.cardHolder}>
          {stoppedList.map(
            (container: ContainerType, index: number): JSX.Element => (
              <ProcessLogsCard
                key={index}
                index={index}
                container={container}
                status="Stopped"
              />
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default ProcessLogs;

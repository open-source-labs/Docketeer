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
  console.log('runningList: ', runningList);

  const dispatch = useAppDispatch();
  const { getContainerLogsDispatcher } = useSurvey();
  const { getLogs } = useHelper();

  const dispatch = useAppDispatch();
  const { getContainerLogsDispatcher } = useSurvey();
  const { getLogs } = useHelper();

  // const id = containerID[containerID.length - 1];

  // const runningList = useAppSelector((state) => state.containers.runningLibtnIdListst);
  const { stdout, stderr } = useAppSelector(
    (state) => state.logs.containerLogs
  );

  // btnIdList = boxes that are checked
  const [btnIdList, setBtnIdList] = useState<string[]>([]);
  const [rows, setRows] = useState([] as any[]);
  const [csvData, setCsvData] = useState([
    ['container', 'type', 'time', 'message'],
  ] as any[]);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    tableData();
  }, [counter, csvData.length]);

  // takes in a btnIdList, passes that into buildObptionObj, then passes that into getLogs
  const handleGetLogs = async (idList: string[]) => {
    dispatch(createAlert('Loading process log information...', 5, 'success'));
    const optionsObj = buildOptionsObj(idList);
    const containerLogs = await getLogs(optionsObj);
    console.log({ containerLogs });
    getContainerLogsDispatcher(containerLogs);
    setCounter(counter + 1);
    return containerLogs;
  };

  // Handle checkboxes
  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('current test: ', btnIdList);
    const box = e.target;
    console.log('current test: ', box);
    if (box.checked === true) {
      btnIdList.push(box.id);
      setBtnIdList(btnIdList);
    } else {
      const newIdList = btnIdList.filter((container) => container !== box.id);
      setBtnIdList(newIdList);
    }
  };

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
          <p>'-----'</p>
          <p>'-----'</p>
          <p>'-----'</p>
          <div className={styles.runningList}>
            {runningList.map((container, i) => {
              console.log('container!!: ', container);
              return (
                <div key={i}>
                  <label>
                    <span>{container.Names}</span>
                    <input
                      type="checkbox"
                      name={container.ID}
                      onChange={(e) => handleCheck(e)}
                    />
                  </label>
                </div>
              );
            })}
          </div>
          <div className={styles.runningButtons}>
            <button
              type="button"
              id="getlogs-btn"
              onClick={() => {
                handleGetLogs(btnIdList);
              }}
            >
              GET LOGS
            </button>
            <button type="button">
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

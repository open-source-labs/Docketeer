import React, { useEffect, useState } from 'react';
import ProcessLogsCard from '../ProcessLogsCard/ProcessLogsCard';
import ProcessLogsSelector from '../ProcessLogsSelector/ProcessLogsSelector';
import { ContainerType, RowsDataType } from '../../../types';
import { useAppSelector, useAppDispatch } from '../../reducers/hooks';

import { createAlert } from '../../reducers/alertReducer';
import useHelper from '../../helpers/commands';
import useSurvey from '../../helpers/dispatch';
import { buildOptionsObj } from '../../helpers/logs';

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
  const { stdout, stderr } = useAppSelector(
    (state) => state.logs.containerLogs
  );

  const runningBtnList = getContainerNames(runningList);

  const [btnIdList, setBtnIdList] = useState<object>(runningBtnList);
  const [timeFrame, setTimeFrame] = useState('10m' as string);
  const [rows, setRows] = useState([] as any[]);
  const [csvData, setCsvData] = useState([
    ['container', 'type', 'time', 'message'],
  ] as any[]);
  const [counter, setCounter] = useState(0);

  const { getContainerLogsDispatcher } = useSurvey();
  const { getLogs } = useHelper();
  const dispatch = useAppDispatch();


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


  useEffect(() => {
    tableData();
  }, [counter, csvData.length]);

  // TODO: make since and tail react controller forms. Will have to change the way the options object is built to take in arguments instead of querying the dom. React shouldn't query the dom so it's two problems at once.

  // takes in a btnIdList, passes that into buildObptionObj, then passes that into getLogs
  const handleGetLogs = async (idList: object) => {
    const idArr = Object.keys(idList).filter((el) => idList[el] === true);

    dispatch(createAlert('Loading process log information...', 5, 'success'));

    const optionsObj = buildOptionsObj(idArr, timeFrame);
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

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log('e.target.value: ', e.target.value)
    setTimeFrame(e.target.value);
  };

  const tableData = () => {
    const newRows: RowsDataType[] = [];
    const newCSV: CSVData[] = [];

    if (stdout.length) {
      stdout.forEach((log: { [k: string]: any }) => {
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
      stderr.forEach((log: { [k: string]: any }, index: any) => {
        const currCont = runningList.find(
          (el: ContainerType) => el.Names === log['containerName']
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
    }
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
          <p>
            Please choose since when or the of the container(s) you would like
            to view process logs for.
          </p>

          <select onChange={(e) => handleChange(e)}>
            <option value="10m">10 minutes</option>
            <option value="1h">1 hour</option>
            <option value="3h">3 hours</option>
            <option value="5h">5 hours</option>
            <option value="24h">1 day</option>
          </select>

          {/* <label>
            <input type="radio" name="logOption" id="sinceInput" />
            <span>SINCE: </span>
            <input
              className={globalStyles.inputShort}
              type="text"
              id="sinceText"
            />
          </label>
          <label>
            <input type="radio" name="logOption" id="tailInput" />
            <span>TAIL: </span>
            <input
              className={globalStyles.inputShort}
              type="text"
              id="tailText"
            />
          </label> */}
        </div>
      </div>
      <div className={styles.logsHolder}>
        <h2>CONTAINER PROCESS LOGS</h2>
        <table className={styles.table}>
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
              <tbody key={`${row - i}`}>
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

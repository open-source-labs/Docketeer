import React, { useEffect, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import dayjsPluginUTC from 'dayjs-plugin-utc';
dayjs.extend(dayjsPluginUTC);
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { ThemeProvider, createTheme } from '@mui/system';

import ProcessLogsSelector from '../ProcessLogsSelector/ProcessLogsSelector';
import {
  ContainerType,
  RowsDataType,
  CSVDataType,
  stdType,
} from '../../../ui-types';
import { useAppSelector, useAppDispatch } from '../../reducers/hooks';
import { createAlert } from '../../reducers/alertReducer';
import useHelper from '../../helpers/commands';
import useSurvey from '../../helpers/dispatch';

import { CSVLink } from 'react-csv';
import styles from './ProcessLogs.module.scss';
import globalStyles from '../global.module.scss';
import { todo } from 'node:test';

/**
 * @module | Metrics.tsx
 * @description | Provides process logs for running containers & additional configuration options
 **/

const ProcessLogs = (): JSX.Element => {
  const { runningList, stoppedList } = useAppSelector(
    state => state.containers,
  );
  const { stdout, stderr } = useAppSelector(state => state.logs.containerLogs);
  const runningBtnList: any = getContainerNames(runningList);
  // helper func for handling the checkboxes, checking a box sets the property to true & vice versa
  function getContainerNames(containerList: ContainerType[]): {
    name: string;
    value: boolean;
  } {
    // type assertion saying treat {} as { name: string; value: boolean; }
    const newObj = {} as { name: string; value: boolean };
    containerList.forEach(({ Names }) => (newObj[Names] = false));
    return newObj;
  }

  const [btnIdList, setBtnIdList] = useState<Array<object>>(runningBtnList);
  const [timeFrameNum, setTimeFrameNum] = useState<string>('');
  const [timeFrame, setTimeFrame] = useState<string>('');
  // );
  // start date
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  // end date
  const [stopDate, setStopDate] = useState<Dayjs | null>(null);
  // process log rows
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

  /**
   * @abstract Takes array of nums and a timeframe and creates an object with container names
   *           since a timeframe expressed as a string
   * @todo if (timeframe) could be source of error?
   * @toBeReplaced with timespace, null values gets all logs, start will since, stop would be until, start and stop would be a timeframe
   *
   * input: container names: array of strings, startDate: dayJs | null, stopDate: dayJs | null
   * output: optionsObj
   *
   */
  const buildOptionsObj = (
    containerNames: string[],
    offset: string,
    startD?: string,
    stopD?: string,
  ) => {
    // create optionsObj, container names are selected containers,
    const optionsObj = {
      containerNames: containerNames,
      start: startD,
      stop: stopD,
      offset: offset,
    };

    return optionsObj;
  };

  // takes in a btnIdList, passes that into buildObptionObj
  /**
   * @todo: remove console log tests after linkined with the backend
   * input: idList, Object => btnIdList,
   */
  const handleGetLogs = async (idList: object) => {
    const idArr = Object.keys(idList).filter(el => idList[el] === true);
    const date = new Date();

    dispatch(createAlert('Loading process log information...', 2, 'success'));

    const optionsObj = buildOptionsObj(
      idArr,
      date.getTimezoneOffset().toString(),
      startDate.format('YYYY-MM-DDTHH:mm:ss'),
      stopDate.format('YYYY-MM-DDTHH:mm:ss'),
    );
    // console.log(optionsObj); // console.log test
    const containerLogs: any = await getLogs(optionsObj);

    getContainerLogsDispatcher(containerLogs);
    setCounter(counter + 1);

    return containerLogs;
    // return; // console.log test
  };

  /**
   * @toBeReplaced or deleted
   **/
  // // create the time frame string to be used in the docker logs command (e.g. 'docker logs <containerName> --since <timeFrameStr>')
  const createTimeFrameStr = (num, option) =>
    option === 'd' ? `${num * 24}h` : `${num}${option}`;

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
  const tableData = () => {
    const newRows: RowsDataType[] = [];
    const newCSV: CSVDataType[] = [];

    const combinedList = [...runningList, ...stoppedList];

    if (stdout.length) {
      stdout.forEach((log: stdType) => {
        const currCont = combinedList.find(
          (el: ContainerType) => el.Names === log['containerName'],
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
        const currCont = combinedList.find(
          (el: ContainerType) => el.Names === log['containerName'],
        );
        if (currCont) {
          newRows.push({
            container: currCont.Names,
            type: 'stderr',
            time: log['timeStamp'],
            message: log['logMsg'],
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
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.runningContainersHolder}>
        <div className={styles.runningLeft}>
          <h2>CONTAINERS</h2>
          {/* <div>Count: {runningList.length}</div> */}
          <p>
            Please choose the container(s) you would like to view process logs
            for and optionally select the time frame.
          </p>
          {/* date selectors */}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              label='Start'
              value={startDate}
              sx={{ width: '200px' }}
              onChange={newStart => {
                setStartDate(newStart);
              }}
            />
          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              label='Stop'
              value={stopDate}
              sx={{ width: '200px' }}
              onChange={newStop => {
                setStopDate(newStop);
              }}
            />
          </LocalizationProvider>
          <div className={styles.selectors}>
            <ProcessLogsSelector
              containerList={runningList}
              handleCheck={handleCheck}
              btnIdList={btnIdList}
              status='Running'
            />
            <ProcessLogsSelector
              containerList={stoppedList}
              handleCheck={handleCheck}
              btnIdList={btnIdList}
              status='Stopped'
            />
          </div>

          <div className={styles.buttonHolder}>
            <button
              className={globalStyles.button1}
              type='button'
              id='getlogs-btn'
              onClick={() => {
                handleGetLogs(btnIdList);
              }}>
              GET LOGS
            </button>
            <button className={globalStyles.button2} type='button'>
              <CSVLink data={csvData}>DOWNLOAD CSV</CSVLink>
            </button>
          </div>
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
            {rows.map((row: any, i) => {
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

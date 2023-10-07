import React, { useEffect, useState, useRef } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import dayjsPluginUTC from 'dayjs-plugin-utc';
dayjs.extend(dayjsPluginUTC);
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { ThemeProvider, createTheme } from '@mui/material/styles';
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
import { setSearchWord } from '../../reducers/logReducer';
import { CSVLink } from 'react-csv';
import styles from './ProcessLogs.module.scss';
import globalStyles from '../global.module.scss';
import { set } from 'immer/dist/internal';
import { textAlign } from '@mui/system';
import Client from '../../models/Client';
// import { todo } from 'node:test';

/**
 * @module | Metrics.tsx
 * @description | Provides process logs for running containers & additional configuration options
 **/

const ProcessLogs = (): JSX.Element => {
  // STATE
  const { searchWord } = useAppSelector(store => store.logs);
  // Redux toolkit, useAppSelector -
  const { runningList, stoppedList } = useAppSelector(
    state => state.containers,
  );
  const { stdout, stderr } = useAppSelector(state => state.logs.containerLogs);
  // DISPATCH
  const dispatch = useAppDispatch();
  // const checked = useRef<boolean | null>();

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
  // start date
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  // end date
  const [stopDate, setStopDate] = useState<Dayjs | null>(null);
  // process log rows
  const [rows, setRows] = useState([]);
  // csvData state
  const [csvData, setCsvData] = useState([
    [true, 'container', 'type', 'time', 'message'],
  ] as CSVDataType[]);

  const [counter, setCounter] = useState(0);
  const { getContainerLogsDispatcher } = useSurvey();
  const { getLogs } = useHelper();
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  const [checked, setChecked] = useState([]); // checkbox array state, needed for select all

  const [filteredDisplay, setFilteredDisplay] = useState<any>([]);

  const [csvSent, setCSVSent] = useState([]);

  /**
   * @abstract run tableData function when counter, csvData.length is changed (not when setCsvData is used)
   */
  useEffect(() => {
    tableData();
  }, [counter]);

  /**
   * @abstract use effect, rerender on change to rows.length
   */
  useEffect(() => {
    setFilteredDisplay(rows);
    setCsvData(toCSVArray(rows));
  }, [rows.length]);

  /**
   * @abstract Takes array of nums and a timeframe and creates an object with container names
   *           since a timeframe expressed as a string
   */
  const buildOptionsObj = (
    containerNames: string[],
    offset: number,
    startD?: string,
    stopD?: string,
  ) => {
    // create optionsObj, container names are selected containers, start time, stop time, offset is local utc offset in minutes
    const optionsObj = {
      containerNames: containerNames,
      start: startD,
      stop: stopD,
      offset: offset,
    };
    return optionsObj;
  };

  /**
   * @abstract: takes in a btnIdList, passes that into buildObptionObj
   */
  const handleGetLogs = async (idList: object) => {
    const idArr = Object.keys(idList).filter(el => idList[el] === true);
    const date = new Date();
    // pop-up
    dispatch(createAlert('Loading process log information...', 1, 'success'));

    const optionsObj = buildOptionsObj(
      idArr,
      date.getTimezoneOffset(),
      startDate ? startDate.format('YYYY-MM-DDTHH:mm:ss') + 'Z' : null,
      stopDate ? stopDate.format('YYYY-MM-DDTHH:mm:ss') + 'Z' : null,
    );

    const containerLogs: any = await Client.ContainerService.getLogs(optionsObj.containerNames, optionsObj.start, optionsObj.stop, optionsObj.offset);
    getContainerLogsDispatcher(containerLogs); // Custom object type in ./ui/ui-types.ts
    setCounter(counter + 1);
    
    return containerLogs;
  };

  /**
   * @abstract: Handle Checkboxes, changes boolean in btnIdList when passed in a name
   */
  const handleCheck = (name: string) => {
    const newBtnIdList = { ...btnIdList };

    if (newBtnIdList[name]) {
      newBtnIdList[name] = false;
    } else {
      newBtnIdList[name] = true;
    }

    setBtnIdList(newBtnIdList);
  };

  const [selectAll, setSelectAll] = useState(false);

  /**
   * @abstract handles individual log check in Process Logs.
   * 
   */
  const handleCheckedLogs = (row: number, e: boolean) => {
    // modify in csvData array
    csvData[row][0] = e;
    // create a new checked array with the change
    const newChecked = checked.map((c, i) => {
      if (i === row) {
        return e;
      } else {
        return c;
      }
    });
    setChecked(newChecked);

    // check if all boxes are the same.
    let isAllSelect = true;
    for (let i = 0; i < newChecked.length; i++) {
      if (!newChecked[i]) {
        isAllSelect = false;
        break;
      }
    }
    setSelectAll(isAllSelect);
  };

  

  const handleCsv = () => {
    const newCsvSent: CSVDataType[] = []; // add type later
    for (let i = 0; i < csvData.length; i++) {
      if (csvData[i][0] === true) {
        newCsvSent.push(csvData[i].slice(1));
      }
    }
    setCSVSent(newCsvSent);
  };

  /**
   * @abstract: Creates an array of log messages and saves it to state
   * Output: setsRows: for process logs table, setCsvData: chooses CSV data
   */
  const tableData = () => {
    // declare const newRows, and newCSV which are arrays of RowsDataType and CSVDataType
    const newRows: RowsDataType[] = [];
    const newCSV: CSVDataType[] = [];

    // combined list of running and stopped containers
    const combinedList = [...runningList, ...stoppedList];
    // if s
    if (stdout && stderr) {
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
              id: Math.random() * 100, // why?
            });
            newCSV.push([
              true,
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
              id: Math.random() * 100, // why?
            });
            newCSV.push([
              true,
              currCont.Names,
              'stderr',
              log['timeStamp'],
              log['logMsg'],
            ]);
          }
        });
      }
    } else {
      console.log('Undefined stdout/stderr: ', stdout, stderr);
    }
    setRows(newRows); // sets  Rows to newRows, populated with the forEach functions
  };

  /**
   * @abstract returns array with container, type, time, message when passed in an array
   */
  const toCSVArray = csvObj => {
    const csvArray = new Array(csvObj.length);
    const checkedArray = [];
    csvObj.forEach((element, index) => {
      csvArray[index] = [];
      csvArray[index].push(true);
      csvArray[index].push(element.container);
      csvArray[index].push(element.type);
      csvArray[index].push(element.time);
      csvArray[index].push(element.message);
      checkedArray.push(true);
    });

    setSelectAll(true);
    setChecked(checkedArray);

    return csvArray;
  };

  /**
   * @abstract sorting row data i search
   */
  const toggleDisplay = e => {
    if (e.key === 'Enter') {
      if (!searchWord.length) {
        setFilteredDisplay(rows);
        const csvArray = toCSVArray(rows);
        setCsvData(csvArray);
        return;
      }
      if (rows.length) {
        const re = new RegExp(searchWord, 'i');
        const filtered = rows.filter(row => re.test(row.message));
        setFilteredDisplay(filtered);
        const csvArray = toCSVArray(filtered);
        setCsvData(csvArray);
      }
    }
  };

  /**
   * @abstract handles select all checkbox toggle. 
   * takes in a boolean
   */
  const handleSelectAll = (e: boolean) => {
    // Starts if csvData is populated

    
    if (csvData) {
      // create a copy of Checked Array all e
      const checkedArray = new Array(checked.length).fill(e);
      // modify csvData array boolean to be all e
      csvData.forEach(element => {
        element[0] = e;
      });

      // set checked array and select all state to re-render
      setSelectAll(e);
      setChecked(checkedArray);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.runningContainersHolder}>
        <div className={styles.runningLeft}>
          <h2>CONTAINERS</h2>
          {/* <div>Count: {runningList.length}</div> */}
          <p>
            Please choose the container(s) you would like to view process logs
            for and optionally select the timeframe.
          </p>
          {/* Timeframe Selector */}
          <div>
            <ThemeProvider theme={darkTheme}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  label='Timeframe Start'
                  value={startDate}
                  sx={{ width: '225px' }}
                  onChange={newStart => setStartDate(newStart)}
                />
              </LocalizationProvider>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  label='Timeframe Stop'
                  value={stopDate}
                  sx={{ width: '225px' }}
                  onChange={newStop => setStopDate(newStop)}
                />
              </LocalizationProvider>
            </ThemeProvider>
          </div>
          <div className={'keyword-search'}>
            <input
              className={globalStyles.input}
              type='text'
              value={searchWord}
              placeholder='Search log messages...'
              onChange={e => {
                dispatch(setSearchWord(e.target.value));
              }}
              onKeyDown={toggleDisplay}
            />
          </div>
          {/* Container Checkbox Selector */}
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
            <CSVLink data={csvSent} onClick={handleCsv}>
              <button className={globalStyles.button2} type='button'>
                DOWNLOAD CSV
              </button>
            </CSVLink>
          </div>
        </div>
      </div>
      <div className={styles.logsHolder}>
        <h2>CONTAINER PROCESS LOGS</h2>
        <input
          id='selectAll'
          type='checkbox'
          checked={selectAll}
          onChange={e => handleSelectAll(e.target.checked)}
        />
        <label htmlFor='selectAll' >Select All</label>
        <div className={styles.tableHolder}>
          <table className={globalStyles.table}>
            <thead>
              <tr>
                <th>EXPORT</th>
                {/* export test */}
                <th>CONTAINER</th>
                <th>LOG TYPE</th>
                <th>TIMESTAMP</th>
                <th>MESSAGE</th>
              </tr>
            </thead>
            {filteredDisplay
              .map((row: any, i) => {
                return (
                  <tbody key={`row-${i}`}>
                    <tr>
                      <td
                        style={{
                          verticalAlign: 'middle',
                        }}>
                        <input
                          id={`log-entry-box-${i}`}
                          className='export'
                          type='checkbox'
                          checked={checked[i]}
                          onChange={e => handleCheckedLogs(i, e.target.checked)}
                        />
                      </td>
                      <td>{row.container}</td>
                      <td>{row.type}</td>
                      <td>{row.time}</td>
                      <td>{row.message}</td>
                    </tr>
                  </tbody>
                );
              })
              .reverse()}
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProcessLogs;

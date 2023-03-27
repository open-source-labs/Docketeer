// import React, { useEffect, useState } from 'react';
// import { useAppSelector, useAppDispatch } from '../../reducers/hooks';

// import { createAlert } from '../../reducers/alertReducer';
// import useHelper from '../helpers/commands';
// import useSurvey from '../helpers/dispatch';
// import { buildOptionsObj } from '../helpers/logs';

// import { CSVLink } from 'react-csv';
// import { ContainerType, RowsDataType } from '../../../types';
// import '../ProcessLogsCard/ProcessLogsCard';

// import styles from './ProcessLogsTable.module.scss';
// import globalStyles from '../global.module.scss';

// /**
//  * @module | ProcessLogsTable.tsx
//  * @description | Provides process logs for running containers & configuration options to filter process logs
//  **/

// /*

// containerName
// :
// "10180290ca31"
// logMsg
// :
// "logger=context userId=0 orgId=1 uname= t=2023-03-13T21:50:10.802144512Z level=info msg=\"Request Completed\" method=POST path=/api/ds/query status=400 remote_addr=192.168.112.1 time_ms=249 duration=249.137435ms size=244 referer=\"http://localhost:2999/d/h5LcytHGz/system?kiosk=&orgId=1&refresh=10s\" handler=/api/ds/query"
// timeStamp
// :
// "3/13/2023, 9:50:10PM"
// */

// const ProcessLogsTable = (): JSX.Element => {
//   const dispatch = useAppDispatch();
//   const { getContainerLogsDispatcher } = useSurvey();
//   const { getLogs } = useHelper();

//   const urlString = window.location.href;
//   console.log({ urlString });
//   const containerID = urlString.split('/');
//   console.log({ containerID });

//   const id = containerID[containerID.length - 1];

//   const runningList = useAppSelector((state) => state.containers.runningList);
//   const { stdout, stderr } = useAppSelector(
//     (state) => state.logs.containerLogs
//   );

//   // btnIdList = boxes that are checked
//   const [btnIdList, setBtnIdList] = useState<string[]>([id]);
//   const [rows, setRows] = useState([] as any[]);
//   const [csvData, setCsvData] = useState([
//     ['container', 'type', 'time', 'message'],
//   ] as any[]);
//   const [counter, setCounter] = useState(0);

//   useEffect(() => {
//     tableData();
//   }, [counter, csvData.length]);

//   // Requests logs from server
//   // idList = btnIdList
//   const handleGetLogs = async (idList: string[]) => {
//     dispatch(createAlert('Loading process log information...', 5, 'success'));
//     const optionsObj = buildOptionsObj(idList);
//     const containerLogs = await getLogs(optionsObj);
//     console.log({ containerLogs });
//     getContainerLogsDispatcher(containerLogs);
//     setCounter(counter + 1);
//     return containerLogs;
//   };

//   // Create checkbox for running containers
//   // const containerSelectors = (currId: string): any[] => ;

//   // Helper function to hold array of checkboxes to render within returned JSX
//   // const containerSelectors: any[] = [];

//   // createContainerCheckboxes(id);

//   // Handle checkboxes
//   const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const box = e.target;

//     if (box.checked === true) {
//       btnIdList.push(box.id);
//       setBtnIdList(btnIdList);
//     } else {
//       const newIdList = btnIdList.filter((container) => container !== box.id);
//       setBtnIdList(newIdList);
//     }
//   };

//   type CSVData = string[];

//   // Create table data to render, based on either stdout or stderr
//   const tableData = () => {
//     const newRows: RowsDataType[] = [];
//     const newCSV: CSVData[] = [];

//     if (stdout) {
//       stdout.forEach((log: { [k: string]: any }) => {
//         const currCont = runningList.find(
//           (el: ContainerType) => el.ID === log['containerName']
//         );
//         if (currCont) {
//           newRows.push({
//             container: currCont.Names,
//             type: 'stdout',
//             time: log['timeStamp'],
//             message: log['logMsg'],
//             id: Math.random() * 100,
//           });
//           newCSV.push([
//             currCont.Names,
//             'stdout',
//             log['timeStamp'],
//             log['logMsg'],
//           ]);
//         }
//       });
//     }
//     if (stderr) {
//       stderr.forEach((log: { [k: string]: any }, index: any) => {
//         const currCont = runningList.find(
//           (el: ContainerType) => el.ID === log['containerName']
//         );
//         if (currCont) {
//           newRows.push({
//             container: currCont.Names,
//             type: 'stderr',
//             time: log['timeStamp'],
//             message: log['logMsg'],
//             id: parseInt(index),
//           });
//           newCSV.push([
//             currCont.Names,
//             'stderr',
//             log['timeStamp'],
//             log['logMsg'],
//           ]);
//         }
//       });

//       setRows(newRows as keyof typeof setRows);
//       setCsvData([['container', 'type', 'time', 'message'], ...newCSV]);
//     }
//   };

//   return (
//     <div className={styles.wrapper}>
//       <div>
//         <div>
//           <h2>RUNNING CONTAINER LIST</h2>
//           <p>
//             Please choose the running container(s) you would like to view
//             process logs for.
//           </p>
//           <div>
//             {
//               // const output = [];
//               runningList.map((container, i) => {
//                 if (container.ID === id) {
//                   return (
//                     <div key={i}>
//                       <label>
//                         <span>{`${container.Names}`}</span>
//                         <input
//                           id={container.ID}
//                           type="checkbox"
//                           name={container.Names}
//                           checked
//                           onChange={(e) => handleCheck(e)}
//                         />
//                       </label>
//                     </div>
//                   );
//                 } else {
//                   return (
//                     <div key={i}>
//                       <label>
//                         <span>{`${container.Names}`}</span>
//                         <input
//                           type="checkbox"
//                           name={container.ID}
//                           onChange={(e) => handleCheck(e)}
//                         />
//                       </label>
//                     </div>
//                   );
//                 }
//               })
//             }
//           </div>
//           <div>
//             <button
//               type="button"
//               id="getlogs-btn"
//               onClick={() => {
//                 handleGetLogs(btnIdList);
//               }}
//             >
//               GET LOGS
//             </button>
//           </div>
//           <div>
//             <button type="button">
//               <CSVLink data={csvData}>DOWNLOAD CSV</CSVLink>
//             </button>
//           </div>
//         </div>
//         <div>
//           <h2>TIME FRAME SELECTION</h2>
//           <div>
//             <label>
//               <input type="radio" name="logOption" id="sinceInput" />
//               <span>SINCE</span>
//               <input type="text" id="sinceText" />
//             </label>
//           </div>
//           <label>
//             <input type="radio" name="logOption" id="tailInput" />
//             <span>TAIL</span>
//             <input type="text" id="tailText" />
//           </label>
//         </div>
//       </div>
//       <div>
//         <h2>CONTAINER PROCESS LOGS</h2>
//         <div>
//           <table>
//             <thead>
//               <tr>
//                 <th>CONTAINER</th>
//                 <th>LOG TYPE</th>
//                 <th>TIMESTAMP</th>
//                 <th>MESSAGE</th>
//               </tr>
//             </thead>
//             {rows.map((row, i) => {
//               return (
//                 <tbody key={i}>
//                   <tr>
//                     <td>{row.container}</td>
//                     <td>{row.type}</td>
//                     <td>{row.time}</td>
//                     <td>{row.message}</td>
//                   </tr>
//                 </tbody>
//               );
//             })}
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };
const ProcessLogsTable = {};
export default ProcessLogsTable;

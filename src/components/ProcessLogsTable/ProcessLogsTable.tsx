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

//   const urlString = window.location.href;
//   console.log({ urlString });
//   const containerID = urlString.split('/');
//   console.log({ containerID });

//   // Requests logs from server
//   // idList = btnIdList

//   // Create table data to render, based on either stdout or stderr

//   return (
//     <div className={styles.wrapper}>
//       <div>
//         <div className={styles.runningContainerHolder}>
//           <h2>RUNNING CONTAINER LIST</h2>
//         </div>

//     </div>
//   );
// };

// export default ProcessLogsTable;

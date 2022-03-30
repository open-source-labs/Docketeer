import React, { useEffect, useSelector, useDispatch } from 'react';
// Redux Imports (actions)
import * as actions from '../../actions/actions';

/**
 * Renders stdout and stderr process logs 
 *
 * @param {*} props
 */


// upon page render, dispatch the getLogs action creator to trigger state change for containerLogs 
useEffect => (() => {
  const containerLogs = useSelector(state => state.containerLogs);
  const { stdoutLogs, stderrLogs } = containerLogs; 
});

// // when user clicks button, the action creator getLogs is called to produce an action
// // action is fed to the dispatch, which forwards the action to the reducer which creates a new state

// const ContainerLogsOutput = (props) => {
//   console.log(props);
//   return (
//     // radio buttons with ids
//     <>
//       <div>
//         <h1>Coming soon!</h1>
//         <h1>ID: {props.ids}</h1>
//       </div>
//       <div>
//         {table}
//       </div>
//     </>
//   );
// };
// // ContainerLogsOutput.defaultProps = {
// //  ids:'no Id'
// // };
// ContainerLogsOutput.propTypes = {
//   ids: string,
// };
export default ContainerLogsOutput;
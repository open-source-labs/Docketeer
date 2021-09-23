import { InputOutlined } from '@material-ui/icons';
import * as helper from './commands';
import store from '../../renderer/store';
import * as actions from '../../actions/actions';

/**
 * Returns an array of object entries filtered by the key property
 * 
 * @param {Array of Objects} input
 * @param {string} filterInput
 */ 
export const filterOneProperty = (input, filterInput) => {
  const filteredOutput = [];

  for (let i = 0; i < input.length; i++) {
    const filteredArr = Object.entries(input[i]).filter(([key,value]) => key === filterInput);
    filteredOutput.push(Object.fromEntries(filteredArr));
  }

  return filteredOutput;
};

// V--- I DON'T THINK THIS IS ACTUALLY DOING ANYTHING WITH THE STATE
// export const updatedVolumeHistoryTab = (data) => { 
//   store.dispatch(actions.getVolumeList(data));
// }; 

/**
 *  function is meant to perform a callback on input of arrays and return one string
 * 
 * @param {Callback Function} getVolumeContainers
 * @param {Dispatched Action} getVolumeContainersList 
 * @param {Array} arrayOfVolumeNames 
 */
export const volumeByName = (command, dispatch, array) => {
  console.log('entered the volumeByName helper func with this data:', array);
  let volumeName;
  array.forEach((element) => {
    volumeName = command(element['Name']);
  });
  return volumeName;
};

/**
 * function that updates the state of volumes list
 * 
 * @param {Array} dockerOutput // <-- a volume with its properties included 
 * @param {Callback} dispatch // <-- a way to update the state
 * 
 */
export const listOfVolumeProperties = (dockerOutput, dispatch) => {
  // create a storage array
  console.log('entered the listOfVolumeContainers helper func');
  const cache = [];
  console.log('this is the dispatch that we are using:', dispatch);
  for (let i = 0; i < dockerOutput.length; i++) {
    const volumePropsObj = dockerOutput[i]; 
    for (const key in volumePropsObj) {
      if (key === 'Names') {
        cache.push(volumePropsObj['Names']);
      } 
      if (key === 'RunningFor') {
        cache.push(volumePropsObj['RunningFor']);
      } 
      if (key === 'Status') {
        cache.push(volumePropsObj['Status']);
      } 
    }
  }
  // store.dispatch(actions.getVolumeList(cache))
  return cache;
};

/**
 * 
 * [{…}] <-- dockerOutput is an array with a single object
 0: <-- 0th index
  Command: ""git--help""
  CreatedAt: "2021-09-1512:07:53-0700PDT"
  ID: "d1ba32d2debe"
  Image: "cfd9fa28a348"
  Labels: ""
  LocalVolumes: "1"
  Mounts: "e59e9417c8de70…"
  Names: "mystifying_boyd"
  Networks: "bridge"
  Ports: ""
  RunningFor: "7daysago"
  Size: "0B(virtual25.2MB)"
  State: "exited"
  Status: "Exited(0)46hoursago"
 
 * POTENTIAL CARD STYLING?
 * volumename: fjdksf
 * containers:
 * jfkdlsajfksla 
 * fdjskfjsdklf  exited
 * fdjskf  exited 
 * fjdkslfjdsa
 */
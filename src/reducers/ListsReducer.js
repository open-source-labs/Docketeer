import * as types from '../constants/actionTypes';

const initialState = {
  imagesList: [],
  runningList: [],
  stoppedList: [],
  networkList: [],
  phoneNumber: '',
  memoryNotificationList: new Set(),
  cpuNotificationList: new Set(),
  stoppedNotificationList: new Set(),
  graphAxis: [],
  graphMemory: [
    {
      label: '',
      data: [],
      fill: ''
    },
  ],
  graphCpu: [
    {
      label: '',
      data: [],
      fill: ''
    },
  ]	
};

const listsReducer = (state = initialState, action) => {
  let memoryNotificationList;
  let cpuNotificationList;
  let stoppedNotificationList;

  switch (action.type) {
    case types.ADD_RUNNING_CONTAINERS:
      const newRunningList = state.runningList.slice();
      for (let container of action.payload) {
        newRunningList.push(container);
      }
      			return { ...state, runningList: newRunningList };
    
    case types.ADD_PHONE_NUMBER:
      return {
                ...state,
                phoneNumber: action.payload,
              };


    case types.REMOVE_CONTAINER:
      const removeContainerList = [];
      for (let container of state.stoppedList) {
        if (container.cid !== action.payload) {
          removeContainerList.push(container);
        }
      }
      			return { ...state, stoppedList: removeContainerList };

    case types.STOP_RUNNING_CONTAINER:
      const newStoppedList = state.stoppedList.slice();
      const newestRunningList = [];
      for (let container of state.runningList) {
        if (container.cid !== action.payload) {
          newestRunningList.push(container);
        } else {
          newStoppedList.push(container);
        }
      			}

      return {
        ...state,
        runningList: newestRunningList,
        stoppedList: newStoppedList,
      			};

    case types.ADD_STOPPED_CONTAINERS:
      const newerStoppedList = state.stoppedList.slice();
      for (let container of action.payload) {
        newerStoppedList.push(container);
      }
      			return { ...state, stoppedList: newerStoppedList };

    case types.RUN_STOPPED_CONTAINER:
      console.log('HITTING RUN_STOPPED IN REDUCERS');
      const runningListCopy = state.runningList.slice();
      const newerStoppedContainer = [];
      for (let container of state.stoppedList) {
        if (container.cid === action.payload) {
          runningListCopy.push(container)
        } else {
          newerStoppedContainer.push(container);
        }
      }
      return {
        ...state,
        runningList: runningListCopy,
        stoppedList: newerStoppedContainer,
      };
    case types.GET_IMAGES:
      const newImagesList = state.imagesList.slice();
      for (let image of action.payload) {
        newImagesList.push(image);
      }
      return {
        ...state,
        imagesList: newImagesList,
      };
    case types.REMOVE_IMAGE:
      const newRemoveImage = [];
      for (let image of state.imagesList) {
        if (image.id !== action.payload) {
          newRunningList.push(image);
        }
      }
      return { ...state, imageList: newRemoveImage };
    case types.REFRESH_RUNNING_CONTAINERS:
      const newRunningList2 = [];
      for (let container of action.payload) {
        newRunningList2.push(container);
      }
      			return { ...state, runningList: newRunningList2 };

    case types.REFRESH_STOPPED_CONTAINERS:
      const newStoppedList4 = [];
      for (let container of action.payload) {
        newStoppedList4.push(container);
      }
      return { ...state, stoppedList: newStoppedList4 };
    case types.REFRESH_IMAGES:
      const newImagesList2 = [];
      for (let image of action.payload) {
        newImagesList2.push(image);
      }
      ;			return { ...state, imagesList: newImagesList2 }

    case types.COMPOSE_YML_FILES:
      console.log('action.payload compose YML FILESs: ', action.payload);
      const newnetworkList = state.networkList.slice();

      newnetworkList.push(action.payload[0]);
      			return { ...state, networkList: newnetworkList };

    case types.GET_COMPOSED_YML_FILES:
      const newNetworkList2 = state.networkList.slice();
      			console.log('action.payload get compose:', action.payload);

      			let keys = Object.keys(action.payload);

      for (let i = 0; i < keys.length; i++) {
        console.log('action.payload[keys[i]]: ', action.payload[keys[i]])
        let newKey = keys[i]
        let obj = {};
        obj[newKey] = action.payload[keys[i]];
        newNetworkList2.push(obj);
      }

      // console.log('GET_COMPOSED_YML_FILES action.payload: ', action.payload);
      // console.log('GET_COMPOSED_YML_FILES networkList state: ', newNetworkList2);
      return { ...state, networkList: newNetworkList2 };

    case types.COMPOSE_DOWN:
      console.log('Compose down action.payload: ', action.payload);
      const newNetworkList = state.networkList.slice();
      const targetNetwork = action.payload; // parse this because " "

      for (let i = 0; i < newNetworkList.length; i++) {
        const network = newNetworkList[i];

        if (network[targetNetwork]) {
          newNetworkList.splice(i, 1);
          break;
        }
      }

      return { ...state, networkList: newNetworkList };

    case types.BUILD_AXIS:
      console.log('action.payload build axis:', action.payload);
      if (action.payload === 'clear') return { ...state, graphAxis: [] };
      // cuts the timezone off. 
      let formatedDate = action.payload.toString().slice(0, 24)
      // compare two string dates
      if (formatedDate > state.graphAxis[state.graphAxis.length - 1] || !state.graphAxis.length) {
        const newAxis = state.graphAxis;
        newAxis.push(formatedDate);
        return { ...state, graphAxis: newAxis };
      }
        return {...state}

    case types.BUILD_MEMORY:
      console.log('action.payload build memory:', action.payload);
      if (action.payload === 'clear') return { ...state, graphMemory: []};
      let newMemory = state.graphMemory.slice();

      newMemory.push(action.payload[0]);
      	return { ...state, graphMemory: newMemory };

    case types.BUILD_CPU:
      console.log('action.payload build cpu:', action.payload);
      if (action.payload === 'clear') return   {...state, graphCpu: []};
      const newCpu = state.graphCpu.slice();
      newCpu.push(action.payload[0]);
      return { ...state, graphCpu: newCpu };

    case types.ADD_MEMORY_NOTIFICATION_SETTING:
      memoryNotificationList = new Set(action.payload);
      // memoryNotificationList.add(action.payload);
      return {
        ...state,
        memoryNotificationList,
      };

    case types.ADD_CPU_NOTIFICATION_SETTING:
      cpuNotificationList = new Set(action.payload);
      // cpuNotificationList.add(action.payload);
      return {
        ...state,
        cpuNotificationList,
      };

    case types.ADD_STOPPED_NOTIFICATION_SETTING:
      stoppedNotificationList = new Set(action.payload);
      // stoppedNotificationList.add(action.payload);
      return {
        ...state,
        stoppedNotificationList,
      };

    case types.REMOVE_MEMORY_NOTIFICATION_SETTING:
      const newMemoryNotificationList = [];

      state.memoryNotificationList.forEach((containerId) => {
        if (containerId !== action.payload)
          newMemoryNotificationList.push(containerId);
      });
      return {
        ...state,
        memoryNotificationList: newMemoryNotificationList,
      };

    case types.REMOVE_CPU_NOTIFICATION_SETTING:
      const newCpuNotificationList = [];

      state.cpuNotificationList.forEach((containerId) => {
        if (containerId !== action.payload)
          newCpuNotificationList.push(containerId);
      });
      return {
        ...state,
        cpuNotificationList: newCpuNotificationList,
      };

    case types.REMOVE_STOPPED_NOTIFICATION_SETTING:
      const newStoppedNotificationList = [];

      state.stoppedNotificationList.forEach((containerId) => {
        if (containerId !== action.payload)
          stoppedNotificationList.push(containerId);
      });
      return {
        ...state,
        stoppedNotificationList: newStoppedNotificationList,
      };

    case types.ADD_PHONE_NUMBER:
      return {
        ...state,
        phoneNumber: action.payload,
      };

    default:
      	return state;
  }
};

export default listsReducer;



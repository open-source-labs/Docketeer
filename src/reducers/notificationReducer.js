import * as types from '../constants/actionTypes';

const initialState = {
  phoneNumber: '',
  memoryNotificationList: new Set(),
  cpuNotificationList: new Set(),
  stoppedNotificationList: new Set()
};

export default function (state = initialState, action) {
  switch (action.type) {
<<<<<<< HEAD:src/module/reducers/notificationReducer.js
=======
    
>>>>>>> 276c4d7 (Revert "Updated linting for project. (#107)"):src/reducers/notificationReducer.js
    case types.ADD_PHONE_NUMBER:
      return {
        ...state,
        phoneNumber: action.payload
      };

<<<<<<< HEAD:src/module/reducers/notificationReducer.js
    case types.ADD_MEMORY_NOTIFICATION_SETTING: 
=======
    case types.ADD_MEMORY_NOTIFICATION_SETTING:
>>>>>>> 276c4d7 (Revert "Updated linting for project. (#107)"):src/reducers/notificationReducer.js
      const memoryNotificationList = new Set(action.payload);
      return {
        ...state,
        memoryNotificationList
      };

<<<<<<< HEAD:src/module/reducers/notificationReducer.js
    case types.ADD_CPU_NOTIFICATION_SETTING: 
=======
    case types.ADD_CPU_NOTIFICATION_SETTING:
>>>>>>> 276c4d7 (Revert "Updated linting for project. (#107)"):src/reducers/notificationReducer.js
      const cpuNotificationList = new Set(action.payload);
      return {
        ...state,
        cpuNotificationList
      };

<<<<<<< HEAD:src/module/reducers/notificationReducer.js
    case types.ADD_STOPPED_NOTIFICATION_SETTING: 
=======
    case types.ADD_STOPPED_NOTIFICATION_SETTING:
>>>>>>> 276c4d7 (Revert "Updated linting for project. (#107)"):src/reducers/notificationReducer.js
      const stoppedNotificationList = new Set(action.payload);
      return {
        ...state,
        stoppedNotificationList
      };

<<<<<<< HEAD:src/module/reducers/notificationReducer.js
    case types.REMOVE_MEMORY_NOTIFICATION_SETTING: 
=======
    case types.REMOVE_MEMORY_NOTIFICATION_SETTING:
>>>>>>> 276c4d7 (Revert "Updated linting for project. (#107)"):src/reducers/notificationReducer.js
      const newMemoryNotificationList = [];
      state.memoryNotificationList.forEach((containerId) => {
        if (containerId !== action.payload)
          newMemoryNotificationList.push(containerId);
      });
      return {
        ...state,
        memoryNotificationList: newMemoryNotificationList
      };

<<<<<<< HEAD:src/module/reducers/notificationReducer.js
    case types.REMOVE_CPU_NOTIFICATION_SETTING: 
=======
    case types.REMOVE_CPU_NOTIFICATION_SETTING:
>>>>>>> 276c4d7 (Revert "Updated linting for project. (#107)"):src/reducers/notificationReducer.js
      const newCpuNotificationList = [];
      state.cpuNotificationList.forEach((containerId) => {
        if (containerId !== action.payload)
          newCpuNotificationList.push(containerId);
      });
      return {
        ...state,
        cpuNotificationList: newCpuNotificationList
      };

<<<<<<< HEAD:src/module/reducers/notificationReducer.js
    case types.REMOVE_STOPPED_NOTIFICATION_SETTING: 
=======
    case types.REMOVE_STOPPED_NOTIFICATION_SETTING:
>>>>>>> 276c4d7 (Revert "Updated linting for project. (#107)"):src/reducers/notificationReducer.js
      const newStoppedNotificationList = [];
      state.stoppedNotificationList.forEach((containerId) => {
        if (containerId !== action.payload)
          stoppedNotificationList.push(containerId);
      });
      return {
        ...state,
        stoppedNotificationList: newStoppedNotificationList
      };

    default:
      return state;
  }
}

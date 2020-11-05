import * as types from "../constants/actionTypes";

const initialState = {
  phoneNumber: "",
  memoryNotificationList: new Set(),
  cpuNotificationList: new Set(),
  stoppedNotificationList: new Set(),
  graphAxis: [],
  graphMemory: [
    {
      label: "",
      data: [],
      fill: "",
    },
  ],
  graphCpu: [
    {
      label: "",
      data: [],
      fill: "",
    },
  ],
};

const listsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.BUILD_AXIS:
      if (action.payload === "clear") return { ...state, graphAxis: [] };
      let payloadDate = new Date(action.payload).toISOString();
      if (
        payloadDate > state.graphAxis[state.graphAxis.length - 1] ||
        !state.graphAxis.length
      ) {
        const newAxis = state.graphAxis;
        newAxis.push(payloadDate);
        return { ...state, graphAxis: newAxis };
      }
      return { ...state };

    case types.BUILD_MEMORY:
      if (action.payload === "clear") return { ...state, graphMemory: [] };
      let newMemory = state.graphMemory.slice();
      newMemory.push(action.payload[0]);
      return { ...state, graphMemory: newMemory };

    case types.BUILD_CPU:
      if (action.payload === "clear") return { ...state, graphCpu: [] };
      const newCpu = state.graphCpu.slice();
      newCpu.push(action.payload[0]);
      return { ...state, graphCpu: newCpu };

    case types.ADD_MEMORY_NOTIFICATION_SETTING:
      const memoryNotificationList = new Set(action.payload);
      return {
        ...state,
        memoryNotificationList,
      };

    case types.ADD_CPU_NOTIFICATION_SETTING:
      const cpuNotificationList = new Set(action.payload);
      return {
        ...state,
        cpuNotificationList,
      };

    case types.ADD_STOPPED_NOTIFICATION_SETTING:
      const stoppedNotificationList = new Set(action.payload);
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

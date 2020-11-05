import * as types from "../constants/actionTypes";

const initialState = {
  phoneNumber: "",
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

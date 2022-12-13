import * as types from '../constants/actionTypes';
import { PayloadAction } from '@reduxjs/toolkit';
import { graphState } from '../../../types';

const graphReducer = (state = graphState, action: PayloadAction<any>) => {
  switch (action.type) {
  case types.BUILD_AXIS: {
    if (action.payload === 'clear') return { ...state, graphAxis: [] };

    // cuts day of week from begining and the timezone off the end.
    const formatedDate = action.payload.toString().slice(4, 24);

    // compare two string dates
    if (
      formatedDate > state.graphAxis[state.graphAxis.length - 1] ||
        !state.graphAxis.length
    ) {
      const newAxis: any[] = state.graphAxis;
      newAxis.push(formatedDate);
      return { ...state, graphAxis: newAxis };
    }
    return { ...state };
  }

  case types.BUILD_MEMORY: {
    if (action.payload === 'clear') return { ...state, graphMemory: [] };
    const newMemory = state.graphMemory.slice();
    newMemory.push(action.payload[0]);
    return { ...state, graphMemory: newMemory };
  }

  case types.BUILD_CPU: {
    if (action.payload === 'clear') return { ...state, graphCpu: [] };
    const newCpu = state.graphCpu.slice();
    newCpu.push(action.payload[0]);
    return { ...state, graphCpu: newCpu };
  }

  case types.BUILD_WRITTEN_IO: {
    if (action.payload === 'clear') return { ...state, graphWrittenIO: [] };
    const newWrittenIO = state.graphWrittenIO.slice();
    newWrittenIO.push(action.payload[0]);
    return { ...state, graphWrittenIO: newWrittenIO };
  }

  case types.BUILD_READ_IO: {
    if (action.payload === 'clear') return { ...state, graphReadIO: [] };
    const newReadIO = state.graphReadIO.slice();
    newReadIO.push(action.payload[0]);
    return { ...state, graphReadIO: newReadIO };
  }

  default:
    return state;
  }
};

export default graphReducer;

import { PayloadAction, createSlice } from '@reduxjs/toolkit';
// import { graphStateType } from '../../types';
// changed to any from graphStateType
const initialState: any = {
  graphAxis: [],
  graphMemory: [
    {
      label: '',
      data: [],
      fill: '',
    },
  ],
  graphCpu: [
    {
      label: '',
      data: [],
      fill: '',
    },
  ],
  graphWrittenIO: [
    {
      label: '',
      data: [],
      fill: '',
    },
  ],
  graphReadIO: [
    {
      label: '',
      data: [],
      fill: '',
    },
  ],
  graphReceivedIO: [
    {
      label: '',
      data: [],
      fill: '',
    },
  ],
  graphTransmittedIO: [
    {
      label: '',
      data: [],
      fill: '',
    },
  ],
};

export const graphSlice = createSlice({
  name: 'graphs',
  initialState,
  reducers: {
    buildAxis: (state, action: PayloadAction<string>) => {
      if (action.payload === 'clear') {
        state.graphAxis = [];
      } else {
        const formatted = action.payload.slice(4, 24);

        if (
          formatted > state.graphAxis[state.graphAxis.length - 1] ||
          !state.graphAxis.length
        ) {
          state.graphAxis.push(formatted);
        }
      }
    },
    buildMemory: (state, action: PayloadAction<any>) => {
      if (action.payload === 'clear') {
        state.graphMemory = [];
      } else {
        state.graphMemory.push(action.payload[0]);
      }
    },
    buildCpu: (state, action: PayloadAction<any>) => {
      if (action.payload === 'clear') {
        state.graphCpu = [];
      } else {
        state.graphCpu.push(action.payload[0]);
      }
    },
    buildWrittenIO: (state, action: PayloadAction<any>) => {
      if (action.payload === 'clear') {
        state.graphWrittenIO = [];
      } else {
        state.graphWrittenIO.push(action.payload[0]);
      }
    },
    buildReadIO: (state, action: PayloadAction<any>) => {
      if (action.payload === 'clear') {
        state.graphReadIO = [];
      } else {
        state.graphReadIO.push(action.payload[0]);
      }
    },
    buildReceivedIO: (state, action: PayloadAction<any>) => {
      if (action.payload === 'clear') {
        state.graphReceivedIO = [];
      } else {
        state.graphReceivedIO.push(action.payload[0]);
      }
    },
    buildTransmittedIO: (state, action: PayloadAction<any>) => {
      if (action.payload === 'clear') {
        state.graphTransmittedIO = [];
      } else {
        state.graphTransmittedIO.push(action.payload[0]);
      }
    },
  },
});

export const {
  buildAxis,
  buildMemory,
  buildCpu,
  buildWrittenIO,
  buildReadIO,
  buildReceivedIO,
  buildTransmittedIO,
} = graphSlice.actions;

export default graphSlice.reducer;

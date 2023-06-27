import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
  ContainerStateType,
  ContainerType,
  StoppedListType,
} from '../../types';


// createSlice is the main function used to define the redux logic
// PayloadAction is a TS type that represents 'this is the contents of one given action object'


// Below represents the shape of the state inside of our slice that is managed by the reducer
// if there was an interface



// below are defining the initial state
const initialState: ContainerStateType = {
  runningList: [],
  stoppedList: [],
  networkList: [],
  composeStack: [],
};

// Now we define the Slice that contains the reducer logic
export const containerSlice = createSlice({
  name: 'containers',
  initialState,

  // Below is where we define the different types of updates that we are going to have inside this reducer
  reducers: {
    // below is an inline object function
    
    stopRunningContainer: (state, action: PayloadAction<string>) => {
      // in a normal redux reducer, we would return (...state) to make a copy of state for an immutable update and then we would overwrite the value field
      // RTK simplifies the process, so rather than previous stuff, we can write what looks like mutating code, directly into this reducer. We don't even need a return keyword
      // With RTK, it uses a library called immir and immir wraps our state updates and it tracks all our
      // mutations that we tried to do, and once we are done it actually kind of replays them and it turns it
      // into a safe and correct mutable update as if we did all the copying and spreading and mapping
      //

      state.runningList.filter((container) => container.ID !== action.payload);
    },
    runStoppedContainer: (state, action: PayloadAction<string>) => {
      state.stoppedList.filter((container) => container.ID !== action.payload);
    },
    refreshRunningContainers: (
      state,
      action: PayloadAction<ContainerType[]>
    ) => {
      state.runningList = action.payload;
    },
    removeContainer: (state, action: PayloadAction<string>) => {
      state.stoppedList.filter((container) => container.ID !== action.payload);
    },
    refreshStoppedContainer: (
      state,
      action: PayloadAction<StoppedListType[]>
    ) => {
      state.stoppedList = action.payload;
    },
  },
});

// Typically with redux, you see these things called action creators, and the idea is that it is a function
// that makes and returns an action object, typically you write those by hand
// createSlice actually just made one of those for us.
// The slice object has a couple of different fields in it
// One is a reducer function that knows how to update the state for all the different cases we encounter,
// It also has generated an action creator for each of the different functions inside the reducers field
//

// if we mouse over any of the below, TS says it is an ActionCreatorWithAnOptionalPayload
export const {
  stopRunningContainer,
  runStoppedContainer,
  refreshRunningContainers,
  removeContainer,
  refreshStoppedContainer,
} = containerSlice.actions;

export default containerSlice.reducer;


// All of the above is the basic shape of what we call a redux slice
// Use the createSlice API to find what your state, one or more reducers to apply updates, export action creators
// export the reducer that handles all those cases/
// Now we need to setup our Redux Store, which is a one time thing for our app, store.ts
/* eslint-disable no-case-declarations */
import * as types from '../constants/actionTypes';

const initialState = {
  volumeList: [],
  // runningContainers: [],
  // stoppedContainers: []
};

export default function (state = initialState, action) {
  switch (action.type) {
  
    // create a copy and return a copy of the actual list of volumes
  case types.GET_VOLUME_LIST:
    const volumeListCopy = state.volumeList.slice();
    const volumeListState = [...volumeListCopy, action.payload];
    return { ...state, volumeListState };
   
  // case types.CONTAINERS_IN_VOLUME:
  //   const hi = 1;
  //     return;
    
  default:
    return state;
  }
} 
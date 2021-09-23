/* eslint-disable no-case-declarations */
import * as types from '../constants/actionTypes';

const initialState = {
  arrayOfVolumeNames: [],
  allContainers: [],
  // stoppedContainers: []
};

export default function (state = initialState, action) {
  switch (action.type) {
  
  // create a copy and return a copy of the actual list of volumes
  case types.GET_VOLUME_LIST:
    const volumeListCopy = state.arrayOfVolumeNames.slice();
    const volumeListState = [...volumeListCopy, ...action.payload];
    return {
      ...state,
      arrayOfVolumeNames: volumeListState,
    };
   
  // create 
  case types.GET_VOLUME_CONTAINERS_LIST:
    const newContainersList = state.allContainers.slice();
    const containersListState = [...newContainersList, action.payload];
    return {
      ...state,
      allContainers: containersListState
    }; 
    
  default:
    return state;
  }
}

/* eslint-disable no-case-declarations */
import * as types from '../constants/actionTypes';

const initialState = {
  arrayOfVolumeNames: [],
  allContainers: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
  
    case types.GET_VOLUME_LIST:
      const volumeListState = [...state.arrayOfVolumeNames, ...action.payload];
      return {
        ...state,
        arrayOfVolumeNames: volumeListState,
      };
    
    case types.GET_VOLUME_CONTAINERS_LIST:
      const containersListState = [...state.allContainers, action.payload];
      return {
        ...state,
        allContainers: containersListState
      }; 
      
    default:
      return state;
  }
}

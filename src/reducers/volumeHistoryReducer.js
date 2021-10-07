/* eslint-disable no-case-declarations */
import * as types from '../constants/actionTypes';

/**
 * @description Reducer for the list of containers running in each volume
 * State has been separated into two arrays for future implementation
 * 
 * @param {Array} arrayOfVolumeNames List of volumes running
 * @param {nested Objects} volumeContainersList Containers running under each volume
 */
const initialState = {
  arrayOfVolumeNames: [],
  volumeContainersList: [],
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
      const newVolumeContainersList = [...state.volumeContainersList, action.payload];
      return {
        ...state,
        volumeContainersList: newVolumeContainersList
      }; 
    
    default:
      return state;
  }
}

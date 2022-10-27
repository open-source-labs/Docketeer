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
  volumeContainersList: []
};

export default function (state = initialState, action) {
  switch (action.type) {
<<<<<<< HEAD:src/module/reducers/volumeHistoryReducer.js
    case types.GET_VOLUME_LIST:
=======
  case types.GET_VOLUME_LIST:
>>>>>>> 276c4d7 (Revert "Updated linting for project. (#107)"):src/reducers/volumeHistoryReducer.js
      // merges arrays using spread operator
      const newVolumeList = [...state.arrayOfVolumeNames, ...action.payload];
      return {
        ...state,
        arrayOfVolumeNames: newVolumeList
      };

<<<<<<< HEAD:src/module/reducers/volumeHistoryReducer.js
    case types.GET_VOLUME_CONTAINERS_LIST: 
=======
    case types.GET_VOLUME_CONTAINERS_LIST:
>>>>>>> 276c4d7 (Revert "Updated linting for project. (#107)"):src/reducers/volumeHistoryReducer.js
      const newVolumeContainersList = [...state.volumeContainersList];
      if (newVolumeContainersList.length) {
        // ensures no duplicate volumes
        for (let i = 0; i < newVolumeContainersList.length; i += 1) {
          if (newVolumeContainersList[i].vol_name === action.payload.vol_name) {
            return state;
          }
        }
      }
      newVolumeContainersList.push(action.payload);
      return {
        ...state,
        volumeContainersList: newVolumeContainersList
      };

    default:
      return state;
  }
}

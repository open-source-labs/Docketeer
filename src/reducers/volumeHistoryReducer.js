/* eslint-disable no-case-declarations */
import * as types from '../constants/actionTypes';

const initialState = {
  arrayOfVolumeNames: [],
  // runningContainers: [],
  // stoppedContainers: []
};

export default function (state = initialState, action) {
  switch (action.type) {
  // create a copy and return a copy of the actual list of volumes
  case types.GET_VOLUME_LIST:
    console.log('ACCESSING VOLUME HISTORY REDUCER: GET VOLUME LIST');
    const volumeListCopy = state.arrayOfVolumeNames.slice();
    const volumeListState = [...volumeListCopy, ...action.payload];
    console.log('this is the volumeListState:', volumeListState);
    console.log({ ...state, volumeListState });
    return {
      ...state,
      arrayOfVolumeNames: volumeListState,
    };

    // case types.CONTAINERS_IN_VOLUME:
    //   const hi = 1;
    //   return;

  default:
    return state;
  }
}

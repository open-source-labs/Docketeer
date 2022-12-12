import * as types from "../constants/actionTypes";
import { PayloadAction } from "@reduxjs/toolkit";
import {volumeState} from '../../../types';

/**
 * @description Reducer for the list of containers running in each volume
 * State has been separated into two arrays for future implementation
 *
 * @param {Array} arrayOfVolumeNames List of volumes running
 * @param {nested Objects} volumeContainersList Containers running under each volume
 */

export default function (state = volumeState, action: PayloadAction<any>) {
  switch (action.type) {
    case types.GET_VOLUME_LIST:
      // merges arrays using spread operator
      const newVolumeList = [...state.arrayOfVolumeNames, ...action.payload];
      return {
        ...state,
        arrayOfVolumeNames: newVolumeList,
      };

    case types.GET_VOLUME_CONTAINERS_LIST:
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
        volumeContainersList: newVolumeContainersList,
      };

    default:
      return state;
  }
}

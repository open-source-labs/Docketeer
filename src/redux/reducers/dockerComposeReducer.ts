/* eslint-disable no-case-declarations */
import * as types from '../constants/actionTypes';
import { PayloadAction } from '@reduxjs/toolkit';
import { containerStateType } from '../../../types';

const containerState: containerStateType = {
  runningList: [],
  stoppedList: [],
  networkList: [],
  composeStack: [],
  hostStats: {},
};

export default function (state = containerState, action: PayloadAction<any>) {
  switch (action.type) {

  case types.GET_NETWORK_CONTAINERS:
    const networkListCopy = [...state.networkList];
    const networkListState = [...networkListCopy, ...action.payload];
    return { ...state, networkListState };

  case types.GET_CONTAINER_STACKS:
    const currentState: object[] = [...state.composeStack];
    const newState: object[] = action.payload;
    // Container Parser to retain Yml File name and filepath
    const composeStackUpdater = () => {
        let result: object[] = [];
        currentState.forEach((element:any) => {
          if (JSON.stringify(newState).includes(JSON.stringify(element.Name))) result.push(element)
        });
         newState.forEach((element:any) => {
          if (!JSON.stringify(currentState).includes(JSON.stringify(element.Name))) result.push(element);
         });
        return result;
      };
      return { ...state, composeStack: composeStackUpdater() };

  case types.COMPOSE_YML_FILES:
    const newnetworkList = [...state.networkList];
    newnetworkList.push(action.payload[0]);
    return { ...state, networkList: newnetworkList };

  case types.COMPOSE_DOWN:
    const prevState = [...state.composeStack];
    const filePath = action.payload;
    // Remove 
    const removedStack = prevState.filter(
      (container) => container.FilePath !== filePath,
    );

    return { ...state, composeStack: removedStack };

  default:
    return state;
  }
}

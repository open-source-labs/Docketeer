/* eslint-disable no-case-declarations */
import * as types from '../constants/actionTypes';

const initialState = {
  networkList: [],
  composeStack: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    
  case types.GET_NETWORK_CONTAINERS:
    const networkListCopy = state.networkList.slice();
    const networkListState = [...networkListCopy, ...action.payload];
    return { ...state, networkListState };

  case types.GET_CONTAINER_STACKS:
    const currentState = state.composeStack.slice();
    const newState = action.payload;
  

    const composeStackUpdater = (arr1, arr2, output = []) => {
      arr1.forEach((element) => {
        if(JSON.stringify(arr2).includes(JSON.stringify(element))){
          output.push(element);
        }
      });
      arr2.forEach((element) => {
        if(!(JSON.stringify(arr1).includes(JSON.stringify(element)))){
          output.push(element);
        }
      });
      return output;
    };

    const updatedComposeStack = composeStackUpdater(currentState, newState);
    
    return { ...state, composeStack: updatedComposeStack };

  case types.COMPOSE_YML_FILES:
    const newnetworkList = state.networkList.slice();
    newnetworkList.push(action.payload[0]);
    return { ...state, networkList: newnetworkList };

  case types.COMPOSE_DOWN:
    const prevState = state.composeStack.slice();
    const { filePath, ymlFileName } = action.payload;

    const removedStack = prevState.filter(
      (container) => container.FilePath !== filePath && container.YmlFileName !== ymlFileName
    );
        
    return { ...state, composeStack: removedStack };
      
  default:
    return state;
  }
}

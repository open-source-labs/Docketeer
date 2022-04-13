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
    // docketeer 5.0 used this code (it was broken)
    // const comparer = (otherArray) => {
    //   return (current) =>
    //     otherArray.filter(
    //       (other) => other.Name == current.Name && other.ID == current.ID
    //     ).length == 0;
    // };

    // const onlyInCurrentState = currentState.filter(comparer(newState));
    // const onlyInNewState = newState.filter(comparer(currentState));
    // currentState.push(...onlyInNewState);

    // return { ...state, composeStack: currentState };

    // our new 6.0 code is broken as well but less broken than the 5.0 code
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

    const updatedState = composeStackUpdater(currentState, newState);
    return {...state, composeStack: updatedState};

  case types.COMPOSE_YML_FILES:
    const newnetworkList = state.networkList.slice();
    newnetworkList.push(action.payload[0]);
    return { ...state, networkList: newnetworkList };

  case types.COMPOSE_DOWN:
    const prevState = state.composeStack.slice();
    const fileLocation = action.payload;

    const removedStack = prevState.filter(
      (container) => container.FilePath !== fileLocation
    );
        
    return { ...state, composeStack: removedStack };
      
  default:
    return state;
  }
}

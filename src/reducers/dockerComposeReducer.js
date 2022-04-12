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
  
    // let updatedComposeStack;
    // if (!currentState.length) {
    //   updatedComposeStack = [...newState];
    // }
    // else {
    //   const updatedCurrentState = currentState.reduce((updatedCurrentStateArray, currentStateObj) => {
    //     newState.forEach(newStateObj => {
    //       if (currentStateObj.Name === newStateObj.Name && currentStateObj.ID === newStateObj.ID) {
    //         updatedCurrentStateArray.push(currentStateObj);
    //       }
    //     });
    //     return updatedCurrentStateArray;
    //   }, []);

    //   [db1, 131] [db2, 132] [db2, 132, db2, 132] [db2, 132]
    //   updatedComposeStack = updatedCurrentState.reduce((updatedComposeStackAcc, updatedCurrentStateObj) => {
    //     newState.forEach(newStateObj => {
    //       if (updatedCurrentStateObj.Name === newStateObj.Name && updatedCurrentStateObj.ID === newStateObj.ID) {
    //         updatedComposeStackAcc.push(Object.assign(updatedCurrentStateObj, newStateObj));
    //       }
    //       else updatedComposeStackAcc.push(newStateObj);
    //     });
    //     return updatedComposeStackAcc;
    //   }, []);
    // }
    const composeStackUpdater = (arr1, arr2, output = []) => {
      let arr2Counter = 0;
      arr1.forEach((element) => {
        if (JSON.stringify(arr2).includes(JSON.stringify(element))) {
          output.push(element);
          arr2Counter++;
        }
      });
      // after iterating through all networks from arr1, push the rest of arr2 elements to output
      output = [...output, ...arr2.slice(arr2Counter)];
      return output;
    };
    
    const updatedComposeStack = composeStackUpdater(currentState, newState);
      
    
    return { ...state, composeStack: updatedComposeStack };
    //   // old code:
    //   const comparer = (otherArray) => {
    //     return (current) =>
    //       otherArray.filter(
    //         (other) => other.Name == current.Name && other.ID == current.ID
    //       ).length == 0;
    //   };

    // const onlyInCurrentState = currentState.filter(comparer(newState));
    // const onlyInNewState = newState.filter(comparer(currentState));
    // currentState.push(...onlyInNewState);

    // return { ...state, composeStack: currentState };
    

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

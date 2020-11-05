import * as types from "../constants/actionTypes";

const initialState = {
  networkList: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.COMPOSE_YML_FILES:
      const newnetworkList = state.networkList.slice();

      newnetworkList.push(action.payload[0]);
      return { ...state, networkList: newnetworkList };

    case types.GET_COMPOSED_YML_FILES:
      const newNetworkList2 = state.networkList.slice();
      let keys = Object.keys(action.payload);
      for (let i = 0; i < keys.length; i++) {
        let newKey = keys[i];
        let obj = {};
        obj[newKey] = action.payload[keys[i]];
        newNetworkList2.push(obj);
      }
      return { ...state, networkList: newNetworkList2 };

    case types.COMPOSE_DOWN:
      const newNetworkList = state.networkList.slice();
      const targetNetwork = action.payload; // parse this because " "
      for (let i = 0; i < newNetworkList.length; i++) {
        const network = newNetworkList[i];
        if (network[targetNetwork]) {
          newNetworkList.splice(i, 1);
          break;
        }
      }
      return { ...state, networkList: newNetworkList };
    default:
      return state;
  }
}

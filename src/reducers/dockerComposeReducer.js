import * as types from "../constants/actionTypes";

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

      const comparer = (otherArray) => {
        return (current) =>
          otherArray.filter(
            (other) => other.Name == current.Name && other.ID == current.ID
          ).length == 0;
      };

      const OnlyInCurrentState = currentState.filter(comparer(newState));
      const OnlyInNewState = newState.filter(comparer(currentState));
      currentState.push(...OnlyInNewState);

      return { ...state, composeStack: currentState };

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

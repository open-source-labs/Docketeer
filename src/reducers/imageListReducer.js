import * as types from "../constants/actionTypes";

const initialState = {
  imagesList: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.GET_IMAGES:
      const newImagesList = state.imagesList.slice();
      for (let image of action.payload) {
        newImagesList.push(image);
      }
      return {
        ...state,
        imagesList: newImagesList,
      };

    case types.REFRESH_IMAGES:
      const newImagesList2 = [];
      for (let image of action.payload) {
        newImagesList2.push(image);
      }
      return { ...state, imagesList: newImagesList2 };

    case types.REMOVE_IMAGE:
      const newRemoveImage = [];
      for (let image of state.imagesList) {
        if (image.id !== action.payload) {
          newRunningList.push(image);
        }
      }
      return { ...state, imageList: newRemoveImage };

    default:
      return state;
  }
}

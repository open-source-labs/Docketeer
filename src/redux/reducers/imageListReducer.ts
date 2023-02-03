import * as types from '../constants/actionTypes';
import { PayloadAction } from '@reduxjs/toolkit';
import { imageState } from '../../../types';


export default function (state = imageState, action: PayloadAction<any>) {
  switch (action.type) {
  case types.GET_IMAGES: {
    const newImagesList = state.imagesList.slice();
    for (const image of action.payload) {
      newImagesList.push(image);
    }
    return {
      ...state,
      imagesList: newImagesList
    };
  }

  case types.REFRESH_IMAGES: {
    const newImagesList2 = [];
    for (const image of action.payload) {
      newImagesList2.push(image);
    }
    return { ...state, imagesList: newImagesList2 };
  }

  case types.REMOVE_IMAGE: {
    const newRemoveImage: any[] = [];
    for (const image of state.imagesList) {
      if (image.id !== action.payload) {
        newRemoveImage.push(image);
      }
    }
    return { ...state, imagesList: newRemoveImage };
  }

  default:
    return state;
  }
}

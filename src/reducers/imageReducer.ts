import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ImagesStateType, ImageObj } from '../../types';

const initialState: ImagesStateType = {
  imagesList: [],
};

export const imageSlice = createSlice({
  name: 'images',
  initialState,
  reducers: {
    refreshImages: (state, action: PayloadAction<ImageObj[]>) => {
      state.imagesList = action.payload;
    },
  },
});

export const { refreshImages } = imageSlice.actions;
export default imageSlice.reducer;

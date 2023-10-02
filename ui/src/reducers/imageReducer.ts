import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ImagesStateType } from '../../ui-types';
import { ImageType } from 'types';

const initialState: ImagesStateType = {
  imagesList: [],
};

export const imageSlice = createSlice({
  name: 'images',
  initialState,
  reducers: {
    refreshImages: (state, action: PayloadAction<ImageType[]>) => {
      state.imagesList = action.payload;
    },
  },
});

export const { refreshImages } = imageSlice.actions;
export default imageSlice.reducer;

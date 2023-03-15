import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { imagesStateType, imageObj } from '../../types';

const initialState: imagesStateType = {
  imagesList: [],
};

export const imageSlice = createSlice({
  name: 'images',
  initialState,
  reducers: {
    refreshImages: (state, action: PayloadAction<imageObj[]>) => {
      state.imagesList = action.payload;
    },
  },
});

export const { refreshImages } = imageSlice.actions;
export default imageSlice.reducer;

import { PayloadAction, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ImagesStateType } from '../../ui-types';
import { ImageType } from '../../../types';
import Client from '../models/Client';
const initialState: ImagesStateType = {
  imagesList: [],
};

export const fetchImages = createAsyncThunk(
  'containers/fetchImages',
  async () => {
    const result: ImageType[] = await Client.ImageService.getImages();
    return result;
  }
)
export const imageSlice = createSlice({
  name: 'images',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(
        fetchImages.fulfilled, (state, action) => {
          state.imagesList = action.payload;
        }
      )
  }
});

// export const { refreshImages } = imageSlice.actions;
export default imageSlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// eslint-disable-next-line
import { useAppDispatch } from './hooks';
import { PruneStateType } from '../../types';

const initialState: PruneStateType = {
  prunePromptList: [],
};

const pruneSlice = createSlice({
  name: 'prune',
  initialState,
  reducers: {
    setPrunePrompt: (
      state,
      action: PayloadAction<{
        prompt: string | null;
        handleSystemPrune: (() => void) | null;
        handleNetworkPrune: (() => void) | null;
        handleDeny: (() => void) | null;
      }>
    ) => {
      if (
        action.payload.handleSystemPrune === null &&
        action.payload.handleNetworkPrune === null
      ) {
        state.prunePromptList = [];
      }

      state.prunePromptList = [
        action.payload.prompt,
        action.payload.handleSystemPrune,
        action.payload.handleNetworkPrune,
        action.payload.handleDeny,
      ];
    },
  },
});

export const { setPrunePrompt } = pruneSlice.actions;

export const createPrunePrompt = (
  prompt: string | null,
  handleSystemPrune: (() => void) | null,
  handleNetworkPrune: (() => void) | null,
  handleDeny: (() => void) | null
) => {
  return (useAppDispatch: (arg: PayloadAction<object>) => void) => {
    useAppDispatch(
      setPrunePrompt({
        prompt,
        handleSystemPrune,
        handleNetworkPrune,
        handleDeny,
      })
    );
  };
};

export default pruneSlice.reducer;

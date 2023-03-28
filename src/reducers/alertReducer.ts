import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// eslint-disable-next-line
import { useAppDispatch } from './hooks';
import { AlertStateType } from '../../types';


// TODO: redo prompts to be component based

const initialState: AlertStateType = {
  alertList: [],
  promptList: [],
};

const alertSlice = createSlice({
  name: 'alerts',
  initialState,
  reducers: {
    setAlert: (
      state,
      action: PayloadAction<{ alert: string | null; type: string | null }>
    ) => {
      // console.log('setAlert payloadAction', action.payload);
      state.alertList = [action.payload.alert, action.payload.type];
    },
    // TODO: turn alertlist type into an object when refactoring to all for easier typing
    setPrompt: (
      state,
      action: PayloadAction<{
        prompt: string | null;
        handleAccept: (() => void) | null;
        handleDeny: (() => void) | null;
      }>
    ) => {
      // console.log('setPrompt payloadAction', action.payload);
      if (action.payload.handleAccept === null) {
        state.promptList = [];
      }

      state.promptList = [
        action.payload.prompt,
        action.payload.handleAccept,
        action.payload.handleDeny,
      ];
    },
  },
});

export const { setAlert, setPrompt } = alertSlice.actions;

// let timeoutId = null;
let timeoutId: ReturnType<typeof setTimeout> | null = null;

export const createAlert = (
  alert: string | null,
  time: number,
  type: string
) => {
  // TODO: revisit typing of payloadAction. Should it be more specific?
  return (useAppDispatch: (arg: PayloadAction<object>) => void) => {
    useAppDispatch(setAlert({ alert, type }));
    useAppDispatch(
      // sending null to clear the prompt
      setPrompt({ prompt: null, handleAccept: null, handleDeny: null })
    );

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      // sending null to clear the alert
      useAppDispatch(setAlert({ alert: null, type: null }));
    }, time * 1000);
    // console.log({ timeoutId });
  };
};

export const createPrompt = (
  prompt: string | null,
  handleAccept: (() => void) | null,
  handleDeny: (() => void) | null
) => {
  return (useAppDispatch: (arg: PayloadAction<object>) => void) => {
    useAppDispatch(setPrompt({ prompt, handleAccept, handleDeny }));
  };
};

export default alertSlice.reducer;

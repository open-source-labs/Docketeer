import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
// Import the types exported from our store.ts
import type { RootState, AppDispatch } from '../store';

// Export the typed version of useSelector & useDispatch
// useAppSelector grabs the part of state that we want
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
// grabs the function based on its type(e.g 'success'/'error') & uses it to create an action
export const useAppDispatch: () => AppDispatch = useDispatch;

// The two hooks above should be used in every component



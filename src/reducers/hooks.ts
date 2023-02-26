import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
// Import the types exported from our store.ts
import type { RootState, AppDispatch } from '../../renderer/store';

// Export the typed version of useSelector & useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;

// The two hooks above should be used in every component

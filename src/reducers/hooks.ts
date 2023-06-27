import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
// Import the types exported from our store.ts
import type { RootState, AppDispatch } from '../store';

// Export the typed version of useSelector & useDispatch
// useAppSelector grabs the part of state that we want
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
// grabs the function based on its type(e.g 'success'/'error') & uses it to create an action
export const useAppDispatch: () => AppDispatch = useDispatch;

// The two hooks above should be used in every component




// ㅁ React Redux has hooks and there are TS types that say how these hooks work,
// but those hooks don't know anything about the specific state or the dispatch capabilities in our app
// so it's best to create predefined versions of those React redux hooks that already know the right types 
// for our state and our dispatch. 
// import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
// So now we are going to define pretyped versions of useDispatch and useSelector.
// so we actually need to import those two types from our store file
// import type { RootState, AppDispatch } from '../store';
// 
// export const useAppDispatch: () => AppDispatch = useDispatch;
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
// Above is a function, but we are alias'ing it by adding Type
// Now we are exporting two hook variables that have the right TS types to find, and in our component, 
// We are going to import these hooks from the hooks file instead of importing the base functions from React Redux
// we now go to App.tsx file

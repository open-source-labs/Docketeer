import { configureStore } from '@reduxjs/toolkit';
import alertReducer from './reducers/alertReducer';
import composeReducer from './reducers/composeReducer';
import containerReducer from './reducers/containerReducer';
import imageReducer from './reducers/imageReducer';
import logReducer from './reducers/logReducer';
import userReducer from './reducers/userReducer';
import sessionReducer from './reducers/sessionReducer';
import volumeReducer from './reducers/volumeReducer';

// Above we import a function called configureStore from '@reduxjs/toolkit'
// This is a wrapper around the basic redux createStore function, it takes your reducer and makes a store
// but it also automatically sets up a store with the right defaults
// i.e. it turns on Redux DevTools extension, automatically adds the Thunk middleware,
// automatically turns on a couple of development checks that catch common mistakes like accidental mutations
// now we have to import our containerReducer, it's the default so no curly braces
//
const store = configureStore({

  // You could pass in an entire reducer function here, but remember how redux has that combine reducers function that lets you mash a bunch of reducers together? 
  // configureStore will do that for us automatically if we pass in an object,
  // so we pass in another object called reducer
  //
  reducer: {
    // field container with a value of containerReducer, this will automatically call combineReducer
    // so we end up with a state.containers field in our state
    //
    containers: containerReducer,
    images: imageReducer,
    composes: composeReducer,
    sessions: sessionReducer,
    volumes: volumeReducer,
    logs: logReducer,
    users: userReducer,
    alerts: alertReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});





// we are going to export some types based on our store itself below
// this means that we are taking the store's dispatch function and we are asking TS,
// what is this thing? well it is a function that takes certain kinds of arguments
// and we are exporting the type of that function as a thing we can use, 
export type AppDispatch = typeof store.dispatch;


// Also export a type called RootState, and that equals... TS has a built in type called 'ReturnType'
// Mouse over RootState and check, oh look it's an object that has a field called containers that is the 
// containers state. There is nothing specific to RTK about this, it's using TS inference to figure out 
// as much as possible so we do not have to declare it ourselves.
// so if we add more slice Reducers to our store, that type updates automatically.
// There are now two more setup steps needed.
// go over to index.tsx to setup our React Redux Provider so the rest of the app can have access to the store

// grabbing type of state returned from the reducer and setting that equal to RootState
// RootState is used to dynamically change the type of the hooks
export type RootState = ReturnType<typeof store.getState>;

export default store;
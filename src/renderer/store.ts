import { configureStore } from '@reduxjs/toolkit'
import reducers from '../redux/reducers/index';

const store = configureStore({
  reducer: reducers,
  // this is not best practice!!
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store;





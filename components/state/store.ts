import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { baseApi as api } from './baseApi';

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
});
export const setupStore = () =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
  });

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

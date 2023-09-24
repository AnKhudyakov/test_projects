import { combineReducers, configureStore } from '@reduxjs/toolkit';
import projectReducer from './slices/projectSlice';
import { projectApi } from './services/project';

const rootReducer = combineReducers({
  project: projectReducer,
  [projectApi.reducerPath]: projectApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(projectApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

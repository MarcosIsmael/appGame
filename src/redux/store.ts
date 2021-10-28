import { configureStore, ThunkAction, Action, getDefaultMiddleware } from '@reduxjs/toolkit';
import gameSlice from '../features/counter/gameSlice';
import authSlice from '../features/counter/authSlice';
import gameDetail from '../features/counter/gameDetailSlice';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import storageSession from 'redux-persist/lib/storage/session'

import { combineReducers } from 'redux';

const persistConfig = {
  key: 'root',
  storage: storage || storageSession,
  whiteList: [], // Si no lo definimos guarda todo
  blackList: []
 };
 
const rootReducer = combineReducers({
  counter: gameSlice,
  auth: authSlice,
  gameDetail: gameDetail
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer:persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
export const persistor = persistStore(store);
import { configureStore, ThunkAction, Action, getDefaultMiddleware } from '@reduxjs/toolkit';
import gameSlice from '../slices/gameSlice';
import authSlice from '../slices/authSlice';
import gameDetail from '../slices/gameDetailSlice';
import favoriteSlice from '../slices/favoriteSlice';

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
  game: gameSlice,
  auth: authSlice,
  gameDetail: gameDetail,
  favorites :favoriteSlice
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
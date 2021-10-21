import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import gameSlice from '../features/counter/gameSlice';
import authSlice from '../features/counter/authSlice';
import gameDetail from '../features/counter/gameDetailSlice';

export const store = configureStore({
  reducer: {
    counter: gameSlice,
    auth: authSlice,
    gameDetail: gameDetail
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

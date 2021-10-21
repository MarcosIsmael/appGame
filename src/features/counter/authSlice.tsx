
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../redux/store';
import { fetchCount } from './counterAPI';

export interface AuthState {
  logueado : boolean;
  token: string;
  status: 'idle' | 'loading' | 'failed'| 'succeded';
}

const initialState: AuthState = {
    logueado : true,
    token : '',
    status: 'idle',
};

// export const getSession = createAsyncThunk(
//   'counter/fetchCount',
//   async (amount: number) => {
//     const response = await fetchCount(amount);
//     // The value we return becomes the `fulfilled` action payload
//     return response.data;
//   }
// );
// export const getGameCategory = createAsyncThunk(
//     'counter/fetchCount',
//     async (amount: number) => {
//       const response = await fetchCount(amount);
//       // The value we return becomes the `fulfilled` action payload
//       return response.data;
//     }
//   );

//   export const getGameCategory = createAsyncThunk(
//     'counter/fetchCount',
//     async (amount: number) => {
//       const response = await fetchCount(amount);
//       // The value we return becomes the `fulfilled` action payload
//       return response.data;
//     }
//   );

//   export const getGameCategory = createAsyncThunk(
//     'counter/fetchCount',
//     async (amount: number) => {
//       const response = await fetchCount(amount);
//       // The value we return becomes the `fulfilled` action payload
//       return response.data;
//     }
//   );

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    // builder
    //   .addCase(incrementAsync.pending, (state) => {
    //     state.status = 'loading';
    //   })
    //   .addCase(incrementAsync.fulfilled, (state, action) => {
    //     state.status = 'idle';
    //     state.value += action.payload;
    //   });
  },
});

export default authSlice.reducer;

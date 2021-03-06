import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { db } from '../components/firebase/firebase';
import { RootState, AppThunk } from '../redux/store';
import { Action, Juego, JuegoDetail } from '../utils/interfaces'
export interface GameDetail {
  detail : JuegoDetail | null,
  status: 'idle' | 'loading' | 'failed'| 'succeded';
}

const initialState: GameDetail = {
  detail :null,
  status: 'idle',
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const getDetailGame = createAsyncThunk(
  'gameDetail/getAllGagetDetailGamemes',
  async (id:string) => {
    const response = await axios.get(`https://www.freetogame.com/api/game?id=${id}`)
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);




export const gameDetail = createSlice({
  name: 'gameDetail',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {},
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
     builder
       .addCase(getDetailGame.pending, (state) => {
         state.status = 'loading';
       })
       .addCase(getDetailGame.fulfilled, (state, action: any) => {
         state.status = 'succeded';
        state.detail = action.payload;
       })
   
  },
});


export default gameDetail.reducer;

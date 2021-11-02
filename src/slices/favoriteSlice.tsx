
import { createSlice } from '@reduxjs/toolkit';
import { Juego } from '../utils/interfaces';

export interface FAvoriteState {
favorites:Juego[]
}

const initialState: FAvoriteState = {
favorites:[]
};

export const favoriteSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
      setFavorites: ((state,action: {type:string, payload:Juego})=>{
            state.favorites.push(action.payload)
      }),
      removeFavorites: ((state,action:{type:string, payload:number})=>{
          state.favorites = state.favorites.filter(item => item.id !== action.payload)
      })
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
export const { setFavorites, removeFavorites}=favoriteSlice.actions
export default favoriteSlice.reducer;

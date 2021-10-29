
import { createSlice } from '@reduxjs/toolkit';

export interface FAvoriteState {
favorites:number[]
}

const initialState: FAvoriteState = {
favorites:[]
};

export const favoriteSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
      setFavorites: ((state,action: {type:string, payload:number})=>{
            state.favorites.push(action.payload)
      }),
      removeFavorites: ((state,action:{type:string, payload:number})=>{
          state.favorites = state.favorites.filter(id => id !== action.payload)
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

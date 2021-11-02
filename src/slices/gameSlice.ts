import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState, AppThunk } from '../redux/store';
import { Action, Juego, TipoFiltro } from '../utils/interfaces'
import { platform } from 'process';
import { TypedUseSelectorHook } from 'react-redux';
import type { useAppDispatch } from '../redux/hooks'
export interface GamesState {
  value: number;
  listGames : Juego[],
  listByPage:Juego[],
  page:number,
  status: 'idle' | 'loading' | 'failed'| 'succeded';
  filters:Filters
}

type Filters = {
  Plataforma: string,
  Categoria:string,
  Ordenar:string
}
const initialState: GamesState = {
  value: 0,
  listGames :[],
  listByPage:[],
  page:1,
  status: 'idle',
  filters: {Plataforma:'', Categoria:'', Ordenar:''}
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const getAllGames = createAsyncThunk(
  'games/getAllGames',
  async () => {
    const response = await axios.get('https://www.freetogame.com/api/games')
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const getGamesByOrder = createAsyncThunk(
  'games/getGamesByOrder',
  async (query:string,{getState}:any) => {
    const filtros   =  getState().counter.filters
    const plataforma = filtros.Plataforma ? `plataform=${filtros.Plataforma}&` : ''
    const categoria =filtros.Categoria ? `category=${filtros.Categoria}` : ''
    const response = await axios.get(
      `https://www.freetogame.com/api/games?
      ${plataforma}${categoria}&sort-by=${query}`
      )
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
export const getGamesByPlatform = createAsyncThunk(
  'games/getGamesByPlatform',
  async (query:string) => {
    const response = await axios.get(`https://www.freetogame.com/api/games?platform=${query}`)
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const getGamesByCategory = createAsyncThunk(
  'games/getGamesByCategory',
  async (query:string) => {
    const response = await axios.get(`https://www.freetogame.com/api/games?category=${query}`)
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const gameSlice = createSlice({
  name: 'games',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setFilters:((state,action)=>{
      const type: TipoFiltro = action.payload.type
      const value : string = action.payload.value
      if(type === 'Categoria') state.filters.Plataforma=''
      if(type === 'Plataforma')state.filters.Categoria = ''
        state.filters[type]= value
    }),
    setPagination: ((state,action)=>{
      const{desde,hasta,page }=action.payload
      state.listByPage = state.listGames.slice(desde,hasta)
      state.page = page
    })
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
     builder
       .addCase(getAllGames.pending, (state) => {
         state.status = 'loading';
       })
       .addCase(getAllGames.fulfilled, (state, action: any) => {
         state.status = 'succeded';
        state.listGames = action.payload;
        state.listByPage= action.payload.slice(0,30)
       })
       .addCase(getAllGames.rejected, (state, action: any) => {
        state.status = 'failed';
       state.listGames = action.error;
      })     
        .addCase(getGamesByPlatform.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getGamesByPlatform.fulfilled, (state, action: any) => {
        state.status = 'succeded';
       state.listGames = action.payload;
      })
      .addCase(getGamesByPlatform.rejected, (state, action: any) => {
       state.status = 'failed';
      state.listGames = action.error;
     })
     .addCase(getGamesByCategory.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(getGamesByCategory.fulfilled, (state, action: any) => {
      state.status = 'succeded';
     state.listGames = action.payload;
    })
    .addCase(getGamesByCategory.rejected, (state, action: any) => {
     state.status = 'failed';
    state.listGames = action.error;
   })
   .addCase(getGamesByOrder.pending, (state) => {
    state.status = 'loading';
  })
  .addCase(getGamesByOrder.fulfilled, (state, action: any) => {
    state.status = 'succeded';
   state.listGames = action.payload;
  })
  .addCase(getGamesByOrder.rejected, (state, action: any) => {
   state.status = 'failed';
  state.listGames = action.error;
 });
     
  },
});

export const {setFilters , setPagination}=gameSlice.actions
export default gameSlice;

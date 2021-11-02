
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { db } from '../components/firebase/firebase';

type Review = 
    {
        value:number,
        nombre:string,
        descripcion:string,
        juegoId:number
      }

export interface ReviewState {
reviews:Review[] 
status: 'idle' | 'loading' | 'failed'| 'succeded';
}

const initialState: ReviewState = {
reviews: [],
status:'idle'
};

export const getAllDocuments = createAsyncThunk(
    'gameDetail/getAllDocuments',
    async () => {
      const response = await db.collection("reviews").get()
      const firebaseCollectionData : any[] = [];
      response.forEach(firebaseDoc => {
      firebaseCollectionData.push(firebaseDoc.data());
      })
      return firebaseCollectionData
    }
  );
export const reviewSlice = createSlice({
  name: 'review',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
    .addCase(getAllDocuments.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAllDocuments.fulfilled, (state, action: any) => {
        state.status = 'succeded';
       state.reviews = action.payload;
      });
  },
});
export default reviewSlice.reducer;

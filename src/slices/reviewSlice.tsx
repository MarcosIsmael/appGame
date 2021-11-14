
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { db } from '../components/firebase/firebase';

type Review = 
    {
        valor:number,
        titulo:string,
        descripcion:string,
        juegoId:number,
        nombre:string,
        mail:string,
        imagen:string
      }

export interface ReviewState {
reviews:Review[] 
status: 'idle' | 'loading' | 'failed'| 'succeded';
statusPost:'idle' | 'loading' | 'failed'| 'succeded'
}

const initialState: ReviewState = {
reviews: [],
status:'idle',
statusPost:'idle'
};

export const getAllDocuments = createAsyncThunk(
    'review/getAllDocuments',
    async () => {
      const response = await db.collection("reviews").get()
      const firebaseCollectionData : any[] = [];
      response.forEach(firebaseDoc => {
      firebaseCollectionData.push(firebaseDoc.data());
      })
      return firebaseCollectionData
    }
  );

  export const postReview = createAsyncThunk(
    'review/postReview',
    async (obj:any) => {
      
      const response = await db.collection("reviews").doc().set(obj)

      return response
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
      })
      .addCase(getAllDocuments.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(postReview.pending, (state, action: any) => {
        state.statusPost = 'loading';
      })
      .addCase(postReview.fulfilled, (state, action: any) => {
        state.statusPost = 'succeded';
      })
      .addCase(postReview.rejected, (state, action: any) => {
        state.statusPost = 'failed';
      });
  },
});
export default reviewSlice.reducer;

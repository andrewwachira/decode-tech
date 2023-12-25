import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getError } from '../../../utils/error';

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async ()=>{
        try {
          const {data} = await axios.get("/api/products");
          return data;   
        } catch (error) {
            return getError(error);
        }
    }
)

const initialState = {
  products: [], 
  loading: false,
  error: null,
  product2Edit : null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    product2Edit : (state,action) => {state.product2Edit = action.payload }  
  },
  extraReducers : (builder) => {
    builder.addCase(fetchProducts.pending,(state) =>  {state.loading = true})
    .addCase(fetchProducts.fulfilled, (state,action) => {
        state.products = action.payload ;
        state.loading = false
    })
    .addCase(fetchProducts.rejected, (state,action) => {
        state.loading = false;
        state.error = action.payload
    })
  }
});

export const {product2Edit} = productsSlice.actions;
export default productsSlice.reducer;

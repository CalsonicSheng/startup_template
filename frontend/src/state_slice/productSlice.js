import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getAllProducts = createAsyncThunk('product/getAllProducts', async function (input, { rejectWithValue }) {
  try {
    const response = await axios.get('/product');
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const getSelectedProduct = createAsyncThunk('product/getSelectedProduct', async function (selectedProductId, { rejectWithValue }) {
  try {
    const response = await axios.get(`/product/${selectedProductId}`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const allProductsInitialState = {
  allProducts: [],
  selectedProduct: {},
  isloading: false,
};

const productSlice = createSlice({
  name: 'product',
  initialState: allProductsInitialState,
  extraReducers: {
    [getAllProducts.pending]: (state, action) => {
      state.isloading = true;
    },
    [getAllProducts.fulfilled]: (state, action) => {
      state.isloading = false;
      state.allProducts = action.payload;
    },
    [getAllProducts.rejected]: (state, action) => {
      state.isloading = false;
      state.allProducts = action.payload;
    },

    [getSelectedProduct.pending]: (state, action) => {
      state.isloading = true;
    },
    [getSelectedProduct.fulfilled]: (state, action) => {
      state.isloading = false;
      state.selectedProduct = action.payload;
    },
    [getSelectedProduct.rejected]: (state, action) => {
      state.isloading = false;
      state.selectedProduct = action.payload;
    },
  },
});

// this will be further used under the configure store to convert slice into traditional reducer format
export default productSlice;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getCheckoutRoute = createAsyncThunk('checkout/getcheckout', async function () {
  const response = await axios.get('/checkout');
  const responseData = response.data;
  return responseData;
});

const checkoutInitialState = {
  checkoutRoute: {},
};

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState: checkoutInitialState,
  reducers: {
    checkoutRouteReset(state, action) {
      state.checkoutRoute = {};
    },
  },

  extraReducers: {
    [getCheckoutRoute.fulfilled]: (state, action) => {
      state.checkoutRoute = action.payload;
    },
    [getCheckoutRoute.rejected]: (state, action) => {
      state.checkoutRoute = action.payload;
    },
  },
});

// this will be further used under the configure store to convert slice into traditional reducer format
export default checkoutSlice;
export const checkoutSliceActions = checkoutSlice.actions;

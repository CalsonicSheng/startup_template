import { configureStore } from '@reduxjs/toolkit';
import productSlice from './state_slice/productSlice';
import userSlice from './state_slice/userSlice';
import cartSlice from './state_slice/cartSlice';
import checkoutSlice from './state_slice/checkoutSlice';

const store = configureStore({
  reducer: {
    productReducer: productSlice.reducer,
    cartReducer: cartSlice.reducer,
    userReducer: userSlice.reducer,
    checkoutReducer: checkoutSlice.reducer,
  },
});

export default store;

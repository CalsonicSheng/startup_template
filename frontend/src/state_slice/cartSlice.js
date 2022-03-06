import { createSlice } from '@reduxjs/toolkit';

const cartInitialState = {
  cartItemList: [],
  totalItemCount: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: localStorage.getItem('cartLocalState') ? JSON.parse(localStorage.getItem('cartLocalState')) : cartInitialState,
  reducers: {
    // the action object will be dispatched from the "selectedProductScreen" component | action object's "payload" takes entire selected product object + additional "cartQty" property
    itemAddtoCart(state, action) {
      console.log('itemAddtoCart function run');
      const addedItemUid = action.payload._id;
      const cartItemIdList = state.cartItemList.map((e) => {
        return e._id;
      });

      if (cartItemIdList.includes(addedItemUid)) {
        // only change target item's cartQty amount by replacing a new cartQty
        const targetItemIndex = cartItemIdList.indexOf(addedItemUid);
        state.cartItemList[targetItemIndex].cartQty = action.payload.cartQty;

        const sumItem = state.cartItemList.reduce((a, b) => {
          return a + b.cartQty;
        }, 0);
        const sumPrice = state.cartItemList.reduce((a, b) => {
          return a + b.price * b.cartQty;
        }, 0);

        state.totalItemCount = sumItem;
        state.totalPrice = sumPrice.toFixed(2);
        localStorage.setItem('cartLocalState', JSON.stringify(state));
      }

      if (!cartItemIdList.includes(addedItemUid)) {
        // add new item entirely to cartItemList
        state.cartItemList.unshift(action.payload);

        const sumItem = state.cartItemList.reduce((a, b) => {
          return a + b.cartQty;
        }, 0);
        const sumPrice = state.cartItemList.reduce((a, b) => {
          return a + b.price * b.cartQty;
        }, 0);

        state.totalItemCount = sumItem;
        state.totalPrice = sumPrice.toFixed(2);
        localStorage.setItem('cartLocalState', JSON.stringify(state));
      }
    },

    //-----------------------------------------------------------------------------------------------------------------------------------------------------------------

    // this is the action will be dispatched from the cart sreen component | action object's "payload" takes only the single target item's id
    itemDeleteFromCart(state, action) {
      console.log('itemAddtoCart function run');

      const cartItemIdList = state.cartItemList.map((e) => {
        return e._id;
      });
      const targetItemIndex = cartItemIdList.indexOf(action.payload);
      state.cartItemList.splice(targetItemIndex, 1); // remove target item from "cartItemList"

      const sumItem = state.cartItemList.reduce((a, b) => {
        return a + b.cartQty;
      }, 0);
      const sumPrice = state.cartItemList.reduce((a, b) => {
        return a + b.price * b.cartQty;
      }, 0);

      state.totalItemCount = sumItem;
      state.totalPrice = sumPrice.toFixed(2);
      localStorage.setItem('cartLocalState', JSON.stringify(state));
    },

    //-----------------------------------------------------------------------------------------------------------------------------------------------------------------

    // this is the action will be dispatched from the cart sreen component | action object's takes in only the single target item's "id" and "newCount" in object
    cartItemCountChange(state, action) {
      const cartItemIdList = state.cartItemList.map((e) => {
        return e._id;
      });
      const targetItemIndex = cartItemIdList.indexOf(action.payload.id);
      state.cartItemList[targetItemIndex].cartQty = action.payload.newCount;

      const sumItem = state.cartItemList.reduce((a, b) => {
        return a + b.cartQty;
      }, 0);
      const sumPrice = state.cartItemList.reduce((a, b) => {
        return a + b.price * b.cartQty;
      }, 0);

      state.totalItemCount = sumItem;
      state.totalPrice = sumPrice.toFixed(2);
      localStorage.setItem('cartLocalState', JSON.stringify(state));
    },
  },
});

// this will be further used under the configure store to convert slice into traditional reducer format
export default cartSlice;
export const cartSliceActions = cartSlice.actions;

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { checkoutSliceActions, getCheckoutRoute } from '../../state_slice/checkoutSlice';

export default function CheckoutScreen() {
  console.log('checkout screen up');
  const navigate = useNavigate();
  const checkoutRoute = useSelector((state) => {
    return state.checkoutReducer.checkoutRoute;
  });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCheckoutRoute());
  }, [dispatch]);

  useEffect(() => {
    if (checkoutRoute.redirect) {
      navigate(checkoutRoute.redirect, {
        state: {
          pathBeforeAuth: '/checkout',
        },
      });
      // reset all the checkoutState back to original before redirect to signin
      dispatch(checkoutSliceActions.checkoutRouteReset());
    }
  }, [checkoutRoute, navigate, dispatch]);

  return (
    <>
      <h3>check out secret screen</h3>
    </>
  );
}

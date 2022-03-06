import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CartItemCard from '../../components/cart_item_card/CartItemCard';
import NotificationMessageBox from '../../components/message_box/NotificationMessageBox';
import classes from './customStyle.module.css';

export default function CartScreen() {
  const { cartItemList, totalItemCount, totalPrice } = useSelector((state) => {
    return state.cartReducer;
  });

  return (
    <>
      {cartItemList.length === 0 ? (
        <NotificationMessageBox>
          <p className="mb-0 text-white fw-bold">Your cart is empty</p>
        </NotificationMessageBox>
      ) : (
        <div className="row">
          <div className="col-lg-8 col-sm-12 me-5">
            <h3>SHOPPING CART</h3>
            {cartItemList.map((e) => {
              return <CartItemCard key={e._id} item={e} />;
            })}
          </div>
          <div className="col-sm-12 col-md">
            <ul className="list-group">
              <li className={`list-group-item border-2 ${classes['list-group-raidus-custom-top']}`}>
                <h3>Subtotal items: {totalItemCount >= 100 ? '99+' : totalItemCount}</h3>
                <p className="mb-0">total price: ${totalPrice}</p>
              </li>
              <li className={`list-group-item p-3 border-top-0 border-2 ${classes['list-group-raidus-custom-bottom']}`}>
                <Link to="/checkout">
                  <button type="button" className={`btn btn-dark w-100 ${classes['radius-custom']}`}>
                    PROCEED TO CHECKOUT
                  </button>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
}

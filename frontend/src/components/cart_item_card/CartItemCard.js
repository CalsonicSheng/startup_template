import React from 'react';
import { useDispatch } from 'react-redux';
import { cartSliceActions } from '../../state_slice/cartSlice';
import classes from './customStyle.module.css';

export default function CartItemCard(props) {
  function quantityOptionGenerator() {
    const qtyStockList = [];
    const capSelect = props.item.countInStock > 20 ? 20 : props.item.countInStock;
    for (let i = 1; i < capSelect + 1; i++) {
      qtyStockList.push(i);
    }
    const optionList = qtyStockList.map((e) => {
      return (
        <option value={e} key={e}>
          {e}
        </option>
      );
    });
    return optionList;
  }

  //--------------------------------------------------------------------------------------------------------------------------------------------------------

  const dispatch = useDispatch();

  function deleteItem() {
    dispatch(cartSliceActions.itemDeleteFromCart(props.item._id));
  }

  //--------------------------------------------------------------------------------------------------------------------------------------------------------

  function itemCountUpdate(e) {
    dispatch(cartSliceActions.cartItemCountChange({ id: props.item._id, newCount: Number(e.target.value) }));
  }

  return (
    <div className={`row justify-content-between align-items-center ${classes['p-custom']} fw-bold border-bottom border-2 py-4 my-4`}>
      <div className="col col-md col-sm-2">
        <img src={props.item.image} alt="..." className={classes['img-custom']} />
      </div>
      <div className="col col-md col-sm-2 pe-4">
        <p className="mb-0">{props.item.name}</p>
      </div>

      <div className="col col-md-5 col-sm-3">
        <div className="row align-items-center justify-content-evenly">
          <div className="col-sm-12 col-md-6 ">
            <p className="mb-0">${props.item.price}</p>
          </div>
          <div className="col-sm-12 col-md-6">
            <select
              className={`form-select w-75 py-2 px-3 ${classes['radius-custom']} ${classes['select-custom']}`}
              aria-label="Default select example"
              defaultValue={props.item.cartQty}
              onChange={itemCountUpdate}
            >
              {quantityOptionGenerator()}
            </select>
          </div>
        </div>
      </div>

      <div className="col col-md-2 col-sm-1 p-0 text-center">
        <button className={`btn ${classes['btn-custom']}`} onClick={deleteItem}>
          <i className="fa-solid fa-trash"></i>
        </button>
      </div>
    </div>
  );
}

import React, { useEffect, useState } from 'react';
import Rating from '../../components/rating/Rating';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSelectedProduct } from '../../state_slice/productSlice';
import ErrorMessageBox from '../../components/message_box/ErrorMessageBox';
import { cartSliceActions } from '../../state_slice/cartSlice';
import classes from './customStyle.module.css';
import SuccessfulActionMessageBox from '../../components/message_box/SuccessfulActionMessageBox';

export default function SelectedProductScreen() {
  const selectedProductId = useParams().id;
  const dispatch = useDispatch();

  const { isloading, selectedProduct } = useSelector((state) => {
    return state.productReducer;
  });

  useEffect(() => {
    dispatch(getSelectedProduct(selectedProductId));
  }, [dispatch, selectedProductId]);

  //-----------------------------------------------------------------------------------------------------------------

  function quantityOptionGenerator() {
    const qtyStockList = [];
    const capSelect = selectedProduct.countInStock > 20 ? 20 : selectedProduct.countInStock;
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
  //-----------------------------------------------------------------------------------------------------------------

  const [qty, setQty] = useState('1');

  function qtyUpdate(e) {
    setQty(e.target.value);
  }

  //-----------------------------------------------------------------------------------------------------------------

  const [isAdded, setIsAdded] = useState(false);

  //-----------------------------------------------------------------------------------------------------------------

  function addToCart() {
    setIsAdded(true);

    if (selectedProduct.customErrorMessage === undefined) {
      const selectedProductWithCartQty = { cartQty: Number(qty), ...selectedProduct };
      dispatch(cartSliceActions.itemAddtoCart(selectedProductWithCartQty));
    }
  }

  //-----------------------------------------------------------------------------------------------------------------

  return (
    <div className="row">
      <Link to="/" className="mb-4 text-decoration-none">
        <p className="mb-0 fw-bold">GO BACK</p>
      </Link>

      {/* ----------------------------------------------------------------------------------- */}

      {isloading ? (
        <h3>loading...</h3>
      ) : selectedProduct.customErrorMessage === undefined ? (
        <>
          <div className="col-md-12 col-lg-6  mb-5 me-5">
            <img src={selectedProduct.image} alt="..." className={`w-100 ${classes['radius-custom']} ${classes['img-custom']}`}></img>
          </div>
          <div className="col col-md-6 col-lg-2 ">
            <h3 className="fw-bold">{selectedProduct.name}</h3>
            <div className="border-top border-bottom my-3 py-3 ">
              <Rating productInfo={selectedProduct} />
            </div>
            <p className="mb-0">{selectedProduct.description}</p>
          </div>
          <div className={`col col-md-5 col-lg-3 ms-5`}>
            <ul className={`list-group w-100 mb-5`}>
              <li className={`list-group-item py-3 border-2 ${classes['list-group-raidus-custom-top']}`}>
                <div className="d-flex align-items-center">
                  <p className="fw-bold mb-0 w-50 ">Price: </p>
                  <p className="fw-bold mb-0 ">{selectedProduct.price}$</p>
                </div>
              </li>
              <li className="list-group-item border-top-0 border-2 py-3">
                <div className="d-flex align-items-center ">
                  <p className="fw-bold mb-0 w-50">Status: </p>
                  <p className="fw-bold mb-0">{selectedProduct.countInStock > 0 ? `In Stock` : 'Out Of Stock'}</p>
                </div>
              </li>
              {selectedProduct.countInStock > 0 && (
                <li className="list-group-item py-3 border-top-0 border-2">
                  <div className="d-flex align-items-center">
                    <p className="fw-bold mb-0 w-50">Qty</p>
                    <select className={`form-select w-50 ${classes['radius-custom']} ${classes['select-custom']} `} aria-label="Default select example" onChange={qtyUpdate} defaultValue={qty}>
                      {quantityOptionGenerator()}
                    </select>
                  </div>
                </li>
              )}
              <li className={`list-group-item py-3 border-top-0 border-2 ${classes['list-group-raidus-custom-bottom']}`}>
                <button type="button" className={`btn btn-dark w-100 m-0 ${classes['radius-custom']}`} disabled={selectedProduct.countInStock === 0 ? true : false} onClick={addToCart}>
                  ADD TO CART
                </button>
              </li>
            </ul>
            {isAdded && (
              <SuccessfulActionMessageBox>
                <p className="mb-0 text-white fw-blod ">Item added to cart</p>
              </SuccessfulActionMessageBox>
            )}
          </div>
        </>
      ) : (
        <ErrorMessageBox>
          <p className="mb-0 text-white fw-blod ">{selectedProduct.customErrorMessage}</p>
        </ErrorMessageBox>
      )}
    </div>
  );
}

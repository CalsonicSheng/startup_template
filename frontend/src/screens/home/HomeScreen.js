import React, { useEffect } from 'react';
import ProductCard from '../../components/product_card/ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../../state_slice/productSlice';

export default function HomeScreen() {
  const dispatch = useDispatch();

  const { isloading, allProducts } = useSelector((state) => {
    return state.productReducer;
  });

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  return (
    <div className="row">
      {isloading ? (
        <h3>loading...</h3>
      ) : allProducts.customErrorMessage === undefined ? (
        allProducts.map((e) => {
          return (
            <div className="col col-md-6 col-lg-4 col-xl-3 d-flex align-items-stretch" key={e._id}>
              <ProductCard productInfo={e} />
            </div>
          );
        })
      ) : (
        <h3>{allProducts.customErrorMessage}</h3>
      )}
    </div>
  );
}

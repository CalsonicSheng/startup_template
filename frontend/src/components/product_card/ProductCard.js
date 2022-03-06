import React from 'react';
import Rating from '../rating/Rating';
import { Link } from 'react-router-dom';
import classes from './customStyle.module.css';

export default function Product(props) {
  return (
    <div className={`card my-3 p-3 ${classes['radius-custom']}`}>
      <Link to={`/product/${props.productInfo._id}`}>
        <img src={props.productInfo.image} className={`card-img-top ${classes['radius-custom']} ${classes['img-custom']}`} alt="..." />
      </Link>
      <div className="card-body">
        <Link className="card-title text-decoration-none" to={`/product/${props.productInfo._id}`}>
          {props.productInfo.name}
        </Link>
        <div className="my-3">
          <Rating productInfo={props.productInfo} />
        </div>
        <h3 className="">${props.productInfo.price}</h3>
      </div>
    </div>
  );
}

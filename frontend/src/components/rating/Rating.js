import React from 'react';

const rating_scale = [
  [0.5, 1],
  [1.5, 2],
  [2.5, 3],
  [3.5, 4],
  [4.5, 5],
];

export default function Rating(props) {
  return (
    <div>
      {rating_scale.map((e) => {
        return (
          <span key={e[0]}>
            <i className={`${props.productInfo.rating >= e[1] ? 'fas fa-star' : props.productInfo.rating >= e[0] ? 'fas fa-star-half-alt' : 'far fa-star'} text-warning`}></i>
          </span>
        );
      })}
      <span className="ms-2">{props.productInfo.rating} / 5</span>
      <p className="mb-0">{props.productInfo.numReviews} reviews</p>
    </div>
  );
}

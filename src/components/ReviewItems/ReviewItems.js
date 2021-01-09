import React from "react";
import "./ReviewItems.scss";

const ReviewItems = ({ product, removeItem }) => {
  const { name, quantity, key, price } = product;

  return (
    <div className="review__item">
      <h5>{name}</h5>
      <p>Quantity: {quantity}</p>
      <p>${price}</p>
      <button className="btn btn-warning mb-3" onClick={() => removeItem(key)}>
        Remove Item
      </button>
    </div>
  );
};

export default ReviewItems;

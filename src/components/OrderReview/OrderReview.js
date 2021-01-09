import React, { useEffect, useState } from "react";
import Cart from "../Cart/Cart";
import ReviewItems from "../ReviewItems/ReviewItems";
import { useHistory } from "react-router-dom";
import {
  getDatabaseCart,
  removeFromDatabaseCart,
} from "../../utilities/databaseManager";

const OrderReview = () => {
  const [cart, setCart] = useState([]);
  let history = useHistory();
  const [review, setReview] = useState([]);
  //order review
  useEffect(() => {
    const cartItems = getDatabaseCart();
    const productKey = Object.keys(cartItems);
    fetch("https://dry-mountain-11982.herokuapp.com/reviewProducts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productKey),
    })
      .then((res) => res.json())
      .then((data) => setReview(data));
    if (review.length > 0) {
      const product = productKey.map((key) => {
        const reviewProduct = review.find((pd) => pd.key === key);
        reviewProduct.quantity = cartItems[key];
        return reviewProduct;
      });
      setCart(product);
    }
  }, [review]);
  //review item remove
  const removeItem = (product) => {
    const existingProduct = cart.filter((pd) => pd.key !== product);
    removeFromDatabaseCart(product);
    setCart(existingProduct);
  };

  const handlePlaceOrder = () => {
    history.push("/shipment");
  };

  return (
    <div className="row">
      <div className="col-md-9">
        <h1>Review Products</h1>
        {cart.map((pd) => (
          <ReviewItems product={pd} key={pd.key} removeItem={removeItem} />
        ))}
      </div>
      <div className="col-md-3">
        <Cart products={cart}>
          <button className="btn btn-warning" onClick={handlePlaceOrder}>
            Procced Checkout
          </button>
        </Cart>
      </div>
    </div>
  );
};

export default OrderReview;

import React from "react";
import { Link } from "react-router-dom";

const Products = (props) => {
  const handleAddToCart = props.handleAddToCart;
  const { name, img, stock, seller, price, key } = props.products;
  
  return (
    <div
      className="d-flex mb-5 ml-5"
      style={{ borderBottom: "1px solid gray" }}
    >
      <img src={img} alt="" className="mb-3" />
      <div className="ml-3 mb-3">
        <h5>
          <Link to={"/product/" + key}>{name}</Link>
        </h5>
        <p>By: </p>
        <p>${price}</p>
        <p>only {stock} left in stock - order soon</p>
        {props.showCartBtn && (
          <button
            className="btn btn-warning"
            onClick={() => handleAddToCart(props.products)}
          >
            add to cart
          </button>
        )}
      </div>
    </div>
  );
};

export default Products;
